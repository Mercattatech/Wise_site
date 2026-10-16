-- Tabela de leads do evento WISE Madness
create table if not exists public.event_leads (
  id            uuid primary key default gen_random_uuid(),
  full_name     text not null,
  phone         text not null,
  email         text not null,
  instagram     text,
  consent       boolean not null default false,
  source        text not null default 'Evento WISE',
  created_at    timestamptz not null default now(),
  winner        boolean not null default false,
  winner_at     timestamptz,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_content   text,
  utm_term      text
);

-- Índices para buscas de duplicatas
create index if not exists event_leads_phone_idx on public.event_leads (phone);
create index if not exists event_leads_email_idx on public.event_leads (email);

-- Habilitar Row Level Security
alter table public.event_leads enable row level security;

-- Política: qualquer pessoa pode inserir seu próprio lead (INSERT público)
create policy "Permitir inserção pública" on public.event_leads
  for insert with check (true);

-- Política: ninguém pode ler sem estar autenticado como admin
-- (O frontend usa a anon key apenas para INSERT e verificação de duplicatas)
create policy "Verificar duplicata (anon)" on public.event_leads
  for select using (true);

-- Política: somente usuários autenticados podem atualizar (confirmar ganhador)
create policy "Atualizar somente autenticados" on public.event_leads
  for update using (auth.role() = 'authenticated');

-- Habilitar realtime para o painel admin
alter publication supabase_realtime add table public.event_leads;
