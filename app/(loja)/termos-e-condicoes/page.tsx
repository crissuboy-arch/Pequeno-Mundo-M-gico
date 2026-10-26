import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description: "Termos e condições de compra dos eBooks e materiais digitais do Pequeno Mundo Mágico.",
  alternates: { canonical: "/termos-e-condicoes" },
};

export default function Termos() {
  return (
    <LegalPage title="Termos e Condições" updated="26 de outubro de 2026">
      <h2>1. Identificação do vendedor</h2>
      <p>
        {site.seller.name}, NIF {site.seller.nif}, com sede em {site.seller.address}. Contacto: {site.seller.email}.
        Este site apresenta os produtos do {site.name} ({site.url.replace("https://", "")}).
      </p>

      <h2>2. Produtos</h2>
      <p>
        Vendemos produtos digitais: eBooks de histórias, livros de colorir, atividades educativas, materiais para
        imprimir e kits digitais, em formato PDF. Cada produto indica a faixa etária recomendada, o número de páginas e
        o formato do ficheiro. Não se vendem produtos físicos.
      </p>

      <h2>3. Preços e pagamento</h2>
      <p>
        Os preços estão indicados em euros. Ao clicar em «Comprar agora», o cliente é encaminhado para o checkout da
        Kiwify, plataforma que processa o pagamento. Este site não recolhe nem guarda dados de cartões ou de outros
        meios de pagamento.
      </p>

      <h2>4. Entrega</h2>
      <p>
        A entrega é digital e feita através da Kiwify, depois de concluída a compra. O comprador recebe o acesso ao
        ficheiro nas condições indicadas no checkout e no e-mail de confirmação.
      </p>

      <h2>5. Utilização dos conteúdos</h2>
      <p>
        Os produtos destinam-se a uso pessoal e familiar. Não é permitido revender, partilhar publicamente, copiar para
        redes de partilha ou usar comercialmente os ficheiros, sem autorização escrita. Todos os textos, ilustrações e
        personagens são protegidos por direitos de autor.
      </p>

      <h2>6. Resultados educativos</h2>
      <p>
        Os materiais têm finalidade recreativa e educativa e foram pensados para apoiar a leitura e a aprendizagem em
        família. Não garantimos resultados educativos específicos.
      </p>

      <h2>7. Reembolsos e livre resolução</h2>
      <p>
        Consulta a nossa <a href="/politica-de-reembolso">Política de Reembolso</a>.
      </p>

      <h2>8. Reclamações e litígios</h2>
      <p>
        O consumidor pode apresentar reclamações no{" "}
        <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer">Livro de Reclamações Eletrónico</a>{" "}
        e recorrer a uma entidade de Resolução Alternativa de Litígios de consumo. Os contratos regem-se pela lei
        portuguesa.
      </p>

      <h2>9. Alterações</h2>
      <p>Podemos atualizar estes termos. A versão em vigor é a publicada nesta página.</p>
    </LegalPage>
  );
}
