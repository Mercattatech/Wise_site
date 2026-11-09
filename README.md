# Wise Madness · redesign do site

Novo site da Associação Wise Madness (wisemadness.org.br), com área administrativa da Transparência protegida por login.

## Rodar localmente

Não há build. Sirva a pasta com qualquer servidor estático:

```bash
npx serve . -l 8080
```

Abra `http://localhost:8080`. As rotas usam hash (`#transparencia`, `#adm` etc.).
Sem o `config.js` preenchido, o site público funciona com os dados de `data.js` e o `#adm` mostra "Área administrativa indisponível".

## Estrutura

| Arquivo | O que é |
| --- | --- |
| `index.html` | Layout, estilos e todas as páginas públicas (roteador por hash) |
| `config.js` | URL e chave pública (anon) do Supabase |
| `data.js` | Conteúdo do site copiado do site atual em 08/11/2026: projetos, serviços, eventos, parceiros e os dados de reserva da Transparência |
| `store.js` | Camada de dados: lê a Transparência do Supabase (com `data.js` como reserva), login, gravações, envio de arquivos e ouvidoria |
| `admin.js` | Área administrativa (`#adm`): login, painel de pendências, formulários de parcerias, documentos, contas, diretoria, unidades, textos, ouvidoria e arquivos |
| `supabase/schema.sql` | Tabelas, regras de acesso (RLS), função da ouvidoria e bucket de arquivos |
| `supabase/seed.sql` | Os 59 registros da Transparência para o banco (gerado de `seed/transparencia.json`) |
| `img/` | Fotos, logo e logos dos parceiros (capturados do site atual) |

## Configurar o Supabase (uma vez)

1. Crie um projeto em [supabase.com](https://supabase.com) (região São Paulo).
2. **SQL Editor**: rode `supabase/schema.sql` inteiro e depois `supabase/seed.sql`.
3. **Authentication → Sign In / Providers**: desligue **Allow new users to sign up**. O banco já bloqueia quem não é admin, mas assim ninguém cria conta sozinho.
4. **Authentication → URL Configuration**: em **Site URL** coloque o endereço do site (ex.: `https://wisemadness.org.br`). Em **Redirect URLs** adicione o mesmo endereço e `http://localhost:8080`, para o link de "Esqueci minha senha" funcionar.
5. **Atalho:** `supabase/criar-admin.sql` cria um admin com e-mail e senha de uma vez (troque e-mail e senha antes de rodar; aí o passo 6 não é necessário). A pessoa troca a senha no botão **Alterar senha** do `#adm`.
   **Ou pelo painel:** **Authentication → Users → Add user**: crie cada administrador com e-mail e senha (marque *Auto Confirm User*).
6. **SQL Editor**: dê permissão de admin a cada pessoa:

   ```sql
   insert into public.admins (user_id, email)
   select id, email from auth.users where email = 'pessoa@wisemadness.com.br';
   ```

   Para tirar o acesso: `delete from public.admins where email = 'pessoa@wisemadness.com.br';`

7. **Project Settings → API**: copie a *Project URL* e a chave *anon public* para `config.js`. Nunca use a chave `service_role` no site.

## Segurança

Quem decide o que cada pessoa pode fazer é o banco (Row Level Security em `schema.sql`), não o JavaScript. Mesmo que alguém altere o código no navegador:

| Quem | Pode |
| --- | --- |
| Visitante | Ler a Transparência e os arquivos públicos; enviar manifestação na ouvidoria (só pela função `registrar_manifestacao`, que gera o protocolo) |
| Usuário logado que não está em `admins` | O mesmo que o visitante |
| Admin | Gravar e apagar itens da Transparência, enviar e apagar arquivos, ler e responder a ouvidoria |
| Ninguém pelo site | Cadastrar admins ou apagar manifestações (só pelo painel do Supabase) |

Cada gravação registra `updated_by` (quem alterou) e `updated_at`.

## Modelo de dados

Tabela `transparencia (colecao, id, data jsonb)`, com `colecao` igual a:

**parcerias**: `nome, num, tipo, esfera, orgao, area, objeto, assinatura, ini, fim, valor, contaBanco, contaAgencia, conta, alerta, pcStatus, pcPrevista, pcApresentada, pcResultado, ordem, docs[{nome,url}], repasses[{data,valor,extrato,relatorio}], pc[{ano,desc,url}]`

**documentos**: `cat, ano, nome, url, validade, obs`

**contas**: `grupo, uso, banco, agencia, conta, ordem`

**dirigentes**: `nome, cargo, mandatoIni, mandatoFim, ordem`

**unidades**: `codigo, nome, tipo, end, protegido, tel, email, hor, ordem`

**transp / config**: `intro, financasNota, nota, atualizadoEm`

Tabela `ouvidoria`: `protocolo, tipo, anonimo, nome, contato, msg, status, resposta, criado_em, atualizado_em`

Arquivos ficam no bucket público `transparencia` (PDF, PNG, JPG, WEBP, até 20 MB).

Datas em ISO (`AAAA-MM-DD`), valores em reais como número.

## Pendências de conteúdo

- Valores em revisão nos termos 3.316, 3.380, 3.317 e 3.379/2024 (marcados com `alerta`)
- Chave PIX, cargos da diretoria, data de assinatura e objeto das 18 parcerias
- Balanço de 2024 e validade das certidões
