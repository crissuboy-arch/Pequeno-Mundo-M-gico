import { redirect } from "next/navigation";
import { login, logout } from "../actions";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";
import { StarIcon } from "@/components/StarIcon";

const messages: Record<string, string> = {
  credenciais: "E-mail ou palavra-passe incorretos.",
  "sem-permissao": "Esta conta não está autorizada como administradora. Adiciona o e-mail à tabela «admins» no Supabase.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;

  let loggedInWithoutPermission = false;
  if (supabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: admin } = await supabase.from("admins").select("email").eq("email", user.email ?? "").maybeSingle();
      if (admin) redirect("/admin");
      loggedInWithoutPermission = true;
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-5">
      <div className="flex w-full max-w-md flex-col gap-5 rounded-[32px] bg-white p-8 shadow-soft">
        <div className="flex items-center gap-2.5">
          <StarIcon size={32} />
          <h1 className="text-2xl">Painel administrativo</h1>
        </div>

        {!supabaseConfigured ? (
          <div className="flex flex-col gap-2 rounded-2xl bg-gold-soft p-4 text-[15px] leading-relaxed">
            <strong>O Supabase ainda não está configurado.</strong>
            <span>
              Define <code>NEXT_PUBLIC_SUPABASE_URL</code> e <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> nas variáveis de
              ambiente da Vercel e executa <code>supabase/schema.sql</code>. Os passos estão no README.
            </span>
          </div>
        ) : loggedInWithoutPermission ? (
          <div className="flex flex-col gap-3">
            <p className="rounded-2xl bg-blush p-4 text-[15px]">{messages["sem-permissao"]}</p>
            <form action={logout}>
              <button type="submit" className="btn-secondary w-full">Sair</button>
            </form>
          </div>
        ) : (
          <form action={login} className="flex flex-col gap-4">
            {erro && messages[erro] && (
              <p role="alert" className="rounded-2xl bg-blush p-4 text-[15px] font-bold">{messages[erro]}</p>
            )}
            <label className="flex flex-col gap-1.5 text-sm font-extrabold">
              E-mail
              <input name="email" type="email" required autoComplete="username" className="field" />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-extrabold">
              Palavra-passe
              <input name="password" type="password" required autoComplete="current-password" className="field" />
            </label>
            <button type="submit" className="btn-primary">Entrar</button>
          </form>
        )}
      </div>
    </div>
  );
}
