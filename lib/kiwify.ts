/**
 * Validação do link de checkout da Kiwify.
 * Aceita apenas https e domínios da Kiwify (pay.kiwify.com.br, *.kiwify.com.br, *.kiwify.app, *.kiwify.com).
 */
const ALLOWED_SUFFIXES = ["kiwify.com.br", "kiwify.app", "kiwify.com"];

export type KiwifyCheck = { ok: true; url: string } | { ok: false; error: string };

export function validateKiwifyUrl(raw: string | null | undefined): KiwifyCheck {
  const value = (raw ?? "").trim();
  if (!value) return { ok: false, error: "O URL do checkout Kiwify é obrigatório." };

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return { ok: false, error: "O URL do checkout Kiwify não é válido. Cola o link completo, a começar por https://." };
  }

  if (url.protocol !== "https:") {
    return { ok: false, error: "O link tem de começar por https://." };
  }

  const host = url.hostname.toLowerCase();
  const allowed = ALLOWED_SUFFIXES.some((s) => host === s || host.endsWith(`.${s}`));
  if (!allowed) {
    return { ok: false, error: "Este link não é da Kiwify. Usa o link de checkout do produto (ex.: https://pay.kiwify.com.br/xxxx)." };
  }

  if (url.pathname.replace(/\//g, "").length < 3) {
    return { ok: false, error: "O link da Kiwify está incompleto. Falta o código do produto no fim do endereço." };
  }

  return { ok: true, url: url.toString() };
}
