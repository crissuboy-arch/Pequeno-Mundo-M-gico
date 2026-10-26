import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { getAdminProducts } from "@/lib/products";
import { categoryBySlug } from "@/lib/categories";
import { formatPrice } from "@/lib/format";
import { validateKiwifyUrl } from "@/lib/kiwify";
import { AdminShell } from "@/components/admin/AdminShell";
import { togglePublish } from "./actions";

export default async function AdminHome({ searchParams }: { searchParams: Promise<{ ok?: string; erro?: string }> }) {
  await requireAdmin();
  const sp = await searchParams;
  const products = await getAdminProducts();

  const okText: Record<string, string> = {
    guardado: "Produto guardado.",
    publicado: "Produto publicado na loja.",
    ocultado: "Produto ocultado da loja.",
  };

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-3xl">Produtos</h1>
          <Link href="/admin/produtos/novo" className="btn-primary !px-6 !py-3 !text-base">+ Novo produto</Link>
        </div>

        {sp.ok && okText[sp.ok] && (
          <p role="status" className="rounded-2xl bg-mint px-5 py-3 font-bold">{okText[sp.ok]}</p>
        )}
        {sp.erro && (
          <p role="alert" className="rounded-2xl bg-blush px-5 py-3 font-bold">{sp.erro}</p>
        )}

        {products.length === 0 ? (
          <p className="rounded-2xl bg-white p-8 text-ink">Ainda não há produtos. Cria o primeiro com «Novo produto».</p>
        ) : (
          <div className="overflow-x-auto rounded-3xl bg-white shadow-soft">
            <table className="w-full min-w-[760px] text-left text-[15px]">
              <thead className="bg-sky text-sm">
                <tr>
                  <th className="px-5 py-3">Produto</th>
                  <th className="px-5 py-3">Categoria</th>
                  <th className="px-5 py-3">Preço</th>
                  <th className="px-5 py-3">Checkout Kiwify</th>
                  <th className="px-5 py-3">Estado</th>
                  <th className="px-5 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => {
                  const kiwifyOk = validateKiwifyUrl(p.kiwify_url).ok;
                  return (
                    <tr key={p.id} className="border-t border-sky">
                      <td className="px-5 py-4 font-extrabold">
                        {p.name}
                        {p.featured && <span className="ml-2 rounded-full bg-gold-soft px-2 py-0.5 text-xs">Destaque</span>}
                      </td>
                      <td className="px-5 py-4">{categoryBySlug(p.category)?.name}</td>
                      <td className="px-5 py-4">{formatPrice(p.price_cents)}</td>
                      <td className="px-5 py-4">
                        {kiwifyOk ? (
                          <span className="rounded-full bg-mint px-3 py-1 text-sm font-bold">Configurado</span>
                        ) : (
                          <span className="rounded-full bg-blush px-3 py-1 text-sm font-bold">Em falta</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-3 py-1 text-sm font-bold ${p.published ? "bg-mint" : "bg-gray-200"}`}>
                          {p.published ? "Publicado" : "Oculto"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap items-center justify-end gap-2">
                          <Link href={`/admin/produtos/${p.id}`} className="rounded-full border-2 border-navy px-4 py-1.5 text-sm font-extrabold hover:bg-sky">Editar</Link>
                          <form action={togglePublish}>
                            <input type="hidden" name="id" value={p.id} />
                            <input type="hidden" name="publish" value={p.published ? "0" : "1"} />
                            <button type="submit" className="rounded-full bg-gold px-4 py-1.5 text-sm font-extrabold hover:bg-gold-deep">
                              {p.published ? "Ocultar" : "Publicar"}
                            </button>
                          </form>
                          {p.published && (
                            <Link href={`/produto/${p.slug}`} className="text-sm font-extrabold underline">Ver</Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
