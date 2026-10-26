import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o Pequeno Mundo Mágico trata os dados pessoais.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function Privacidade() {
  return (
    <LegalPage title="Política de Privacidade" updated="26 de outubro de 2026">
      <h2>1. Responsável pelo tratamento</h2>
      <p>
        {site.seller.name}, NIF {site.seller.nif}, {site.seller.address}. Contacto: {site.seller.email}.
      </p>

      <h2>2. Que dados tratamos</h2>
      <ul>
        <li>
          <strong>Navegação neste site:</strong> o site não usa cookies de publicidade nem de acompanhamento. Podem ser
          registados dados técnicos mínimos (como endereço IP e tipo de dispositivo) pelo serviço de alojamento, para
          segurança e funcionamento.
        </li>
        <li>
          <strong>Compras:</strong> o pagamento e a entrega são feitos na Kiwify. Os dados da compra (nome, e-mail,
          pagamento) são recolhidos e tratados pela Kiwify, de acordo com a sua própria política de privacidade. Este
          site não recebe nem guarda dados de cartões.
        </li>
        <li>
          <strong>Contactos:</strong> se nos enviares um e-mail, usamos os dados que forneceres apenas para responder.
        </li>
      </ul>

      <h2>3. Para que usamos os dados</h2>
      <p>Para responder a pedidos de apoio, cumprir obrigações legais e manter o site seguro.</p>

      <h2>4. Partilha de dados</h2>
      <p>
        Não vendemos dados pessoais. Recorremos a prestadores de serviços (alojamento do site e plataforma de
        pagamentos e entrega), que tratam dados em nosso nome ou como responsáveis próprios, nos termos da lei.
      </p>

      <h2>5. Os teus direitos</h2>
      <p>
        Podes pedir o acesso, a retificação ou o apagamento dos teus dados, a limitação ou oposição ao tratamento e a
        portabilidade, através de {site.seller.email}. Tens também o direito de apresentar queixa à Comissão Nacional
        de Proteção de Dados (cnpd.pt).
      </p>

      <h2>6. Crianças</h2>
      <p>
        Os produtos são destinados a crianças, mas a loja dirige-se a pais, mães e adultos responsáveis, que são quem
        efetua as compras.
      </p>
    </LegalPage>
  );
}
