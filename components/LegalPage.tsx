export function LegalPage({ title, updated, children }: { title: string; updated?: string; children: React.ReactNode }) {
  return (
    <div className="container-page py-10 sm:py-14">
      <article className="mx-auto flex max-w-3xl flex-col gap-5 rounded-[32px] bg-white p-7 shadow-soft sm:p-12 [&_h2]:mt-4 [&_h2]:text-2xl [&_li]:leading-relaxed [&_p]:leading-relaxed [&_p]:text-[#2F3160] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-[#2F3160] [&_a]:font-extrabold [&_a]:underline">
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        {updated && <p className="text-sm font-bold text-ink">Última atualização: {updated}</p>}
        {children}
      </article>
    </div>
  );
}
