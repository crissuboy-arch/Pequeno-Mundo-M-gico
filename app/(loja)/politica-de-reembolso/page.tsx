import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Reembolso",
  description: "Condições de reembolso e livre resolução dos produtos digitais do Pequeno Mundo Mágico.",
  alternates: { canonical: "/politica-de-reembolso" },
};

export default function Reembolso() {
  return (
    <LegalPage title="Política de Reembolso" updated="26 de outubro de 2026">
      <h2>Produtos digitais</h2>
      <p>
        Os nossos produtos são ficheiros digitais (PDF), entregues através da Kiwify logo após a compra. Nos termos da
        legislação de defesa do consumidor, o direito de livre resolução pode não se aplicar ao fornecimento de
        conteúdo digital não fornecido em suporte material, quando a execução tiver início com o consentimento prévio
        expresso do consumidor e o reconhecimento de que, com isso, perde o direito de livre resolução.
      </p>

      <h2>Condições de reembolso</h2>
      <p>
        As condições de reembolso aplicáveis a cada compra são as indicadas no checkout da Kiwify no momento da compra.
        [A CONFIRMAR PELO VENDEDOR: prazo e condições de garantia/reembolso que pretende oferecer.]
      </p>

      <h2>Problemas com o ficheiro</h2>
      <p>
        Se não conseguires abrir o ficheiro ou se ele chegar danificado, escreve-nos para {site.seller.email} com o
        e-mail usado na compra e ajudamos a resolver.
      </p>
    </LegalPage>
  );
}
