import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StarIcon } from "@/components/StarIcon";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="conteudo" className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <StarIcon size={56} />
        <h1 className="text-4xl sm:text-5xl">Esta página perdeu o brilho</h1>
        <p className="max-w-md text-lg text-ink">Não encontrámos o que procuras. Vamos voltar à loja?</p>
        <Link href="/loja" className="btn-primary mt-2">Ir para a Loja</Link>
      </main>
      <Footer />
    </>
  );
}
