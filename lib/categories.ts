import type { CategorySlug } from "./types";

export type Category = {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
  bg: string;
};

export const categories: Category[] = [
  {
    slug: "historias-infantis",
    name: "Histórias Infantis",
    short: "eBooks ilustrados para ler em família.",
    description:
      "Histórias ilustradas sobre amizade, coragem e emoções, para ler antes de dormir ou numa tarde tranquila.",
    bg: "bg-sky",
  },
  {
    slug: "livros-de-colorir",
    name: "Livros de Colorir",
    short: "Desenhos para pintar e imprimir.",
    description: "Livros de colorir em PDF para imprimir e pintar com as personagens das histórias.",
    bg: "bg-blush",
  },
  {
    slug: "atividades-educativas",
    name: "Atividades Educativas",
    short: "Materiais para aprender a brincar.",
    description: "Atividades e materiais para imprimir que ajudam as crianças a aprender a brincar.",
    bg: "bg-mint",
  },
  {
    slug: "kits-e-colecoes",
    name: "Kits e Coleções",
    short: "Vários materiais juntos, num só kit digital.",
    description: "Coleções e kits digitais com vários materiais reunidos.",
    bg: "bg-gold-soft",
  },
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

export const ageGroups = [
  { slug: "0-3", label: "0 a 3 anos", min: 0, max: 3 },
  { slug: "4-7", label: "4 a 7 anos", min: 4, max: 7 },
  { slug: "8-12", label: "8 a 12 anos", min: 8, max: 12 },
] as const;
