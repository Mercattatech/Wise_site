-- Cria um usuário administrador com e-mail e senha, já confirmado e com acesso ao #adm.
-- Rode no SQL Editor do Supabase DEPOIS de schema.sql.
-- 1. Troque o e-mail e a senha abaixo (NÃO salve a senha real neste arquivo nem no git).
-- 2. Peça para a pessoa trocar a senha no primeiro acesso (botão "Alterar senha" no #adm).
do $$
declare
  v_email text := 'adm@wisemadness.com.br';
  v_senha text := 'TROQUE-ESTA-SENHA';
  v_id    uuid := gen_random_uuid();
begin
  if v_senha = 'TROQUE-ESTA-SENHA' or length(v_senha) < 10 then
    raise exception 'Defina uma senha de pelo menos 10 caracteres em v_senha';
  end if;
  if exists (select 1 from auth.users where email = v_email) then
    raise exception 'Já existe um usuário com o e-mail %', v_email;
  end if;

  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, recovery_token, email_change, email_change_token_new
  ) values (
    '00000000-0000-0000-0000-000000000000', v_id, 'authenticated', 'authenticated', v_email,
    extensions.crypt(v_senha, extensions.gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}', '{}', now(), now(),
    '', '', '', ''
  );

  insert into auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  values (gen_random_uuid(), v_id, v_id::text,
          jsonb_build_object('sub', v_id::text, 'email', v_email, 'email_verified', true),
          'email', now(), now(), now());

  insert into public.admins (user_id, email) values (v_id, v_email);
  raise notice 'Admin % criado', v_email;
end $$;
