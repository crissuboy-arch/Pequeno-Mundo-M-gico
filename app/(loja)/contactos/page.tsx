import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { hasSellerEmail, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contactos",
  description: "Fala com o Pequeno Mundo Mágico: dúvidas sobre produtos, compras e entregas digitais.",
  alternates: { canonical: "/contactos" },
};

export default function Contactos() {
  return (
    <LegalPage title="Contactos">
      <p>Tens uma dúvida sobre um livro, uma compra ou o acesso ao ficheiro? Escreve-nos e respondemos assim que possível.</p>
      <h2>E-mail</h2>
      <p>
        {hasSellerEmail ? (
          <a href={`mailto:${site.seller.email}`}>{site.seller.email}</a>
        ) : (
          site.seller.email
        )}
      </p>
      <h2>Dados do vendedor</h2>
      <p>
        {site.seller.name}
        <br />
        NIF {site.seller.nif}
      </p>
      <h2>Ajuda com uma compra</h2>
      <p>
        Indica no e-mail o nome do produto e o endereço de e-mail usado na compra. O pagamento e a entrega são tratados
        pela plataforma de pagamento.
      </p>
    </LegalPage>
  );
}
