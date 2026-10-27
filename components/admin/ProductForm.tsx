"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveProduct, type FormState } from "@/app/admin/actions";
import { categories } from "@/lib/categories";
import type { Product } from "@/lib/types";

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-extrabold">{label}</span>
      {children}
      {hint && <span className="text-[13px] text-ink">{hint}</span>}
      {error && (
        <span role="alert" className="text-sm font-bold text-rose">
          {error}
        </span>
      )}
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5 rounded-3xl bg-white p-6 shadow-soft sm:p-8">
      <h2 className="text-xl">{title}</h2>
      {children}
    </section>
  );
}

export function ProductForm({ product }: { product?: Product }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProduct, {});
  const fe = state.fieldErrors ?? {};
  const v = (key: string, fallback: string) => state.values?.[key] ?? fallback;
  const checked = (key: string, fallback: boolean) =>
    state.values ? state.values[key] === "on" : fallback;

  return (
    <form key={state.nonce ?? "initial"} action={action} className="flex flex-col gap-6">
      {product && <input type="hidden" name="id" value={product.id} />}

      {state.error && (
        <p role="alert" className="rounded-2xl bg-blush px-5 py-3 font-bold">
          {state.error}
        </p>
      )}

      <Section title="Link de compra (checkout)">
        <Field
          label="URL DO CHECKOUT *"
          hint="Link de checkout deste livro na Hotmart (ex.: https://pay.hotmart.com/xxxxxxx). Cada livro tem o seu próprio link. O link é validado ao guardar."
          error={fe.kiwify_url}
        >
          <input
            name="kiwify_url"
            type="url"
            required
            placeholder="https://pay.hotmart.com/"
            defaultValue={v("kiwify_url", product?.kiwify_url ?? "")}
            className="field"
          />
        </Field>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <label className="flex items-center gap-2.5 font-extrabold">
            <input type="checkbox" name="published" defaultChecked={checked("published", product?.published ?? false)} className="h-5 w-5" />
            Publicado na loja
          </label>
          <label className="flex items-center gap-2.5 font-extrabold">
            <input type="checkbox" name="featured" defaultChecked={checked("featured", product?.featured ?? false)} className="h-5 w-5" />
            Produto em destaque (Home)
          </label>
        </div>
      </Section>

      <Section title="Informação do produto">
        <Field label="Nome *" error={fe.name}>
          <input name="name" required defaultValue={v("name", product?.name ?? "")} className="field" />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Endereço (slug)" hint="Deixa vazio para gerar a partir do nome. Aparece no URL: /produto/slug" error={fe.slug}>
            <input name="slug" defaultValue={v("slug", product?.slug ?? "")} className="field" />
          </Field>
          <Field label="Categoria *" error={fe.category}>
            <select name="category" required defaultValue={v("category", product?.category ?? "historias-infantis")} className="field">
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Subtítulo">
          <input name="subtitle" defaultValue={v("subtitle", product?.subtitle ?? "")} className="field" />
        </Field>
        <div className="grid gap-5 sm:grid-cols-4">
          <Field label="Idade mínima *" error={fe.age_min}>
            <input name="age_min" type="number" min={0} max={12} required defaultValue={v("age_min", String(product?.age_min ?? 4))} className="field" />
          </Field>
          <Field label="Idade máxima *" error={fe.age_max}>
            <input name="age_max" type="number" min={0} max={12} required defaultValue={v("age_max", String(product?.age_max ?? 7))} className="field" />
          </Field>
          <Field label="Nº de páginas" error={fe.pages}>
            <input name="pages" type="number" min={1} defaultValue={v("pages", product?.pages ? String(product.pages) : "")} className="field" />
          </Field>
          <Field label="Preço (€) *" hint="Ex.: 4,99" error={fe.price}>
            <input
              name="price"
              required
              inputMode="decimal"
              defaultValue={v("price", product ? (product.price_cents / 100).toFixed(2).replace(".", ",") : "")}
              className="field"
            />
          </Field>
        </div>
        <Field label="Formato do ficheiro">
          <input name="format" defaultValue={v("format", product?.format ?? "eBook PDF")} className="field" />
        </Field>
      </Section>

      <Section title="Página de vendas">
        <Field label="Descrição curta *" hint="Aparece nos cartões e no Google." error={fe.short_description}>
          <textarea name="short_description" required rows={2} defaultValue={v("short_description", product?.short_description ?? "")} className="field" />
        </Field>
        <Field label="Descrição completa *" hint="Separa os parágrafos com uma linha em branco." error={fe.description}>
          <textarea name="description" required rows={8} defaultValue={v("description", product?.description ?? "")} className="field" />
        </Field>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="O que está incluído" hint="Um item por linha.">
            <textarea name="included" rows={6} defaultValue={v("included", (product?.included ?? []).join("\n"))} className="field" />
          </Field>
          <Field label="Valores / benefícios" hint="Um por linha (ex.: Amizade).">
            <textarea name="benefits" rows={6} defaultValue={v("benefits", (product?.benefits ?? []).join("\n"))} className="field" />
          </Field>
        </div>
        <Field label="Perguntas frequentes" hint="Uma por linha, no formato: Pergunta | Resposta" error={fe.faq}>
          <textarea
            name="faq"
            rows={6}
            defaultValue={v("faq", (product?.faq ?? []).map((f) => `${f.q} | ${f.a}`).join("\n"))}
            className="field"
          />
        </Field>
      </Section>

      <Section title="Imagens">
        <Field label="Capa do eBook" hint="JPG, PNG ou WebP até 5 MB. Se não enviares ficheiro, usa o URL abaixo." error={fe.cover_file}>
          <input name="cover_file" type="file" accept="image/jpeg,image/png,image/webp" className="field" />
        </Field>
        <Field label="URL da capa" error={fe.cover_url}>
          <input name="cover_url" defaultValue={v("cover_url", product?.cover_url ?? "")} className="field" />
        </Field>
        <Field label="Adicionar imagens de pré-visualização" hint="Podes escolher várias." error={fe.preview_files}>
          <input name="preview_files" type="file" multiple accept="image/jpeg,image/png,image/webp" className="field" />
        </Field>
        <Field label="URLs das pré-visualizações" hint="Um por linha. Apaga uma linha para remover a imagem.">
          <textarea name="preview_urls" rows={5} defaultValue={v("preview_urls", (product?.preview_urls ?? []).join("\n"))} className="field" />
        </Field>
      </Section>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
          {pending ? "A guardar…" : "Guardar produto"}
        </button>
        <Link href="/admin" className="font-extrabold underline">Cancelar</Link>
      </div>
    </form>
  );
}
