import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";

/** Garante que quem acede é um administrador autorizado (tabela public.admins). */
export async function requireAdmin() {
  if (!supabaseConfigured) redirect("/admin/login");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: admin } = await supabase.from("admins").select("email").eq("email", user.email ?? "").maybeSingle();
  if (!admin) redirect("/admin/login?erro=sem-permissao");

  return { supabase, user };
}
