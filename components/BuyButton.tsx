import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";

type Props = {
  product: Pick<Product, "kiwify_url" | "price_cents">;
  withPrice?: boolean;
  compact?: boolean;
  className?: string;
};

/**
 * Botão "Comprar agora". Usa SEMPRE o link de checkout Kiwify do próprio produto.
 * Sem link configurado, não há botão de compra (aparece "Em breve").
 */
export function BuyButton({ product, withPrice = false, compact = false, className = "" }: Props) {
  const label = withPrice ? `Comprar agora — ${formatPrice(product.price_cents)}` : "Comprar agora";

  if (!product.kiwify_url) {
    return (
      <span aria-disabled="true" className={`${compact ? "inline-flex cursor-not-allowed rounded-full bg-gray-200 px-5 py-2.5 text-sm font-extrabold text-ink" : "btn-disabled"} ${className}`}>
        Em breve
      </span>
    );
  }

  return (
    <a
      href={product.kiwify_url}
      rel="noopener noreferrer"
      className={
        compact
          ? `inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-extrabold text-navy hover:bg-gold-deep ${className}`
          : `btn-primary ${className}`
      }
    >
      {label}
    </a>
  );
}
