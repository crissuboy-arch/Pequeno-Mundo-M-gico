import Link from "next/link";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { StarIcon } from "./StarIcon";

export const navItems = [
  { href: "/loja", label: "Loja" },
  { href: "/categoria/historias-infantis", label: "Histórias Infantis" },
  { href: "/categoria/livros-de-colorir", label: "Livros de Colorir" },
  { href: "/categoria/atividades-educativas", label: "Atividades" },
  { href: "/categoria/kits-e-colecoes", label: "Kits e Coleções" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contactos", label: "Contactos" },
];

export function Header() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2.5 bg-navy px-5 py-2.5 text-center text-xs font-bold text-cream sm:text-sm">
        <StarIcon size={16} />
        <span>eBooks em PDF · Entrega digital após a compra · Pagamento seguro pela Kiwify</span>
      </div>
      <header className="relative bg-cream">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-6 px-5 py-4 sm:px-10 sm:py-5">
          <Logo />
          <nav aria-label="Menu principal" className="hidden items-center gap-7 text-[15px] font-extrabold lg:flex">
            {navItems.slice(0, 6).map((i) => (
              <Link key={i.href} href={i.href} className="hover:text-rose">
                {i.label}
              </Link>
            ))}
            <Link href="/contactos" className="rounded-full bg-blush px-5 py-3 hover:bg-blush-deep">
              Contactos
            </Link>
          </nav>
          <MobileNav items={navItems} />
        </div>
      </header>
    </>
  );
}
