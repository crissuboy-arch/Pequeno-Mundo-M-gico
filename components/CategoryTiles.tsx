import Link from "next/link";
import { categories } from "@/lib/categories";
import type { Product } from "@/lib/types";

const icons: Record<string, React.ReactNode> = {
  "historias-infantis": (
    <>
      <path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5C4.7 19 4 18.3 4 17.5z" />
      <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v15h5.5c.8 0 1.5-.7 1.5-1.5z" />
    </>
  ),
  "livros-de-colorir": (
    <>
      <path d="M4 20l1-4L16.5 4.5a2 2 0 012.8 0l.2.2a2 2 0 010 2.8L8 19z" />
      <path d="M14.5 6.5l3 3" />
    </>
  ),
  "atividades-educativas": (
    <>
      <path d="M12 3l8 4-8 4-8-4z" />
      <path d="M7 10.5V15c0 1.4 2.2 3 5 3s5-1.6 5-3v-4.5" />
    </>
  ),
  "kits-e-colecoes": (
    <>
      <rect x="3.5" y="9" width="17" height="11" rx="2" />
      <path d="M3 9h18M12 9v11M12 9c-2.5 0-4-1-4-2.5S9.5 4 12 9zM12 9c2.5 0 4-1 4-2.5S14.5 4 12 9z" />
    </>
  ),
};

export function CategoryTiles({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((c) => {
        const n = products.filter((p) => p.category === c.slug).length;
        return (
          <Link
            key={c.slug}
            href={`/categoria/${c.slug}`}
            className={`${c.bg} flex flex-col gap-3.5 rounded-[28px] p-7 transition hover:-translate-y-1`}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#2D2F5B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {icons[c.slug]}
              </svg>
            </span>
            <span className="font-display text-[23px] font-semibold leading-tight">{c.name}</span>
            <span className="text-[15px] text-ink">{c.short}</span>
            <span className="text-sm font-extrabold">
              {n === 0 ? "Em breve →" : n === 1 ? "1 título disponível →" : `${n} títulos disponíveis →`}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
