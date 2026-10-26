import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { getAdminProduct } from "@/lib/products";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditarProduto({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const product = await getAdminProduct(id);
  if (!product) notFound();

  return (
    <AdminShell>
      <h1 className="mb-6 text-3xl">Editar: {product.name}</h1>
      <ProductForm product={product} />
    </AdminShell>
  );
}
