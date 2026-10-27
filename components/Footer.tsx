import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const col = "flex flex-col gap-2.5 text-[15px]";
const link = "text-[#E9EAF8] hover:text-gold";

export function Footer() {
  return (
    <footer className="bg-navy pb-8 pt-14 text-[#E9EAF8]">
      <div className="container-page flex flex-col gap-10">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-xs flex-col gap-3">
            <Logo light />
            <p className="text-[15px] leading-relaxed">{site.slogan}</p>
          </div>
          <div className={col}>
            <span className="font-extrabold text-cream">Loja</span>
            <Link className={link} href="/loja">Todos os produtos</Link>
            <Link className={link} href="/categoria/historias-infantis">Histórias Infantis</Link>
            <Link className={link} href="/categoria/livros-de-colorir">Livros de Colorir</Link>
            <Link className={link} href="/categoria/atividades-educativas">Atividades Educativas</Link>
            <Link className={link} href="/categoria/kits-e-colecoes">Kits e Coleções</Link>
          </div>
          <div className={col}>
            <span className="font-extrabold text-cream">Informação</span>
            <Link className={link} href="/sobre">Sobre a Marca</Link>
            <Link className={link} href="/contactos">Contactos</Link>
            <Link className={link} href="/perguntas-frequentes">Perguntas Frequentes</Link>
            <a
              className={link}
              href="https://www.livroreclamacoes.pt"
              target="_blank"
              rel="noopener noreferrer"
            >
              Livro de Reclamações
            </a>
          </div>
          <div className={col}>
            <span className="font-extrabold text-cream">Legal</span>
            <Link className={link} href="/termos-e-condicoes">Termos e Condições</Link>
            <Link className={link} href="/politica-de-privacidade">Política de Privacidade</Link>
            <Link className={link} href="/politica-de-reembolso">Política de Reembolso</Link>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 border-t border-[#5B5E8A] pt-6 text-[13px] leading-relaxed text-[#C9CBE6]">
          <span>
            {site.seller.name} · NIF {site.seller.nif} · {site.seller.email}
          </span>
          <span>
            Pagamentos processados por plataforma segura. A loja não guarda dados de cartões. © {new Date().getFullYear()} {site.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
