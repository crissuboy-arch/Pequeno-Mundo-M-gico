import type { Product } from "./types";

export function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2).replace(".", ",")}`;
}

export function formatAge(p: Pick<Product, "age_min" | "age_max">): string {
  return `${p.age_min} a ${p.age_max} anos`;
}

/** "4,99" ou "4.99" -> 499. Devolve null se inválido. */
export function parsePriceToCents(input: string): number | null {
  const cleaned = input.replace(/[€\s]/g, "").replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  return Math.round(parseFloat(cleaned) * 100);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
