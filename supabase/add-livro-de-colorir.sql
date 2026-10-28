-- Adiciona o «Livro de Colorir» (executar no SQL Editor do Supabase)
insert into public.products
  (slug, name, subtitle, category, age_min, age_max, pages, price_cents, format, short_description, description, benefits, included, faq, cover_url, preview_urls, kiwify_url, published, featured)
values (
  'pequeno-mundo-magico-livro-de-colorir',
  'Pequeno Mundo Mágico — Livro de Colorir',
  '22 desenhos para pintar com o Pedro e o Tóbi',
  'livros-de-colorir', 3, 7, 24, 500, 'eBook PDF · A4 vertical',
  '22 desenhos com contornos grossos e simples, prontos a pintar com o Pedro e o Tóbi. Imprime em casa as vezes que quiseres.',
  E'Pega nos lápis e vem pintar com o Pedro e o Tóbi!\n\nNeste livro de colorir vais encontrar 22 desenhos com contornos grossos e simples, feitos para mãos pequenas: o Pedro e o Tóbi no jardim, na praia e na floresta, um dinossauro simpático, um unicórnio nas nuvens, um arco-íris, um panda, uma capivara, um gatinho, borboletas, abelhas, um comboio, um carro, balões, o Natal, uma festa de aniversário e muito mais.\n\nTodos os desenhos são originais do Pequeno Mundo Mágico, sem personagens de outras marcas. No fim do livro há uma página livre para a criança desenhar o que quiser.',
  array['Criatividade','Motricidade fina','Momentos em família','Imprime as vezes que quiseres'],
  array['22 páginas de colorir com o Pedro e o Tóbi','Capa a cores','Página final livre para desenhar','Ficheiro PDF em A4, pronto a imprimir'],
  '[{"q":"Para que idade é recomendado?","a":"Para crianças dos 3 aos 7 anos, de preferência a pintar em conjunto com um adulto."},{"q":"Em que formato recebo o livro?","a":"Em PDF, com 24 páginas em A4 vertical. Pode ser impresso em casa as vezes que quiseres."},{"q":"Como recebo o acesso?","a":"A entrega é digital e automática, depois de concluída a compra."}]'::jsonb,
  '/produtos/livro-de-colorir/capa.jpg',
  array['/produtos/livro-de-colorir/preview-1.jpg','/produtos/livro-de-colorir/preview-2.jpg','/produtos/livro-de-colorir/preview-3.jpg','/produtos/livro-de-colorir/preview-4.jpg','/produtos/livro-de-colorir/preview-5.jpg','/produtos/livro-de-colorir/preview-6.jpg'],
  'https://pay.hotmart.com/H108229914M',
  true, false
)
on conflict (slug) do nothing;
