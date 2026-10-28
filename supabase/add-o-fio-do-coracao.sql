-- Adiciona o livro «O Fio do Coração» (executar no SQL Editor do Supabase)
insert into public.products
  (slug, name, subtitle, category, age_min, age_max, pages, price_cents, format, short_description, description, benefits, included, faq, cover_url, preview_urls, kiwify_url, published, featured)
values (
  'o-fio-do-coracao',
  'O Fio do Coração',
  'Uma história sobre saudades, ligação e amor que nunca se parte',
  'historias-infantis', 3, 7, 26, 699, 'eBook PDF · formato quadrado',
  'O Pedro vai dormir pela primeira vez a casa dos avós e descobre o fio invisível que o liga a quem ama.',
  E'Amanhã, o Pedro vai dormir a casa dos avós pela primeira vez. Está contente… e também um bocadinho nervoso. À noite, quando o coração aperta com saudades, ele lembra-se do segredo que a mãe lhe contou: há um fio invisível de luz que liga o seu coração a quem ele ama.\n\nUma história terna e ilustrada para ajudar as crianças a lidar com as saudades e com as primeiras noites fora de casa, e a perceber que nunca estão sozinhas.\n\nNo final, há um convite para a criança desenhar o seu próprio fio e dizer em voz alta a quem está ligada.',
  array['Saudades','Segurança emocional','Amor e ligação','Primeiras separações'],
  array['História ilustrada com o Pedro e o Tóbi','Atividade «Desenha o teu fio»','Perguntas para conversar em família','Ficheiro PDF com 26 páginas, em formato quadrado'],
  '[{"q":"Para que idade é recomendado?","a":"Para crianças dos 3 aos 7 anos, de preferência lido em conjunto com um adulto."},{"q":"Em que formato recebo o livro?","a":"Em PDF, com 26 páginas em formato quadrado. Pode ser lido no telemóvel, tablet ou computador."},{"q":"Como recebo o acesso?","a":"A entrega é digital e automática, depois de concluída a compra."}]'::jsonb,
  '/produtos/fio-do-coracao/capa.jpg',
  array['/produtos/fio-do-coracao/preview-1.jpg','/produtos/fio-do-coracao/preview-2.jpg','/produtos/fio-do-coracao/preview-3.jpg','/produtos/fio-do-coracao/preview-4.jpg','/produtos/fio-do-coracao/preview-5.jpg','/produtos/fio-do-coracao/preview-6.jpg','/produtos/fio-do-coracao/preview-7.jpg','/produtos/fio-do-coracao/preview-8.jpg'],
  'https://pay.hotmart.com/S108229780E',
  true, true
)
on conflict (slug) do nothing;
