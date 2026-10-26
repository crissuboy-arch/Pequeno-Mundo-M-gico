import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import { formatAge, formatPrice } from "@/lib/format";
import { CategoryTiles } from "@/components/CategoryTiles";
import { ProductGrid } from "@/components/ProductCard";
import { BuyButton } from "@/components/BuyButton";
import { StarIcon, Wave } from "@/components/StarIcon";
import { categoryBySlug } from "@/lib/categories";

export const revalidate = 60;

function Steps() {
  const steps = [
    { n: 1, bg: "bg-gold", t: "Escolhe o livro", d: "Vê a página do livro, as pré-visualizações e a idade recomendada." },
    { n: 2, bg: "bg-blush", t: "Compra com segurança", d: "Ao clicar em Comprar agora segues para o pagamento seguro da Kiwify." },
    { n: 3, bg: "bg-mint", t: "Recebe o acesso", d: "A entrega é digital e feita através da Kiwify, depois de concluída a compra." },
  ];
  return (
    <section className="container-page flex flex-col gap-8 pb-20 pt-4">
      <h2 className="text-center text-4xl">Como funciona</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="flex items-start gap-4 rounded-3xl bg-white p-6">
            <span className={`${s.bg} flex h-12 w-12 flex-none items-center justify-center rounded-full font-display text-2xl font-bold`}>
              {s.n}
            </span>
            <div className="flex flex-col gap-1.5">
              <span className="font-display text-xl font-semibold">{s.t}</span>
              <span className="text-[15px] leading-relaxed text-ink">{s.d}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.find((p) => p.featured) ?? products[0];
  const others = products.filter((p) => p.id !== featured?.id);
  const recentes = products.slice(0, 4);
  const historias = products.filter((p) => p.category === "historias-infantis").slice(0, 4);
  const atividades = products.filter((p) => p.category === "atividades-educativas").slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#CFE8F8] via-sky-pale to-cream">
        <StarIcon size={30} className="absolute left-[6%] top-16 hidden sm:block" />
        <StarIcon size={18} fill="#FFFFFF" stroke="#FFFFFF" className="absolute left-[46%] top-14 hidden lg:block" />
        <div className="container-page relative flex flex-col items-center gap-10 pb-28 pt-10 lg:flex-row lg:gap-12">
          <div className="flex flex-1 flex-col items-start gap-6">
            {featured && (
              <Link
                href={`/produto/${featured.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold hover:bg-gold-soft"
              >
                <StarIcon size={16} />
                Novidade: {featured.name}
              </Link>
            )}
            <h1 className="text-[40px] leading-[1.08] sm:text-6xl">Um mundo de histórias, magia e aprendizagem!</h1>
            <p className="max-w-[520px] text-lg leading-relaxed text-ink sm:text-xl">
              Descubra eBooks infantis, livros de colorir e atividades educativas para aprender a brincar.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link href="/loja" className="btn-primary">Explorar os Livros</Link>
              {featured && (
                <Link href={`/produto/${featured.slug}`} className="btn-secondary">Ver a novidade</Link>
              )}
            </div>
            <p className="text-[15px] font-bold text-ink">Onde a imaginação cresce e a aprendizagem ganha magia.</p>
          </div>
          {featured && (
            <div className="relative flex h-[420px] w-full flex-1 items-center justify-center sm:h-[540px]">
              <div className="absolute h-[330px] w-[330px] rounded-full bg-blush sm:h-[430px] sm:w-[430px]" />
              <div className="absolute bottom-6 right-[6%] h-28 w-28 rounded-full bg-mint sm:h-36 sm:w-36" />
              <div className="absolute left-[6%] top-10 h-20 w-20 rounded-full bg-gold-soft" />
              <Link href={`/produto/${featured.slug}`} className="relative -rotate-3">
                <Image
                  src={featured.cover_url}
                  alt={`Capa do eBook ${featured.name}`}
                  width={320}
                  height={386}
                  priority
                  className="h-auto w-[230px] rounded-[22px] border-[6px] border-white object-cover shadow-cover sm:w-[320px]"
                />
              </Link>
              <StarIcon size={54} className="absolute right-[10%] top-8 rotate-12" />
              <div className="absolute bottom-6 left-0 hidden rounded-2xl bg-white px-4 py-3 shadow-soft sm:block">
                <span className="block text-xs font-extrabold text-rose">{categoryBySlug(featured.category)?.name.toUpperCase()}</span>
                <span className="text-[15px] font-extrabold">{featured.format.split("·")[0].trim()} · {formatAge(featured)}</span>
              </div>
            </div>
          )}
        </div>
        <Wave className="absolute bottom-[-1px] left-0" />
      </section>

      {/* CATEGORIAS */}
      <section className="container-page flex flex-col gap-8 pb-20 pt-6" aria-labelledby="h-categorias">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 id="h-categorias" className="text-4xl">Escolhe a tua aventura</h2>
          <p className="text-lg text-ink">Quatro cantinhos mágicos para descobrir.</p>
        </div>
        <CategoryTiles products={products} />
      </section>

      {/* NOVIDADE / DESTAQUE */}
      {featured && (
        <section className="bg-sky py-16 sm:py-20" aria-labelledby="h-destaque">
          <div className="container-page flex flex-col gap-10">
            <div className="flex flex-col items-center gap-10 md:flex-row md:gap-12">
              <Link href={`/produto/${featured.slug}`} className="relative block w-full max-w-[340px] flex-none">
                <Image
                  src={featured.cover_url}
                  alt={`Capa do eBook ${featured.name}`}
                  width={340}
                  height={410}
                  className="h-auto w-full rounded-[22px] border-[6px] border-white object-cover shadow-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col items-start gap-4">
                <span className="rounded-full bg-gold px-3.5 py-1.5 text-[13px] font-extrabold">NOVIDADE · PRODUTO EM DESTAQUE</span>
                <h2 id="h-destaque" className="text-4xl leading-tight sm:text-[42px]">{featured.name}</h2>
                <p className="text-lg leading-relaxed text-[#2F3160]">{featured.short_description}</p>
                <div className="flex flex-wrap gap-2.5">
                  <span className="chip">{formatAge(featured)}</span>
                  <span className="chip">{featured.format.split("·")[0].trim()}</span>
                  {featured.pages ? <span className="chip">{featured.pages} páginas</span> : null}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <span className="font-display text-4xl font-semibold">{formatPrice(featured.price_cents)}</span>
                  <BuyButton product={featured} />
                  <Link href={`/produto/${featured.slug}`} className="text-base font-extrabold underline">Ver detalhes</Link>
                </div>
                <p className="text-sm text-ink">Pagamento seguro pela Kiwify. A entrega é digital, depois de concluída a compra.</p>
              </div>
            </div>
            {featured.preview_urls.length > 0 && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {featured.preview_urls.slice(0, 4).map((u, i) => (
                  <div key={u} className="relative aspect-[5/4] overflow-hidden rounded-[22px] border-4 border-white bg-white">
                    <Image src={u} alt={`Pré-visualização ${i + 1} de ${featured.name}`} fill sizes="(min-width: 768px) 280px, 45vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* LIVROS MAIS RECENTES */}
      {others.length > 0 && (
        <section className="container-page flex flex-col gap-7 pt-16 sm:pt-20" aria-labelledby="h-recentes">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="h-recentes" className="text-4xl">Livros mais recentes</h2>
            <Link href="/loja" className="text-base font-extrabold underline">Ver todos →</Link>
          </div>
          <ProductGrid products={recentes} />
        </section>
      )}

      {/* HISTÓRIAS INFANTIS */}
      {historias.length > 1 && (
        <section className="container-page flex flex-col gap-7 pt-16 sm:pt-20" aria-labelledby="h-historias">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              <h2 id="h-historias" className="text-4xl">Histórias infantis</h2>
              <p className="text-[17px] text-ink">Livros ilustrados para ler à hora de deitar ou numa tarde de chuva.</p>
            </div>
            <Link href="/categoria/historias-infantis" className="text-base font-extrabold underline">Ver todas →</Link>
          </div>
          <ProductGrid products={historias} />
        </section>
      )}

      {/* ATIVIDADES EDUCATIVAS */}
      {atividades.length > 0 && (
        <section className="container-page flex flex-col gap-7 pt-16 sm:pt-20" aria-labelledby="h-atividades">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              <h2 id="h-atividades" className="text-4xl">Atividades educativas</h2>
              <p className="text-[17px] text-ink">Materiais para imprimir e aprender a brincar.</p>
            </div>
            <Link href="/categoria/atividades-educativas" className="text-base font-extrabold underline">Ver todas →</Link>
          </div>
          <ProductGrid products={atividades} />
        </section>
      )}

      {/* MAIS A CAMINHO (enquanto o catálogo é pequeno) */}
      {products.length < 4 && (
        <section className="container-page pt-16 sm:pt-20">
          <div className="flex flex-col items-center gap-3 rounded-[36px] bg-mint px-6 py-12 text-center">
            <StarIcon size={40} />
            <h2 className="text-3xl">Mais histórias e atividades a caminho</h2>
            <p className="max-w-xl text-[17px] leading-relaxed text-[#2F4A3E]">
              Estamos a preparar novos eBooks, livros de colorir e materiais para imprimir. Volta em breve!
            </p>
          </div>
        </section>
      )}

      <div className="pt-16 sm:pt-20">
        <Steps />
      </div>

      {/* SOBRE */}
      <section className="bg-blush py-16">
        <div className="container-page flex flex-col gap-4 md:max-w-3xl">
          <h2 className="text-4xl leading-tight">Onde a imaginação cresce e a aprendizagem ganha magia</h2>
          <p className="text-[17px] leading-relaxed text-[#3B3D69]">
            O Pequeno Mundo Mágico reúne eBooks de histórias, livros de colorir, atividades educativas e materiais para
            imprimir, pensados para crianças até aos 12 anos.
          </p>
          <Link href="/sobre" className="w-fit text-base font-extrabold underline">Conhecer a marca →</Link>
        </div>
      </section>
    </>
  );
}
