import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/products";
import { categoryBySlug } from "@/lib/categories";
import { formatAge, formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { BuyButton } from "@/components/BuyButton";
import { ProductGrid } from "@/components/ProductCard";
import { StarIcon } from "@/components/StarIcon";

export const revalidate = 60;
export const dynamicParams = true;

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    return (await getProducts()).map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

const abs = (u: string) => (u.startsWith("http") ? u : `${site.url}${u}`);

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return { title: "Produto não encontrado" };
  const title = `${p.name} — eBook infantil (${formatAge(p)})`;
  return {
    title,
    description: p.short_description,
    alternates: { canonical: `/produto/${p.slug}` },
    openGraph: {
      type: "website",
      title: p.name,
      description: p.short_description,
      url: `${site.url}/produto/${p.slug}`,
      images: [{ url: abs(p.cover_url), alt: `Capa do eBook ${p.name}` }],
    },
    twitter: { card: "summary_large_image", title: p.name, description: p.short_description, images: [abs(p.cover_url)] },
  };
}

export default async function ProdutoPage({ params }: Params) {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) notFound();

  const cat = categoryBySlug(p.category);
  const related = (await getProducts()).filter((x) => x.id !== p.id).slice(0, 4);
  const paragraphs = p.description.split(/\n{2,}/).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.short_description,
    image: [abs(p.cover_url)],
    sku: p.slug,
    category: cat?.name,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      url: `${site.url}/produto/${p.slug}`,
      priceCurrency: "EUR",
      price: (p.price_cents / 100).toFixed(2),
      availability: p.kiwify_url ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="container-page pb-3 pt-6">
        <nav aria-label="Caminho" className="flex flex-wrap gap-1.5 text-sm font-bold text-ink">
          <Link href="/" className="underline">Início</Link>
          <span aria-hidden="true">/</span>
          <Link href="/loja" className="underline">Loja</Link>
          {cat && (
            <>
              <span aria-hidden="true">/</span>
              <Link href={`/categoria/${cat.slug}`} className="underline">{cat.name}</Link>
            </>
          )}
          <span aria-hidden="true">/</span>
          <span>{p.name}</span>
        </nav>
      </div>

      {/* TOPO */}
      <section className="container-page flex flex-col gap-10 pb-16 pt-5 lg:flex-row lg:gap-14">
        <div className="flex flex-1 flex-col gap-4">
          <div className="relative flex justify-center overflow-hidden rounded-[36px] bg-gradient-to-b from-[#CFE8F8] to-sky-pale p-8 sm:p-11">
            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush" />
            <Image
              src={p.cover_url}
              alt={`Capa do eBook ${p.name}`}
              width={340}
              height={410}
              priority
              className="relative h-auto w-[260px] rounded-[22px] border-[6px] border-white object-cover shadow-cover sm:w-[340px]"
            />
          </div>
          {p.preview_urls.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {p.preview_urls.slice(0, 4).map((u, i) => (
                <div key={u} className="relative aspect-square overflow-hidden rounded-2xl border-[3px] border-white bg-white">
                  <Image src={u} alt={`Pré-visualização ${i + 1}`} fill sizes="120px" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col items-start gap-5">
          {cat && <span className="rounded-full bg-gold px-3.5 py-1.5 text-[13px] font-extrabold uppercase">{cat.name}</span>}
          <h1 className="text-4xl leading-[1.1] sm:text-5xl">{p.name}</h1>
          {p.subtitle && <p className="text-xl leading-relaxed text-ink">{p.subtitle}</p>}
          <div className="flex flex-wrap gap-2.5">
            <span className="rounded-full bg-sky px-4 py-2 text-sm font-extrabold">{formatAge(p)}</span>
            <span className="rounded-full bg-blush px-4 py-2 text-sm font-extrabold">{p.format}</span>
            {p.pages ? <span className="rounded-full bg-mint px-4 py-2 text-sm font-extrabold">{p.pages} páginas</span> : null}
          </div>
          <div className="flex flex-col gap-3 text-[17px] leading-relaxed text-[#2F3160]">
            {paragraphs.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>

          <div className="flex w-full flex-col gap-4 rounded-[28px] bg-white p-6 shadow-soft">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-display text-5xl font-semibold">{formatPrice(p.price_cents)}</span>
              <span className="text-sm font-bold text-ink">Formato: {p.format}</span>
            </div>
            <BuyButton product={p} withPrice className="w-full text-xl" />
            <p className="text-sm leading-relaxed text-ink">
              Pagamento seguro pela Kiwify. A entrega é digital e feita através da Kiwify, depois de concluída a compra.
            </p>
          </div>
        </div>
      </section>

      {/* INCLUÍDO + VALORES */}
      {(p.included.length > 0 || p.benefits.length > 0) && (
        <section className="bg-sky py-16">
          <div className="container-page flex flex-col gap-12 md:flex-row">
            {p.included.length > 0 && (
              <div className="flex flex-1 flex-col gap-5">
                <h2 className="text-3xl sm:text-4xl">O que está incluído</h2>
                <ul className="flex flex-col gap-3 text-[17px] leading-snug">
                  {p.included.map((i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#2D2F5B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 flex-none rounded-full bg-white p-1">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {p.benefits.length > 0 && (
              <div className="flex flex-1 flex-col gap-5">
                <h2 className="text-3xl sm:text-4xl">Valores para conversar em família</h2>
                <ul className="flex flex-wrap gap-3">
                  {p.benefits.map((b) => (
                    <li key={b} className="rounded-[20px] bg-white px-5 py-4 font-display text-xl font-semibold">
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="text-base leading-relaxed text-[#2F3160]">
                  Um livro pensado para ler com a criança e conversar sobre sentimentos e pequenas coragens do dia a dia.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* PRÉ-VISUALIZAÇÃO */}
      {p.preview_urls.length > 0 && (
        <section className="container-page flex flex-col gap-7 py-16" aria-labelledby="h-previa">
          <h2 id="h-previa" className="text-center text-3xl sm:text-4xl">Espreita algumas páginas</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {p.preview_urls.map((u, i) => (
              <div key={u} className="relative aspect-[5/4] overflow-hidden rounded-3xl border-[5px] border-white bg-white shadow-soft">
                <Image src={u} alt={`Pré-visualização ${i + 1} de ${p.name}`} fill sizes="(min-width: 768px) 280px, 45vw" className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ + CTA */}
      <section className="bg-blush py-16">
        <div className="container-page flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="flex flex-[1.2] flex-col gap-3.5">
            <h2 className="text-3xl sm:text-4xl">Perguntas frequentes</h2>
            {p.faq.length > 0 ? (
              p.faq.map((f) => (
                <details key={f.q} className="group rounded-[20px] bg-white px-6 py-4">
                  <summary className="cursor-pointer list-none text-[17px] font-extrabold">{f.q}</summary>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink">{f.a}</p>
                </details>
              ))
            ) : (
              <p className="text-ink">
                Tens dúvidas? <Link href="/perguntas-frequentes" className="font-extrabold underline">Vê as perguntas frequentes</Link>.
              </p>
            )}
          </div>
          <div className="flex flex-1 flex-col items-start gap-4 rounded-[32px] bg-white p-8">
            <StarIcon size={34} />
            <span className="font-display text-3xl font-semibold leading-tight">Pronto para esta aventura?</span>
            <span className="font-display text-4xl font-semibold">{formatPrice(p.price_cents)}</span>
            <BuyButton product={p} withPrice />
            <span className="text-sm text-ink">Pagamento seguro pela Kiwify.</span>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-page flex flex-col gap-7 py-16" aria-labelledby="h-relacionados">
          <h2 id="h-relacionados" className="text-3xl sm:text-4xl">Também te pode interessar</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </>
  );
}
