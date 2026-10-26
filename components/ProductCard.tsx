import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatAge, formatPrice } from "@/lib/format";
import { BuyButton } from "./BuyButton";

export function ProductCard({ product }: { product: Product }) {
  const href = `/produto/${product.slug}`;
  return (
    <article className="flex min-w-0 flex-col gap-3.5 rounded-[28px] bg-white p-4 shadow-soft">
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden rounded-[20px] bg-sky" aria-label={product.name}>
        <Image
          src={product.cover_url}
          alt={`Capa do eBook ${product.name}`}
          fill
          sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 px-1.5 pb-1.5">
        <span className="text-xs font-extrabold uppercase tracking-wide text-rose">
          {formatAge(product)} · {product.format.split("·")[0].trim()}
        </span>
        <h3 className="font-display text-xl font-semibold leading-tight">
          <Link href={href} className="hover:text-rose">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="font-display text-[22px] font-semibold">{formatPrice(product.price_cents)}</span>
          <BuyButton product={product} compact />
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
