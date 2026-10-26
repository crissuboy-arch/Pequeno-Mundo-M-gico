import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import { ageGroups, categories } from "@/lib/categories";
import { ProductGrid } from "@/components/ProductCard";
import { StarIcon } from "@/components/StarIcon";

export const metadata: Metadata = {
  title: "Loja — todos os eBooks e atividades infantis",
  description:
    "Todos os eBooks infantis, livros de colorir, atividades educativas e kits digitais do Pequeno Mundo Mágico. Filtra por idade e categoria.",
  alternates: { canonical: "/loja" },
};

type SP = { categoria?: string; idade?: string };

function href(categoria?: string, idade?: string) {
  const q = new URLSearchParams();
  if (categoria) q.set("categoria", categoria);
  if (idade) q.set("idade", idade);
  const s = q.toString();
  return s ? `/loja?${s}` : "/loja";
}

function Chip({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={to}
      aria-current={active ? "true" : undefined}
      className={`rounded-full px-5 py-2.5 text-[15px] font-extrabold transition ${
        active ? "bg-navy text-cream" : "bg-white text-navy hover:bg-sky"
      }`}
    >
      {children}
    </Link>
  );
}

export default async function LojaPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const all = await getProducts();

  const cat = categories.find((c) => c.slug === sp.categoria)?.slug;
  const age = ageGroups.find((a) => a.slug === sp.idade);

  const products = all.filter(
    (p) => (!cat || p.category === cat) && (!age || (p.age_min <= age.max && p.age_max >= age.min)),
  );

  return (
    <div className="container-page flex flex-col gap-8 py-10 sm:py-14">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl sm:text-5xl">Loja</h1>
        <p className="text-lg text-ink">Todos os livros e materiais do Pequeno Mundo Mágico.</p>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl bg-sky p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="mr-2 text-sm font-extrabold">Categoria</span>
          <Chip to={href(undefined, age?.slug)} active={!cat}>Todas</Chip>
          {categories.map((c) => (
            <Chip key={c.slug} to={href(c.slug, age?.slug)} active={cat === c.slug}>{c.name}</Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="mr-2 text-sm font-extrabold">Idade</span>
          <Chip to={href(cat, undefined)} active={!age}>Todas</Chip>
          {ageGroups.map((a) => (
            <Chip key={a.slug} to={href(cat, a.slug)} active={age?.slug === a.slug}>{a.label}</Chip>
          ))}
        </div>
      </div>

      <p className="text-[15px] font-bold text-ink" aria-live="polite">
        {products.length === 1 ? "1 produto" : `${products.length} produtos`}
      </p>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-[32px] bg-white px-6 py-14 text-center shadow-soft">
          <StarIcon size={40} />
          <h2 className="text-2xl">Ainda não há produtos com estes filtros</h2>
          <p className="max-w-md text-ink">Estamos a preparar mais novidades. Experimenta outra categoria ou idade.</p>
          <Link href="/loja" className="btn-secondary mt-2">Ver todos os produtos</Link>
        </div>
      )}
    </div>
  );
}
