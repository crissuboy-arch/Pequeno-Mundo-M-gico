import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, categoryBySlug } from "@/lib/categories";
import { getProducts } from "@/lib/products";
import { ProductGrid } from "@/components/ProductCard";
import { StarIcon } from "@/components/StarIcon";

export const revalidate = 60;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
    alternates: { canonical: `/categoria/${cat.slug}` },
  };
}

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) notFound();

  const products = (await getProducts()).filter((p) => p.category === cat.slug);

  return (
    <div className="container-page flex flex-col gap-8 py-10 sm:py-14">
      <nav aria-label="Caminho" className="flex flex-wrap gap-1.5 text-sm font-bold text-ink">
        <Link href="/" className="underline">Início</Link>
        <span aria-hidden="true">/</span>
        <Link href="/loja" className="underline">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>{cat.name}</span>
      </nav>
      <div className={`${cat.bg} flex flex-col gap-2 rounded-[32px] p-8 sm:p-10`}>
        <h1 className="text-4xl sm:text-5xl">{cat.name}</h1>
        <p className="max-w-2xl text-lg text-[#2F3160]">{cat.description}</p>
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-[32px] bg-white px-6 py-14 text-center shadow-soft">
          <StarIcon size={40} />
          <h2 className="text-2xl">Novidades a caminho</h2>
          <p className="max-w-md text-ink">Esta categoria ainda não tem produtos. Volta em breve ou explora o resto da loja.</p>
          <Link href="/loja" className="btn-secondary mt-2">Ver toda a loja</Link>
        </div>
      )}
    </div>
  );
}
