import type { Product } from "@/lib/types";
import { validateKiwifyUrl } from "@/lib/kiwify";

/**
 * Catálogo de arranque. É usado apenas quando o Supabase NÃO está configurado.
 * Com o Supabase configurado, os produtos vêm do painel administrativo.
 */
const fioKiwify = validateKiwifyUrl(process.env.KIWIFY_URL_FIO || "https://pay.hotmart.com/S108229780E");
const colorirKiwify = validateKiwifyUrl(process.env.KIWIFY_URL_COLORIR || "https://pay.hotmart.com/H108229914M");
const atividadesKiwify = validateKiwifyUrl(process.env.KIWIFY_URL_ATIVIDADES || "https://pay.hotmart.com/J108230090O");
const lunaKiwify = validateKiwifyUrl(process.env.KIWIFY_URL_LUNA || "https://pay.kiwify.com/rMZmjLv");

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
    featured: false,
    created_at: "2026-10-26T12:00:00Z",
  },
  {
    id: "seed-fio-do-coracao",
    slug: "o-fio-do-coracao",
    name: "O Fio do Coração",
    subtitle: "Uma história sobre saudades, ligação e amor que nunca se parte",
    category: "historias-infantis",
    age_min: 3,
    age_max: 6,
    pages: 26,
    price_cents: 990,
    format: "eBook PDF · formato quadrado",
    short_description:
      "O Pedro vai dormir pela primeira vez a casa dos avós e descobre o fio invisível que o liga a quem ama.",
    description:
      "Amanhã, o Pedro vai dormir a casa dos avós pela primeira vez. Está contente… e também um bocadinho nervoso. À noite, quando o coração aperta com saudades, ele lembra-se do segredo que a mãe lhe contou: há um fio invisível de luz que liga o seu coração a quem ele ama.\n\nO fio pode esticar muito, dar a volta ao mundo inteiro, mas nunca se parte. Uma história ternurenta sobre saudades, medo e amor, que ajuda as crianças a sentirem-se seguras quando estão longe de quem amam.\n\nNas páginas finais, há duas atividades: desenhar o teu fio e dizer em voz alta a quem estás ligado.",
    benefits: ["Saudades", "Segurança emocional", "Amor e ligação", "Primeiras separações"],
    included: [
      "História ilustrada a cores com o Pedro e o Tóbi",
      "Atividade «Desenha o teu fio»",
      "Atividade final: dizer a quem estás ligado",
      "Ficheiro PDF com 26 páginas, em formato quadrado",
    ],
    faq: [
      { q: "Para que idade é recomendado?", a: "Para crianças dos 3 aos 6 anos, de preferência lido em conjunto com um adulto." },
      { q: "Em que formato recebo o livro?", a: "Em PDF, com 26 páginas em formato quadrado. Pode ser lido no telemóvel, tablet ou computador." },
      { q: "Como recebo o acesso?", a: "A entrega é digital e automática, depois de concluída a compra." },
    ],
    cover_url: "/produtos/fio-do-coracao/capa.jpg",
    preview_urls: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/produtos/fio-do-coracao/preview-${n}.jpg`),
    kiwify_url: fioKiwify.ok ? fioKiwify.url : null,
    published: true,
    featured: true,
    created_at: "2026-10-28T09:00:00Z",
  },
  {
    id: "seed-livro-de-colorir",
    slug: "pequeno-mundo-magico-livro-de-colorir",
    name: "Pequeno Mundo Mágico — Livro de Colorir",
    subtitle: "22 desenhos para pintar com o Pedro e o Tóbi",
    category: "livros-de-colorir",
    age_min: 3,
    age_max: 7,
    pages: 24,
    price_cents: 500,
    format: "eBook PDF · A4 vertical",
    short_description:
      "22 desenhos com contornos grossos e simples, prontos a pintar com o Pedro e o Tóbi. Imprime em casa as vezes que quiseres.",
    description:
      "Pega nos lápis e vem pintar com o Pedro e o Tóbi!\n\nNeste livro de colorir vais encontrar 22 desenhos com contornos grossos e simples, feitos para mãos pequenas: o Pedro e o Tóbi no jardim, na praia e na floresta, um dinossauro simpático, um unicórnio nas nuvens, um arco-íris, um panda, uma capivara, um gatinho, borboletas, abelhas, um comboio, um carro, balões, o Natal, uma festa de aniversário e muito mais.\n\nTodos os desenhos são originais do Pequeno Mundo Mágico, sem personagens de outras marcas. No fim do livro há uma página livre para a criança desenhar o que quiser.",
    benefits: ["Criatividade", "Motricidade fina", "Momentos em família", "Imprime as vezes que quiseres"],
    included: [
      "22 páginas de colorir com o Pedro e o Tóbi",
      "Capa a cores",
      "Página final livre para desenhar",
      "Ficheiro PDF em A4, pronto a imprimir",
    ],
    faq: [
      { q: "Para que idade é recomendado?", a: "Para crianças dos 3 aos 7 anos, de preferência a pintar em conjunto com um adulto." },
      { q: "Em que formato recebo o livro?", a: "Em PDF, com 24 páginas em A4 vertical. Pode ser impresso em casa as vezes que quiseres." },
      { q: "Como recebo o acesso?", a: "A entrega é digital e automática, depois de concluída a compra." },
    ],
    cover_url: "/produtos/livro-de-colorir/capa.jpg",
    preview_urls: [1, 2, 3, 4, 5, 6].map((n) => `/produtos/livro-de-colorir/preview-${n}.jpg`),
    kiwify_url: colorirKiwify.ok ? colorirKiwify.url : null,
    published: true,
    featured: false,
    created_at: "2026-10-28T11:00:00Z",
  },
  {
    id: "seed-50-atividades",
    slug: "50-atividades-divertidas-para-criancas",
    name: "50 Atividades Divertidas para Crianças",
    subtitle: "50 atividades para aprender a brincar, dos 3 aos 7 anos",
    category: "atividades-educativas",
    age_min: 3,
    age_max: 7,
    pages: 51,
    price_cents: 690,
    format: "eBook PDF · A4 vertical",
    short_description:
      "50 atividades para imprimir em casa, do mais fácil para o mais difícil: labirintos, ligar os pontos, encontrar as diferenças, contar, traçar, sombras, padrões e uma caça ao tesouro final.",
    description:
      "50 atividades para aprender a brincar!\n\nNeste livro vais encontrar 50 páginas de atividades para imprimir em casa, organizadas do mais fácil para o mais difícil, para crianças dos 3 aos 7 anos: labirintos, ligar os pontos, encontrar as diferenças, contar objetos, traçar linhas e formas, descobrir a sombra certa, completar padrões e sequências, ligar cada animal à sua casa e à sua comida, pintar com números, somar a brincar e uma caça ao tesouro final.\n\nSem personagens com nome, só animais e objetos genéricos. Imprime as vezes que quiseres.",
    benefits: ["Raciocínio lógico", "Concentração", "Motricidade fina", "Imprime as vezes que quiseres"],
    included: [
      "50 páginas de atividades",
      "Labirintos, ligar os pontos e encontrar as diferenças",
      "Contar, traçar, sombras e padrões",
      "Caça ao tesouro final",
      "Ficheiro PDF em A4, pronto a imprimir",
    ],
    faq: [
      { q: "Para que idade é recomendado?", a: "Para crianças dos 3 aos 7 anos, de preferência a brincar em conjunto com um adulto." },
      { q: "Em que formato recebo o livro?", a: "Em PDF, com 51 páginas em A4 vertical. Pode ser impresso em casa as vezes que quiseres." },
      { q: "Como recebo o acesso?", a: "A entrega é digital e automática, depois de concluída a compra." },
    ],
    cover_url: "/produtos/atividades-divertidas/capa.jpg",
    preview_urls: [1, 2, 3, 4, 5].map((n) => `/produtos/atividades-divertidas/preview-${n}.jpg`),
    kiwify_url: atividadesKiwify.ok ? atividadesKiwify.url : null,
    published: true,
    featured: false,
    created_at: "2026-10-28T12:00:00Z",
  },
];
