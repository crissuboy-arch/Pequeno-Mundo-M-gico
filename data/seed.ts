import type { Product } from "@/lib/types";
import { validateKiwifyUrl } from "@/lib/kiwify";

/**
 * Catálogo de arranque. É usado apenas quando o Supabase NÃO está configurado.
 * Com o Supabase configurado, os produtos vêm do painel administrativo.
 */
const lunaKiwify = validateKiwifyUrl(process.env.KIWIFY_URL_LUNA);

export const seedProducts: Product[] = [
  {
    id: "seed-luna",
    slug: "luna-e-a-estrela-que-perdeu-o-brilho",
    name: "Luna e a Estrela que Perdeu o Brilho",
    subtitle: "Uma aventura mágica sobre amizade, coragem e autoconfiança",
    category: "historias-infantis",
    age_min: 4,
    age_max: 7,
    pages: 30,
    price_cents: 699,
    format: "eBook PDF · A4 vertical",
    short_description:
      "Uma aventura encantadora sobre amizade, coragem, empatia e autoconfiança, com atividades divertidas.",
    description:
      "Acompanhe Luna numa aventura mágica para ajudar uma pequena estrela que perdeu o seu brilho!\n\nUma história encantadora sobre amizade, coragem, empatia e autoconfiança, com ilustrações coloridas e atividades divertidas para prolongar a aprendizagem.\n\nIdeal para momentos de leitura em família, antes de dormir ou para explorar emoções com os mais pequenos.",
    benefits: ["Amizade", "Coragem", "Empatia", "Autoconfiança"],
    included: [
      "História ilustrada",
      "Atividades educativas",
      "Diploma mágico",
      "Ficheiro PDF com 30 páginas, em A4 vertical",
    ],
    faq: [
      { q: "Para que idade é recomendado?", a: "Para crianças dos 4 aos 7 anos, de preferência lido em conjunto com um adulto." },
      { q: "Em que formato recebo o livro?", a: "Em PDF, com 30 páginas em A4 vertical. Pode ser lido no telemóvel, tablet ou computador, ou impresso." },
      { q: "Como recebo o acesso?", a: "A entrega é digital e automática, depois de concluída a compra." },
    ],
    cover_url: "/produtos/luna/capa.jpg",
    preview_urls: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/produtos/luna/preview-${n}.jpg`),
    kiwify_url: lunaKiwify.ok ? lunaKiwify.url : null,
    published: true,
    featured: true,
    created_at: "2026-10-26T12:00:00Z",
  },
];
