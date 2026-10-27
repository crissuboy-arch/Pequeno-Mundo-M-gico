import type { Metadata } from "next";
import Link from "next/link";
import { StarIcon } from "@/components/StarIcon";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Sobre a marca",
  description:
    "O Pequeno Mundo Mágico é uma marca infantil de eBooks de histórias, livros de colorir, atividades educativas e materiais para imprimir.",
  alternates: { canonical: "/sobre" },
};

export default function Sobre() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#CFE8F8] to-cream">
        <div className="container-page flex flex-col items-start gap-5 py-14 sm:py-20 md:max-w-4xl">
          <StarIcon size={40} />
          <h1 className="text-4xl leading-tight sm:text-6xl">Onde a imaginação cresce e a aprendizagem ganha magia</h1>
          <p className="text-xl leading-relaxed text-ink">
            O Pequeno Mundo Mágico é uma marca infantil que reúne eBooks de histórias, livros de colorir, atividades
            educativas, materiais para imprimir e kits digitais, para crianças até aos 12 anos.
          </p>
        </div>
      </section>

      <section className="container-page flex flex-col gap-8 py-14">
        <h2 className="text-3xl sm:text-4xl">O que vais encontrar</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {categories.map((c) => (
            <Link key={c.slug} href={`/categoria/${c.slug}`} className={`${c.bg} flex flex-col gap-2 rounded-3xl p-7`}>
              <span className="font-display text-2xl font-semibold">{c.name}</span>
              <span className="text-[15px] leading-relaxed text-[#2F3160]">{c.description}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-blush py-14">
        <div className="container-page flex flex-col gap-4 md:max-w-3xl">
          <h2 className="text-3xl sm:text-4xl">Como compras</h2>
          <p className="text-[17px] leading-relaxed text-[#3B3D69]">
            Escolhes o produto, clicas em «Comprar agora» e segues para o pagamento seguro. A entrega é
            digital: depois de concluída a compra, recebes o acesso ao ficheiro.
          </p>
          <Link href="/loja" className="btn-primary mt-2 w-fit">Explorar os Livros</Link>
        </div>
      </section>
    </>
  );
}
