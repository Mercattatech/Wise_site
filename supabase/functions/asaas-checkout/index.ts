// Wise Madness · cria o link de pagamento de uma doação no Asaas.
//
// Por que existe: a chave da API do Asaas é secreta e NUNCA pode ficar no navegador.
// O site chama esta função; ela fala com o Asaas usando a chave guardada nos secrets
// do Supabase e devolve só a URL da página de pagamento (PIX, cartão ou boleto).
//
// Secrets necessários (supabase secrets set ...):
//   ASAAS_API_KEY   chave de API do Asaas (começa com $aact_...)
//   ASAAS_ENV       "production" (padrão) ou "sandbox" para testes
//   ALLOWED_ORIGIN  endereço do site (ex.: https://wisemadness.org.br). Opcional; "*" se vazio.

const BASE = Deno.env.get('ASAAS_ENV') === 'sandbox'
  ? 'https://api-sandbox.asaas.com/v3'
  : 'https://api.asaas.com/v3';

const ORIGIN = Deno.env.get('ALLOWED_ORIGIN') || '*';
const cors = {
  'Access-Control-Allow-Origin': ORIGIN,
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Vary': 'Origin',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

const MIN = 5;
const MAX = 50000;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return json({ error: 'Método não permitido.' }, 405);

  const key = Deno.env.get('ASAAS_API_KEY');
  if (!key) return json({ error: 'Pagamento ainda não configurado.' }, 503);

  let payload: { valor?: unknown; frequencia?: unknown };
  try {
    payload = await req.json();
  } catch {
    return json({ error: 'Requisição inválida.' }, 400);
  }

  const valor = Math.round(Number(payload.valor) * 100) / 100;
  if (!Number.isFinite(valor) || valor < MIN || valor > MAX) {
    return json({ error: `Informe um valor entre R$ ${MIN} e R$ ${MAX.toLocaleString('pt-BR')}.` }, 400);
  }
  const mensal = payload.frequencia === 'mensal';

  const body: Record<string, unknown> = {
    name: mensal ? 'Doação mensal · Associação Wise Madness' : 'Doação · Associação Wise Madness',
    description: 'Sua doação mantém as oficinas, a alimentação e o acolhimento de crianças e adolescentes em Bauru.',
    value: valor,
    billingType: 'UNDEFINED', // quem doa escolhe PIX, cartão ou boleto
    chargeType: mensal ? 'RECURRENT' : 'DETACHED',
    dueDateLimitDays: 3,
    notificationEnabled: true,
  };
  if (mensal) body.subscriptionCycle = 'MONTHLY';

  try {
    const r = await fetch(`${BASE}/paymentLinks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': key,
        'User-Agent': 'wisemadness-site',
      },
      body: JSON.stringify(body),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok || !data.url) {
      console.error('Asaas respondeu', r.status, JSON.stringify(data));
      return json({ error: 'Não foi possível iniciar o pagamento agora. Tente novamente em instantes.' }, 502);
    }
    return json({ url: data.url });
  } catch (e) {
    console.error('Falha ao falar com o Asaas', e);
    return json({ error: 'Não foi possível iniciar o pagamento agora. Tente novamente em instantes.' }, 502);
  }
});

