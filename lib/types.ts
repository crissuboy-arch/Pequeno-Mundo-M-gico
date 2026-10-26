export type CategorySlug =
  | "historias-infantis"
  | "livros-de-colorir"
  | "atividades-educativas"
  | "kits-e-colecoes";

export type FaqItem = { q: string; a: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  category: CategorySlug;
  age_min: number;
  age_max: number;
  pages: number | null;
  price_cents: number;
  format: string;
  short_description: string;
  description: string;
  benefits: string[];
  included: string[];
  faq: FaqItem[];
  cover_url: string;
  preview_urls: string[];
  kiwify_url: string | null;
  published: boolean;
  featured: boolean;
  created_at: string;
};
