import { requireAdmin } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NovoProduto() {
  await requireAdmin();
  return (
    <AdminShell>
      <h1 className="mb-6 text-3xl">Novo produto</h1>
      <ProductForm />
    </AdminShell>
  );
}
