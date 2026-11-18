// Conexão com o Supabase (Project Settings → API).
// A chave "anon" é pública por natureza: a segurança está nas regras do banco (supabase/schema.sql).
// NUNCA coloque aqui a chave "service_role" nem a chave de API do Asaas.
window.WISE_CONFIG = {
  SUPABASE_URL: '',      // ex.: 'https://abcdefghijkl.supabase.co'
  SUPABASE_ANON_KEY: '', // ex.: 'eyJhbGciOi...'

  // Doações (Asaas). Veja "Receber doações com o Asaas" no README.
  // Opção A (recomendada): deixe vazio e publique a função supabase/functions/asaas-checkout;
  //   o site gera o link de pagamento com o valor escolhido.
  // Opção B (sem Supabase): cole abaixo links de pagamento criados no painel do Asaas
  //   (Cobranças → Links de pagamento, forma de pagamento "Pix, boleto ou cartão",
  //   valor em branco para quem doa digitar). Nesse caso o valor escolhido no site não é repassado.
  ASAAS_LINKS: {
    unica: '',  // ex.: 'https://www.asaas.com/c/xxxxxxxxxxxx'
    mensal: '', // ex.: 'https://www.asaas.com/c/yyyyyyyyyyyy' (link de assinatura mensal)
  },
};
