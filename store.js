// Camada de dados da Transparência: lê do banco do artifact quando disponível,
// com o conteúdo do site atual (data.js) como reserva.
const PC_STATUS = ['Não publicada', 'A apresentar', 'Apresentada', 'Em análise', 'Aprovada', 'Aprovada com ressalvas', 'Rejeitada'];
const DOC_CATS = ['Estatuto e atas', 'Certidões', 'Balanços e auditoria', 'Relatórios de atividades', 'Outros'];
const ESFERAS = ['Municipal', 'Estadual', 'Federal'];
const TIPOS = ['Fomento', 'Colaboração', 'Acordo de cooperação'];

const fileUrl = f => !f ? '' : /^(https?:)?\//.test(f) ? f : S + f;

function normParceria(p, i) {
  return {
    id: p.id, ordem: i, nome: p.nome, num: p.num, tipo: p.tipo, esfera: p.esfera, orgao: p.orgao, area: p.area,
    ini: p.ini, fim: p.fim, assinatura: '', objeto: '', valor: p.valor,
    contaBanco: p.conta ? 'Banco do Brasil' : '', contaAgencia: p.conta ? '3015-5' : '', conta: p.conta || '',
    alerta: p.alerta || '',
    pcStatus: p.pc.length ? 'Apresentada' : 'Não publicada', pcPrevista: '', pcApresentada: '', pcResultado: '',
    docs: p.docs.map(([nome, f]) => ({ nome, url: fileUrl(f) })),
    repasses: p.repasses.map(([data, valor, ex, rel]) => ({ data, valor, extrato: fileUrl(ex), relatorio: fileUrl(rel) })),
    pc: p.pc.map(([ano, desc, f]) => ({ ano, desc, url: fileUrl(f) })),
  };
}
const slugify = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

function seedData() {
  return {
    parcerias: PARCERIAS.map(normParceria),
    documentos: DOCS.map((d, i) => ({ id: 'doc-' + String(i + 1).padStart(2, '0'), cat: d.cat, ano: d.ano, nome: d.nome, url: fileUrl(d.f), validade: '', obs: '' })),
    contas: Object.entries(CONTAS).flatMap(([grupo, rows], gi) => rows.map((r, i) => ({ id: 'conta-' + (gi + 1) + '-' + (i + 1), ordem: gi * 10 + i, grupo, uso: r[0], agencia: r[1].replace('Ag. ', ''), conta: r[2].replace('C/C ', ''), banco: r[3] }))),
    dirigentes: DIRIGENTES.map((nome, i) => ({ id: 'dir-' + (i + 1), ordem: i, nome, cargo: '', mandatoIni: '2026-05-04', mandatoFim: '' })),
    unidades: UNIDADES.map((u, i) => ({ id: 'un-' + slugify(u.id), ordem: i, codigo: u.id, nome: u.nome, tipo: u.tipo, end: u.end || '', protegido: !u.end, tel: u.tel, email: u.email, hor: u.hor })),
    config: {
      intro: 'Tudo o que a Wise recebe do poder público, como presta contas e quem responde pela organização, com os documentos originais.',
      financasNota: 'Os totais de receitas e despesas de 2025 estão na Demonstração do Resultado (DRE) e no balancete. No site atual, essas tabelas aparecem com R$ 0,00 e precisam ser preenchidas.',
      nota: 'Esta seção segue o art. 11 da Lei 13.019/2014 (Marco Regulatório das Organizações da Sociedade Civil).',
      atualizadoEm: '2026-10-20T17:59:00-03:00',
    },
  };
}

// Estado vivo usado pelas páginas
const L = Object.assign(seedData(), { source: 'site atual', ouvidoria: [] });
const COLS = ['parcerias', 'documentos', 'contas', 'dirigentes', 'unidades'];
const SORTS = {
  parcerias: (a, b) => (b.ini || '').localeCompare(a.ini || ''),
  documentos: (a, b) => (b.ano - a.ano) || DOC_CATS.indexOf(a.cat) - DOC_CATS.indexOf(b.cat),
  contas: (a, b) => (a.ordem ?? 99) - (b.ordem ?? 99),
  dirigentes: (a, b) => (a.ordem ?? 99) - (b.ordem ?? 99),
  unidades: (a, b) => (a.ordem ?? 99) - (b.ordem ?? 99),
};
L.parcerias.sort(SORTS.parcerias);

// ---------- Supabase ----------
// Leitura pública da Transparência; login, gravações, arquivos e ouvidoria só para admins.
// Quem é admin é decidido no banco (tabela public.admins + RLS), não aqui.
const CAP = { sb: null, session: null, email: '', canEdit: false, recovery: false, ready: false, listeners: [] };
const onData = fn => CAP.listeners.push(fn);
const emit = what => CAP.listeners.forEach(fn => { try { fn(what); } catch (e) { console.error(e); } });
const BUCKET = 'transparencia';
const MAX_UPLOAD = 20 * 1048576;
const UPLOAD_TYPES = { pdf: 'application/pdf', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp' };

const sbErr = (error, fallback) => { const e = new Error(error && error.message || fallback || 'erro'); e.code = error && (error.code || error.statusCode) || 'erro'; e.raw = error; return e; };

async function loadTransparencia() {
  const { data, error } = await CAP.sb.from('transparencia').select('colecao,id,data');
  if (error) { console.warn('transparencia', error.message); return; }
  if (!data || !data.length) return; // banco vazio: segue com o conteúdo de reserva (data.js)
  COLS.forEach(c => {
    const rows = data.filter(r => r.colecao === c);
    L[c] = rows.map(r => Object.assign({}, r.data, { id: r.id })).sort(SORTS[c]);
  });
  const cfg = data.find(r => r.colecao === 'transp' && r.id === 'config');
  if (cfg) L.config = Object.assign({}, L.config, cfg.data);
  L.source = 'banco';
}

async function loadOuvidoria() {
  if (!CAP.canEdit) { L.ouvidoria = []; return; }
  const { data, error } = await CAP.sb.from('ouvidoria').select('*').order('criado_em', { ascending: false });
  if (error) { console.warn('ouvidoria', error.message); return; }
  L.ouvidoria = data.map(m => ({ id: m.id, protocolo: m.protocolo, tipo: m.tipo, anonimo: m.anonimo, nome: m.nome, contato: m.contato, msg: m.msg, criadoEm: m.criado_em, status: m.status, resposta: m.resposta }));
}

async function refreshAuth(session) {
  CAP.session = session || null;
  CAP.email = session && session.user ? session.user.email : '';
  CAP.canEdit = false;
  if (session) {
    const { data, error } = await CAP.sb.rpc('is_admin');
    CAP.canEdit = !error && data === true;
  }
  await loadOuvidoria();
}

(async () => {
  const cfg = window.WISE_CONFIG || {};
  try {
    if (cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase) {
      CAP.sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
      const { data: { session } } = await CAP.sb.auth.getSession();
      await Promise.all([loadTransparencia(), refreshAuth(session)]);
      CAP.sb.auth.onAuthStateChange((event, s) => {
        if (event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED') return;
        if (event === 'PASSWORD_RECOVERY') { CAP.recovery = true; if (!/^#adm/.test(location.hash)) location.hash = 'adm'; }
        // fora do callback, para não travar o cliente de auth
        setTimeout(async () => { await refreshAuth(s); emit('auth'); }, 0);
      });
    }
  } catch (e) { console.warn('supabase', e); }
  CAP.ready = true;
  emit('ready');
})();

// ---------- login ----------
async function signIn(email, password) {
  const { error } = await CAP.sb.auth.signInWithPassword({ email, password });
  if (error) throw sbErr(error);
}
async function signOut() { await CAP.sb.auth.signOut(); }
async function sendPasswordReset(email) {
  const { error } = await CAP.sb.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname });
  if (error) throw sbErr(error);
}
async function setNewPassword(password) {
  const { error } = await CAP.sb.auth.updateUser({ password });
  if (error) throw sbErr(error);
  CAP.recovery = false;
}

// ---------- gravações (o banco recusa se não for admin) ----------
async function touchConfig() {
  const next = Object.assign({}, L.config, { atualizadoEm: new Date().toISOString() });
  const { error } = await CAP.sb.from('transparencia').upsert({ colecao: 'transp', id: 'config', data: next });
  if (error) throw sbErr(error);
}
async function afterWrite(col) { await loadTransparencia(); emit(col); }
async function saveItem(col, id, data) {
  const clean = JSON.parse(JSON.stringify(data)); delete clean.id;
  const { error } = await CAP.sb.from('transparencia').upsert({ colecao: col, id, data: clean });
  if (error) throw sbErr(error);
  await touchConfig();
  await afterWrite(col);
}
async function deleteItem(col, id) {
  const { error } = await CAP.sb.from('transparencia').delete().match({ colecao: col, id });
  if (error) throw sbErr(error);
  await touchConfig();
  await afterWrite(col);
}
async function saveConfig(data) {
  const next = Object.assign({}, L.config, data, { atualizadoEm: new Date().toISOString() });
  const { error } = await CAP.sb.from('transparencia').upsert({ colecao: 'transp', id: 'config', data: next });
  if (error) throw sbErr(error);
  await afterWrite('config');
}

// ---------- arquivos ----------
async function uploadFile(file) {
  if (!CAP.canEdit) throw { code: 'not_granted', message: 'Envio de arquivos indisponível' };
  if (file.size > MAX_UPLOAD) throw { code: 'too_large' };
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  if (!UPLOAD_TYPES[ext]) throw { code: 'unsupported_type' };
  const name = new Date().toISOString().slice(0, 10) + '-' + Math.random().toString(36).slice(2, 10) + '-' + (slugify(file.name.replace(/\.[^.]+$/, '')) || 'arquivo') + '.' + ext;
  const { error } = await CAP.sb.storage.from(BUCKET).upload(name, file, { contentType: UPLOAD_TYPES[ext], upsert: false });
  if (error) throw sbErr(error);
  const { data } = CAP.sb.storage.from(BUCKET).getPublicUrl(name);
  return { url: data.publicUrl, assetId: name, sizeBytes: file.size };
}
const ASSETS = {
  async list() {
    const { data, error } = await CAP.sb.storage.from(BUCKET).list('', { limit: 1000, sortBy: { column: 'created_at', order: 'asc' } });
    if (error) throw sbErr(error);
    const assets = data.filter(o => o.id).map(o => ({ id: o.name, url: CAP.sb.storage.from(BUCKET).getPublicUrl(o.name).data.publicUrl, contentType: (o.metadata && o.metadata.mimetype) || '', sizeBytes: (o.metadata && o.metadata.size) || 0, createdAt: o.created_at }));
    return { assets, usage: { files: assets.length, bytes: assets.reduce((s, a) => s + a.sizeBytes, 0), maxBytes: 1024 * 1048576 } };
  },
  async delete(name) {
    const { error } = await CAP.sb.storage.from(BUCKET).remove([name]);
    if (error) throw sbErr(error);
  },
};

// ---------- ouvidoria ----------
async function registrarManifestacao(m) {
  const { data, error } = await CAP.sb.rpc('registrar_manifestacao', { p_tipo: m.tipo, p_anonimo: m.anonimo, p_nome: m.nome, p_contato: m.contato, p_msg: m.msg });
  if (error) throw sbErr(error);
  return data;
}
async function updateManifestacao(id, status, resposta) {
  const { error } = await CAP.sb.from('ouvidoria').update({ status, resposta, atualizado_em: new Date().toISOString() }).eq('id', id);
  if (error) throw sbErr(error);
  await loadOuvidoria(); emit('ouvidoria');
}
