import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { categories } from "@/lib/categories";
import { site } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const now = new Date();
  const staticRoutes = ["", "/loja", "/sobre", "/contactos", "/perguntas-frequentes", "/termos-e-condicoes", "/politica-de-privacidade", "/politica-de-reembolso"];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r === "" ? 1 : 0.6,
    })),
    ...categories.map((c) => ({
      url: `${site.url}/categoria/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: `${site.url}/produto/${p.slug}`,
      lastModified: new Date(p.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
