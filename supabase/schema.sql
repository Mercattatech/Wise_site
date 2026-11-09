-- Wise Madness · banco da Transparência e da área administrativa
-- Rode este arquivo inteiro no SQL Editor do Supabase (uma vez). Depois rode seed.sql.
--
-- Segurança: todas as regras ficam no banco (Row Level Security). O navegador só
-- tem a chave pública (anon); sem estar logado E cadastrado em public.admins,
-- ninguém grava, apaga, envia arquivo ou lê a ouvidoria, mesmo mexendo no JavaScript.

-- ============================================================
-- Administradores
-- ============================================================
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;
grant select on public.admins to authenticated;

drop policy if exists "admin vê o próprio cadastro" on public.admins;
create policy "admin vê o próprio cadastro" on public.admins
  for select to authenticated using (user_id = auth.uid());

-- Sem policies de insert/update/delete: só o painel do Supabase (service role) cadastra admins.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- ============================================================
-- Conteúdo da Transparência (leitura pública, escrita só admin)
-- ============================================================
create table if not exists public.transparencia (
  colecao    text not null check (colecao in ('parcerias', 'documentos', 'contas', 'dirigentes', 'unidades', 'transp')),
  id         text not null check (length(id) between 1 and 80),
  data       jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid default auth.uid(),
  primary key (colecao, id)
);
alter table public.transparencia enable row level security;
revoke all on public.transparencia from anon, authenticated;
grant select on public.transparencia to anon, authenticated;
grant insert, update, delete on public.transparencia to authenticated;

drop policy if exists "leitura pública" on public.transparencia;
create policy "leitura pública" on public.transparencia
  for select to anon, authenticated using (true);

drop policy if exists "admin insere" on public.transparencia;
create policy "admin insere" on public.transparencia
  for insert to authenticated with check (public.is_admin());

drop policy if exists "admin altera" on public.transparencia;
create policy "admin altera" on public.transparencia
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin apaga" on public.transparencia;
create policy "admin apaga" on public.transparencia
  for delete to authenticated using (public.is_admin());

create or replace function public.transparencia_touch()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end $$;
drop trigger if exists transparencia_touch on public.transparencia;
create trigger transparencia_touch before insert or update on public.transparencia
  for each row execute function public.transparencia_touch();

-- ============================================================
-- Ouvidoria (qualquer visitante envia; só admin lê e responde)
-- ============================================================
create table if not exists public.ouvidoria (
  id            uuid primary key default gen_random_uuid(),
  protocolo     text not null unique,
  tipo          text not null check (tipo in ('Elogio', 'Sugestão', 'Solicitação', 'Reclamação', 'Denúncia')),
  anonimo       boolean not null default false,
  nome          text not null default '' check (length(nome) <= 200),
  contato       text not null default '' check (length(contato) <= 200),
  msg           text not null check (length(msg) between 1 and 5000),
  status        text not null default 'Nova' check (status in ('Nova', 'Em análise', 'Respondida', 'Encaminhada')),
  resposta      text not null default '' check (length(resposta) <= 10000),
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz
);
alter table public.ouvidoria enable row level security;
revoke all on public.ouvidoria from anon, authenticated;
grant select, update on public.ouvidoria to authenticated;

drop policy if exists "admin lê" on public.ouvidoria;
create policy "admin lê" on public.ouvidoria
  for select to authenticated using (public.is_admin());

drop policy if exists "admin responde" on public.ouvidoria;
create policy "admin responde" on public.ouvidoria
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- Envio público passa só por esta função: ela gera o protocolo e força status "Nova".
create or replace function public.registrar_manifestacao(
  p_tipo text, p_anonimo boolean, p_nome text, p_contato text, p_msg text
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_protocolo text;
begin
  if coalesce(trim(p_msg), '') = '' then raise exception 'Mensagem vazia'; end if;
  loop
    v_protocolo := 'WM-' || to_char(now() at time zone 'America/Sao_Paulo', 'YYYYMMDD') || '-' ||
                   upper(substr(md5(gen_random_uuid()::text), 1, 6));
    exit when not exists (select 1 from public.ouvidoria where protocolo = v_protocolo);
  end loop;
  insert into public.ouvidoria (protocolo, tipo, anonimo, nome, contato, msg)
  values (
    v_protocolo, p_tipo, coalesce(p_anonimo, false),
    case when p_anonimo then '' else left(coalesce(trim(p_nome), ''), 200) end,
    case when p_anonimo then '' else left(coalesce(trim(p_contato), ''), 200) end,
    left(trim(p_msg), 5000)
  );
  return v_protocolo;
end $$;
revoke all on function public.registrar_manifestacao(text, boolean, text, text, text) from public;
grant execute on function public.registrar_manifestacao(text, boolean, text, text, text) to anon, authenticated;

-- ============================================================
-- Arquivos (PDFs e imagens): leitura pública, envio só admin
-- ============================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('transparencia', 'transparencia', true, 20971520,
        array['application/pdf', 'image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "transparencia: admin lista" on storage.objects;
create policy "transparencia: admin lista" on storage.objects
  for select to authenticated using (bucket_id = 'transparencia' and public.is_admin());

drop policy if exists "transparencia: admin envia" on storage.objects;
create policy "transparencia: admin envia" on storage.objects
  for insert to authenticated with check (bucket_id = 'transparencia' and public.is_admin());

drop policy if exists "transparencia: admin altera" on storage.objects;
create policy "transparencia: admin altera" on storage.objects
  for update to authenticated using (bucket_id = 'transparencia' and public.is_admin());

drop policy if exists "transparencia: admin apaga" on storage.objects;
create policy "transparencia: admin apaga" on storage.objects
  for delete to authenticated using (bucket_id = 'transparencia' and public.is_admin());
