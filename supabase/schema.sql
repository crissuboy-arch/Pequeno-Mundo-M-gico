-- Pequeno Mundo Mágico — esquema do Supabase
-- Executar uma vez em: Supabase > SQL Editor > New query > Run

create extension if not exists pgcrypto;

-- Quem pode usar o painel administrativo (por e-mail)
create table if not exists public.admins (
  email text primary key
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  subtitle text,
  category text not null check (category in ('historias-infantis','livros-de-colorir','atividades-educativas','kits-e-colecoes')),
  age_min int not null default 0,
  age_max int not null default 12,
  pages int,
  price_cents int not null check (price_cents >= 0),
  format text not null default 'eBook PDF',
  short_description text not null default '',
  description text not null default '',
  benefits text[] not null default '{}',
  included text[] not null default '{}',
  faq jsonb not null default '[]'::jsonb,
  cover_url text,
  preview_urls text[] not null default '{}',
  kiwify_url text,
  published boolean not null default false,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Um produto só pode estar publicado se tiver o link de checkout da Kiwify
  constraint published_requires_kiwify check (not published or (kiwify_url is not null and kiwify_url <> ''))
);

create or replace function public.set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at before update on public.products
  for each row execute function public.set_updated_at();

-- Segurança (RLS)
alter table public.products enable row level security;
alter table public.admins enable row level security;

drop policy if exists "Público lê produtos publicados" on public.products;
create policy "Público lê produtos publicados" on public.products
  for select using (published = true);

drop policy if exists "Admins gerem produtos" on public.products;
create policy "Admins gerem produtos" on public.products
  for all to authenticated
  using (exists (select 1 from public.admins a where a.email = (auth.jwt() ->> 'email')))
  with check (exists (select 1 from public.admins a where a.email = (auth.jwt() ->> 'email')));

drop policy if exists "Admin lê o próprio registo" on public.admins;
create policy "Admin lê o próprio registo" on public.admins
  for select to authenticated using (email = (auth.jwt() ->> 'email'));

-- Imagens (capas e pré-visualizações)
insert into storage.buckets (id, name, public)
values ('produtos', 'produtos', true)
on conflict (id) do nothing;

drop policy if exists "Admins enviam imagens" on storage.objects;
create policy "Admins enviam imagens" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'produtos' and exists (select 1 from public.admins a where a.email = (auth.jwt() ->> 'email')));

drop policy if exists "Admins atualizam imagens" on storage.objects;
create policy "Admins atualizam imagens" on storage.objects
  for update to authenticated
  using (bucket_id = 'produtos' and exists (select 1 from public.admins a where a.email = (auth.jwt() ->> 'email')));

drop policy if exists "Admins apagam imagens" on storage.objects;
create policy "Admins apagam imagens" on storage.objects
  for delete to authenticated
  using (bucket_id = 'produtos' and exists (select 1 from public.admins a where a.email = (auth.jwt() ->> 'email')));

-- PASSO MANUAL: criar o utilizador em Authentication > Users (e-mail + palavra-passe)
-- e depois autorizar esse e-mail como administrador (trocar pelo teu e-mail):
-- insert into public.admins (email) values ('O_TEU_EMAIL_AQUI');

-- Livro de arranque (fica oculto até publicares no painel; o PDF deve estar na Kiwify antes)
insert into public.products
  (slug, name, subtitle, category, age_min, age_max, pages, price_cents, format, short_description, description, benefits, included, faq, cover_url, preview_urls, kiwify_url, published, featured)
values (
  'luna-e-a-estrela-que-perdeu-o-brilho',
  'Luna e a Estrela que Perdeu o Brilho',
  'Uma aventura mágica sobre amizade, coragem e autoconfiança',
  'historias-infantis', 4, 7, 30, 699, 'eBook PDF · A4 vertical',
  'Uma aventura encantadora sobre amizade, coragem, empatia e autoconfiança, com atividades divertidas.',
  E'Acompanhe Luna numa aventura mágica para ajudar uma pequena estrela que perdeu o seu brilho!\n\nUma história encantadora sobre amizade, coragem, empatia e autoconfiança, com ilustrações coloridas e atividades divertidas para prolongar a aprendizagem.\n\nIdeal para momentos de leitura em família, antes de dormir ou para explorar emoções com os mais pequenos.',
  array['Amizade','Coragem','Empatia','Autoconfiança'],
  array['História ilustrada','Atividades educativas','Diploma mágico','Ficheiro PDF com 30 páginas, em A4 vertical'],
  '[{"q":"Para que idade é recomendado?","a":"Para crianças dos 4 aos 7 anos, de preferência lido em conjunto com um adulto."},{"q":"Em que formato recebo o livro?","a":"Em PDF, com 30 páginas em A4 vertical. Pode ser lido no telemóvel, tablet ou computador, ou impresso."},{"q":"Como recebo o acesso?","a":"A entrega é digital e feita através da Kiwify, depois de concluída a compra."}]'::jsonb,
  '/produtos/luna/capa.jpg',
  array['/produtos/luna/preview-1.jpg','/produtos/luna/preview-2.jpg','/produtos/luna/preview-3.jpg','/produtos/luna/preview-4.jpg','/produtos/luna/preview-5.jpg','/produtos/luna/preview-6.jpg','/produtos/luna/preview-7.jpg','/produtos/luna/preview-8.jpg'],
  'https://pay.kiwify.com/rMZmjLv',
  false, true
)
on conflict (slug) do nothing;
