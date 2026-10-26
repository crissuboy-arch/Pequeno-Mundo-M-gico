import Link from "next/link";
import { StarIcon } from "./StarIcon";

/**
 * Logótipo provisório em texto. Para usar o logótipo oficial, colocar o ficheiro em
 * public/logo.png (ou .svg) e trocar o conteúdo deste componente por <Image src="/logo.png" ... />.
 */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="Pequeno Mundo Mágico — página inicial" className="flex items-center gap-2.5">
      <StarIcon size={36} />
      <span className={`font-display text-2xl font-semibold leading-none sm:text-[27px] ${light ? "text-cream" : "text-navy"}`}>
        Pequeno <span className={light ? "text-gold" : "text-rose"}>Mundo</span> Mágico
      </span>
    </Link>
  );
}
