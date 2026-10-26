import { seedProducts } from "@/data/seed";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient as createServerSupabase } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";
import type { Product } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalize(row: any): Product {
  return {
    ...row,
    subtitle: row.subtitle ?? null,
    benefits: row.benefits ?? [],
    included: row.included ?? [],
    faq: Array.isArray(row.faq) ? row.faq : [],
    preview_urls: row.preview_urls ?? [],
    cover_url: row.cover_url || "/produtos/placeholder.svg",
    kiwify_url: row.kiwify_url ?? null,
  } as Product;
}

/** Produtos publicados (loja pública). */
export async function getProducts(): Promise<Product[]> {
  if (!supabaseConfigured) return seedProducts.filter((p) => p.published);
  try {
    const { data, error } = await createPublicClient()
      .from("products")
      .select("*")
      .eq("published", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map(normalize);
  } catch (e) {
    console.error("getProducts", e);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!supabaseConfigured) return seedProducts.find((p) => p.slug === slug && p.published) ?? null;
  try {
    const { data, error } = await createPublicClient()
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw error;
    return data ? normalize(data) : null;
  } catch (e) {
    console.error("getProductBySlug", e);
    return null;
  }
}

/** Todos os produtos, incluindo ocultos (painel administrativo). */
export async function getAdminProducts(): Promise<Product[]> {
  if (!supabaseConfigured) return [];
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(normalize);
}

export async function getAdminProduct(id: string): Promise<Product | null> {
  if (!supabaseConfigured) return null;
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? normalize(data) : null;
}

export function hasCheckout(p: Product): boolean {
  return Boolean(p.kiwify_url);
}
