# Pequeno Mundo Mágico — loja de eBooks infantis

Loja virtual de produtos digitais (eBooks em PDF, livros de colorir, atividades e kits) para `pequenomundomagico.pt`.

- **Pagamentos e entrega:** feitos pela **Kiwify**. A loja não tem carrinho nem checkout próprio e não guarda dados de cartões.
- **Cada livro tem o seu próprio link de checkout Kiwify.** O botão «Comprar agora» usa sempre o link do próprio produto.
- **Sem link Kiwify, não há compra:** o botão mostra «Em breve». Um produto só pode ser publicado com um link Kiwify válido.
- **Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Supabase (catálogo, painel e imagens).

## Páginas

Home · Loja (filtros por categoria e idade) · Categorias · Página de cada livro · Sobre · Contactos · Perguntas Frequentes · Termos · Privacidade · Reembolso · `/admin` (painel).

SEO incluído: títulos e descrições por página, URLs amigáveis (`/produto/<slug>`), `sitemap.xml`, `robots.txt`, dados estruturados (Product, FAQ), partilha em redes sociais (Open Graph).

## Pôr online (passo a passo)

### 1. Vercel
1. Na Vercel: **Add New → Project** e escolher este repositório do GitHub.
2. Em **Settings → Environment Variables**, definir as variáveis de `.env.example` (ver passos 2 e 3).
3. Em **Settings → Domains**, adicionar `pequenomundomagico.pt`.

### 2. Supabase (catálogo + painel)
1. Criar um projeto em supabase.com.
2. **SQL Editor → New query**, colar o conteúdo de `supabase/schema.sql` e executar. Isto cria as tabelas, a segurança (RLS), o armazenamento de imagens e o livro Luna (oculto).
3. **Authentication → Users → Add user**: criar o utilizador administrador (e-mail + palavra-passe).
4. No SQL Editor, autorizar esse e-mail:
   ```sql
   insert into public.admins (email) values ('O_TEU_EMAIL_AQUI');
   ```
5. **Project Settings → API**: copiar o *Project URL* e a chave *anon public* para as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` na Vercel. Fazer **Redeploy**.

### 3. Dados legais
Na Vercel, definir `NEXT_PUBLIC_SELLER_NAME`, `NEXT_PUBLIC_SELLER_NIF`, `NEXT_PUBLIC_SELLER_ADDRESS` e `NEXT_PUBLIC_SELLER_EMAIL`. Aparecem no rodapé, nos Contactos e nas páginas legais.
Rever também as páginas legais (Termos, Privacidade, Reembolso) e preencher o ponto marcado `[A CONFIRMAR PELO VENDEDOR]` na Política de Reembolso. Recomenda-se revisão jurídica.

### 4. Kiwify
1. Na Kiwify, criar o produto «Luna e a Estrela que Perdeu o Brilho» (€4,99), anexar o PDF final (30 páginas, A4 vertical) e copiar o **link de checkout**.
2. No painel: `https://pequenomundomagico.pt/admin` → **Editar** o livro → colar o link em **URL DO CHECKOUT KIWIFY** → marcar **Publicado na loja** → **Guardar**.
3. Repetir para cada novo livro, cada um com o seu produto e link na Kiwify.

## Painel administrativo

`/admin` (protegido por login, fora do Google). Permite:
adicionar e editar eBooks · enviar capa e imagens de pré-visualização · alterar preços · definir o link individual da Kiwify (obrigatório e validado: só `https` e domínios da Kiwify) · escolher categoria e idade · publicar / ocultar · editar descrição, «o que inclui», valores e perguntas frequentes da página de vendas · marcar um produto em destaque na Home.

## Modo sem Supabase

Sem as variáveis do Supabase, o site mostra o catálogo de `data/seed.ts` (só o livro Luna). Para ter o botão de compra nesse modo, definir `KIWIFY_URL_LUNA`. O painel só funciona com Supabase.

## Desenvolvimento local

```bash
cp .env.example .env.local   # preencher as variáveis
npm install
npm run dev                  # http://localhost:3000
```

## Imagens do livro

As imagens em `public/produtos/luna/` foram recortadas de uma folha-resumo e têm resolução baixa. Quando tiveres as ilustrações finais em alta resolução, substitui-as pelo painel (capa e pré-visualizações) ou pelos ficheiros dessa pasta.

## Logótipo

O logótipo no cabeçalho é provisório (texto + estrela). Para usar o logótipo oficial, coloca o ficheiro em `public/` e altera `components/Logo.tsx`.

## VitrinePro

A loja é independente da VitrinePro. Na Montra da VitrinePro, cada produto pode apontar para a respetiva página de vendas: `https://pequenomundomagico.pt/produto/<slug>`.
