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

## Receber doações com o Asaas

A página `#doe` leva o doador para a página de pagamento do Asaas (PIX, cartão ou boleto). O dinheiro cai direto na conta Asaas da Associação. O site nunca guarda dados de cartão.

**Opção A (recomendada): link gerado com o valor escolhido.** A chave de API do Asaas é secreta, por isso quem fala com o Asaas é uma Edge Function do Supabase (`supabase/functions/asaas-checkout`):

1. No Asaas: **Integrações → Chaves de API → Gerar chave** (conta de produção). Para testar antes, crie uma conta no [sandbox](https://sandbox.asaas.com) e use `ASAAS_ENV=sandbox`.
2. Instale a [Supabase CLI](https://supabase.com/docs/guides/cli), entre no projeto (`supabase link --project-ref SEU_REF`) e rode:

   ```bash
   supabase secrets set ASAAS_API_KEY='$aact_...' ASAAS_ENV=production ALLOWED_ORIGIN=https://wisemadness.org.br
   supabase functions deploy asaas-checkout --no-verify-jwt
   ```

3. Preencha `SUPABASE_URL` e `SUPABASE_ANON_KEY` em `config.js` (o site já chama a função sozinho).

A função aceita valores de R$ 5 a R$ 50.000. "Uma vez" cria cobrança avulsa; "Todo mês" cria assinatura mensal.

**Opção B (sem Supabase): links fixos.** No Asaas, em **Cobranças → Links de pagamento**, crie um link avulso e um de assinatura mensal com o valor em branco e cole os endereços em `ASAAS_LINKS` no `config.js`. Nesse modo o valor escolhido no site não é repassado; quem doa digita o valor na página do Asaas.

Sem nenhuma das duas opções, o botão "Doar" avisa que o pagamento ainda não foi ativado.

## Manter o Supabase ativo (plano gratuito)

O Supabase pausa projetos gratuitos após ~7 dias sem uso. O workflow `.github/workflows/supabase-keepalive.yml` faz uma leitura simples no banco a cada 3 dias pelo GitHub Actions.

1. No GitHub: **Settings → Secrets and variables → Actions → New repository secret**, crie `SUPABASE_URL` e `SUPABASE_ANON_KEY` (a chave *anon public*, nunca a `service_role`).
2. Na aba **Actions**, abra **Supabase keepalive** e clique em **Run workflow** para testar.

Se a rotina falhar, o GitHub envia e-mail para quem tem acesso ao repositório.

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
