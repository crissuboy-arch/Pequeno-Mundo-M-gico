import Link from "next/link";
import { logout } from "@/app/admin/actions";
import { StarIcon } from "@/components/StarIcon";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b-2 border-sky bg-white">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-5 py-4">
          <Link href="/admin" className="flex items-center gap-2.5 font-display text-xl font-semibold">
            <StarIcon size={28} />
            Painel · Pequeno Mundo Mágico
          </Link>
          <nav className="flex flex-wrap items-center gap-3 text-sm font-extrabold">
            <Link href="/admin/produtos/novo" className="rounded-full bg-gold px-4 py-2.5">+ Novo produto</Link>
            <Link href="/" className="underline">Ver a loja</Link>
            <form action={logout}>
              <button type="submit" className="rounded-full border-2 border-navy px-4 py-2 hover:bg-sky">Sair</button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-[1100px] px-5 py-8">{children}</main>
    </div>
  );
}
