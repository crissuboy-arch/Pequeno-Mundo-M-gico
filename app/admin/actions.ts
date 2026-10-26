"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin";
import { validateKiwifyUrl } from "@/lib/kiwify";
import { parsePriceToCents, slugify } from "@/lib/format";
import { categories } from "@/lib/categories";
import type { CategorySlug, FaqItem } from "@/lib/types";

export type FormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
  nonce?: number;
};

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const lines = (s: string) => s.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
const intOr = (s: string, fallback: number | null) => {
  if (s === "") return fallback;
  const n = Number(s);
  return Number.isInteger(n) ? n : NaN;
};

function refresh() {
  revalidatePath("/", "layout");
}

export async function login(formData: FormData) {
  const email = str(formData, "email");
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/admin/login?erro=credenciais");
  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/** Publicar / ocultar. Para publicar, o link Kiwify tem de existir e ser válido. */
export async function togglePublish(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(formData, "id");
  const publish = str(formData, "publish") === "1";

  if (publish) {
    const { data } = await supabase.from("products").select("kiwify_url").eq("id", id).maybeSingle();
    const check = validateKiwifyUrl(data?.kiwify_url);
    if (!check.ok) redirect(`/admin?erro=${encodeURIComponent(check.error)}`);
  }

  const { error } = await supabase.from("products").update({ published: publish }).eq("id", id);
  if (error) redirect(`/admin?erro=${encodeURIComponent(error.message)}`);

  refresh();
  redirect(`/admin?ok=${publish ? "publicado" : "ocultado"}`);
}

const ALLOWED_IMAGES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024;

async function uploadImage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  folder: string,
  file: File,
): Promise<{ url?: string; error?: string }> {
  if (!ALLOWED_IMAGES.includes(file.type)) return { error: `«${file.name}»: usa uma imagem JPG, PNG ou WebP.` };
  if (file.size > MAX_BYTES) return { error: `«${file.name}»: a imagem excede 5 MB.` };
  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("produtos").upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { error: `Falha ao enviar «${file.name}»: ${error.message}` };
  return { url: supabase.storage.from("produtos").getPublicUrl(path).data.publicUrl };
}

export async function saveProduct(_prev: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const id = str(formData, "id");
  const values: Record<string, string> = {};
  for (const [k, v] of formData.entries()) if (typeof v === "string") values[k] = v;
  const fail = (fieldErrors: Record<string, string>, error?: string): FormState => ({
    error: error ?? "Há campos por corrigir.",
    fieldErrors,
    values,
    nonce: Date.now(),
  });

  const fe: Record<string, string> = {};

  const name = str(formData, "name");
  if (!name) fe.name = "Indica o nome do produto.";

  const slug = slugify(str(formData, "slug") || name);
  if (!slug) fe.slug = "Indica um endereço (slug) válido.";

  const category = str(formData, "category") as CategorySlug;
  if (!categories.some((c) => c.slug === category)) fe.category = "Escolhe uma categoria.";

  const ageMin = intOr(str(formData, "age_min"), 0) as number;
  const ageMax = intOr(str(formData, "age_max"), 12) as number;
  if (Number.isNaN(ageMin) || ageMin < 0 || ageMin > 12) fe.age_min = "Idade mínima entre 0 e 12.";
  if (Number.isNaN(ageMax) || ageMax < 0 || ageMax > 12) fe.age_max = "Idade máxima entre 0 e 12.";
  if (!fe.age_min && !fe.age_max && ageMin > ageMax) fe.age_max = "A idade máxima tem de ser igual ou superior à mínima.";

  const pages = intOr(str(formData, "pages"), null);
  if (pages !== null && (Number.isNaN(pages) || pages < 1)) fe.pages = "Número de páginas inválido.";

  const price = parsePriceToCents(str(formData, "price"));
  if (price === null) fe.price = "Preço inválido. Exemplo: 4,99";

  const shortDescription = str(formData, "short_description");
  if (!shortDescription) fe.short_description = "Escreve uma descrição curta.";
  const description = str(formData, "description");
  if (!description) fe.description = "Escreve a descrição do produto.";

  const kiwify = validateKiwifyUrl(str(formData, "kiwify_url"));
  if (!kiwify.ok) fe.kiwify_url = kiwify.error;

  // FAQ: "Pergunta | Resposta"
  const faq: FaqItem[] = [];
  for (const l of lines(str(formData, "faq"))) {
    const [q, ...rest] = l.split("|");
    const a = rest.join("|").trim();
    if (!q.trim() || !a) {
      fe.faq = "Cada linha deve ter o formato: Pergunta | Resposta";
      break;
    }
    faq.push({ q: q.trim(), a });
  }

  // Imagens
  let coverUrl = str(formData, "cover_url");
  const previewUrls = lines(str(formData, "preview_urls"));
  const coverFile = formData.get("cover_file");
  const previewFiles = formData.getAll("preview_files").filter((f): f is File => f instanceof File && f.size > 0);

  if (Object.keys(fe).length > 0) return fail(fe);

  if (coverFile instanceof File && coverFile.size > 0) {
    const up = await uploadImage(supabase, slug, coverFile);
    if (up.error) return fail({ cover_file: up.error });
    coverUrl = up.url!;
  }
  for (const f of previewFiles) {
    const up = await uploadImage(supabase, slug, f);
    if (up.error) return fail({ preview_files: up.error });
    previewUrls.push(up.url!);
  }
  if (!coverUrl) return fail({ cover_url: "Envia a capa do eBook (ou cola o URL da imagem)." });

  const published = formData.get("published") === "on";
  const featured = formData.get("featured") === "on";

  const row = {
    slug,
    name,
    subtitle: str(formData, "subtitle") || null,
    category,
    age_min: ageMin,
    age_max: ageMax,
    pages,
    price_cents: price!,
    format: str(formData, "format") || "eBook PDF",
    short_description: shortDescription,
    description,
    benefits: lines(str(formData, "benefits")),
    included: lines(str(formData, "included")),
    faq,
    cover_url: coverUrl,
    preview_urls: previewUrls,
    kiwify_url: kiwify.ok ? kiwify.url : null,
    published,
    featured,
  };

  const result = id
    ? await supabase.from("products").update(row).eq("id", id).select("id").single()
    : await supabase.from("products").insert(row).select("id").single();

  if (result.error) {
    if (result.error.code === "23505") return fail({ slug: "Já existe um produto com este endereço (slug)." });
    return fail({}, `Não foi possível guardar: ${result.error.message}`);
  }

  if (featured) {
    await supabase.from("products").update({ featured: false }).neq("id", result.data.id);
  }

  refresh();
  redirect("/admin?ok=guardado");
}
