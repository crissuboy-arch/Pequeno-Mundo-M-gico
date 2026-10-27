import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description: "Respostas às dúvidas mais comuns sobre os eBooks, o pagamento e a entrega digital.",
  alternates: { canonical: "/perguntas-frequentes" },
};

const faq = [
  { q: "Como recebo o eBook?", a: "A entrega é digital e automática, depois de concluída a compra. O acesso é enviado ao comprador." },
  { q: "Em que formato são os livros?", a: "Em PDF. Podes abrir o ficheiro no telemóvel, tablet ou computador, ou imprimi-lo." },
  { q: "Para que idade são os livros?", a: "Cada produto indica a faixa etária recomendada na sua página. A loja tem materiais para crianças até aos 12 anos." },
  { q: "Como é feito o pagamento?", a: "Ao clicar em «Comprar agora» segues para o checkout seguro, que processa o pagamento. Este site não guarda dados de cartões." },
  { q: "Cada livro tem o seu próprio pagamento?", a: "Sim. Cada produto tem o seu checkout individual, por isso pagas apenas o que escolheste." },
  { q: "Posso partilhar ou revender os ficheiros?", a: "Não. Os produtos são para uso pessoal e familiar. Todos os conteúdos são protegidos por direitos de autor." },
  { q: "Não consigo abrir o ficheiro. E agora?", a: "Escreve-nos através da página de Contactos, com o nome do produto e o e-mail usado na compra." },
  { q: "E se quiser um reembolso?", a: "Consulta a Política de Reembolso e as condições indicadas no checkout." },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <div className="container-page py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <h1 className="mb-2 text-4xl sm:text-5xl">Perguntas frequentes</h1>
        {faq.map((f) => (
          <details key={f.q} className="rounded-[20px] bg-white px-6 py-4 shadow-soft">
            <summary className="cursor-pointer list-none text-[17px] font-extrabold">{f.q}</summary>
            <p className="mt-2 text-[15px] leading-relaxed text-ink">{f.a}</p>
          </details>
        ))}
        <p className="mt-4 text-ink">
          Não encontras a resposta? <Link href="/contactos" className="font-extrabold underline">Fala connosco</Link>.
        </p>
      </div>
    </div>
  );
}
