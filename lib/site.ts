export const site = {
  name: "Pequeno Mundo Mágico",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://pequenomundomagico.pt").replace(/\/$/, ""),
  slogan: "Onde a imaginação cresce e a aprendizagem ganha magia.",
  description:
    "eBooks infantis, livros de colorir, atividades educativas e kits digitais para crianças até aos 12 anos. Histórias com magia para ler em família.",
  seller: {
    name: process.env.NEXT_PUBLIC_SELLER_NAME || "Ofensiva Criativa",
    nif: process.env.NEXT_PUBLIC_SELLER_NIF || "298533634",
    address: process.env.NEXT_PUBLIC_SELLER_ADDRESS || "",
    email: process.env.NEXT_PUBLIC_SELLER_EMAIL || "geralofensivacriativa@gmail.com",
  },
};

export const hasSellerEmail = true;
