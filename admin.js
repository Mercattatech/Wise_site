// Área administrativa da Transparência (#adm)
(() => {
const css = `
body.is-adm footer.site,body.is-adm .proto{display:none}
.adm-top{background:var(--ink);color:#fff;padding:28px 0}
.adm-top .wrap{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}
.adm-top h1{font-size:1.8rem}
.adm-top p{margin:4px 0 0;color:#C9CED4;font-size:.92rem}
.adm{display:grid;grid-template-columns:230px 1fr;gap:40px;padding:36px 24px 120px}
.adm-nav a{display:flex;justify-content:space-between;align-items:center;text-decoration:none;padding:10px 14px;border-radius:10px;font-weight:600;color:var(--ink-2)}
.adm-nav a:hover{background:var(--soft)}
.adm-nav a[aria-current="page"]{background:var(--ink);color:#fff}
.adm-nav .n{font-size:.8rem;background:var(--red-soft);color:var(--red-d);border-radius:99px;padding:1px 8px}
.adm-nav hr{border:0;border-top:1px solid var(--line);margin:12px 0}
@media (max-width:900px){.adm{grid-template-columns:1fr;gap:20px}.adm-nav{display:flex;overflow-x:auto;gap:6px;margin:0 -24px;padding:0 24px 6px}.adm-nav a{white-space:nowrap;border:1.5px solid var(--line);border-radius:999px}.adm-nav hr{display:none}}
.adm h2{font-size:1.7rem;margin:0 0 6px}
.adm .sub{color:var(--muted);margin:0 0 24px}
.adm-bar{display:flex;gap:10px;flex-wrap:wrap;align-items:center;justify-content:space-between;margin-bottom:18px}
.adm-bar input,.adm-bar select{font:inherit;font-size:.95rem;padding:10px 14px;border:1.5px solid var(--line);border-radius:10px;min-width:220px}
table.at{width:100%;border-collapse:collapse;font-size:.95rem}
table.at th{text-align:left;font-size:.82rem;color:var(--muted);font-weight:600;padding:8px 10px;border-bottom:2px solid var(--ink)}
table.at td{padding:12px 10px;border-bottom:1px solid var(--line);vertical-align:middle}
table.at tr:hover td{background:#FAFAFB}
table.at .r{text-align:right;white-space:nowrap}
table.at small{color:var(--muted);display:block}
.ab{font:600 .9rem var(--body);border:1.5px solid var(--ink);background:#fff;color:var(--ink);border-radius:999px;padding:7px 14px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.ab:hover{background:var(--ink);color:#fff}
.ab.red{border-color:var(--red-d);color:var(--red-d)}
.ab.red:hover{background:var(--red-d);color:#fff}
.ab.solid{background:var(--ink);color:#fff}
.ab[disabled]{opacity:.5;cursor:wait}
.af{display:grid;gap:28px;max-width:920px}
.af fieldset{border:1px solid var(--line);border-radius:14px;padding:22px 22px 24px;margin:0}
.af legend{font-family:var(--display);font-size:1.25rem;padding:0 8px}
.af .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.af .wide{grid-column:1/-1}
@media (max-width:700px){.af .grid{grid-template-columns:1fr}}
.af label.l{display:block;font-weight:600;font-size:.93rem;margin-bottom:5px}
.af .req{color:var(--red-d)}
.af input[type=text],.af input[type=date],.af input[type=number],.af select,.af textarea{width:100%;font:inherit;font-size:.97rem;padding:11px 12px;border:1.5px solid #C9CED4;border-radius:10px;background:#fff}
.af textarea{min-height:90px;resize:vertical}
.af .hint{font-size:.84rem;color:var(--muted);margin-top:4px}
.af .bad{border-color:var(--red-d)!important;background:#FFF7F7}
.af .file{display:flex;gap:8px;align-items:center}
.af .file input[type=text]{flex:1}
.af .file .st{font-size:.84rem;color:var(--muted)}
.rep{display:grid;gap:12px}
.rep .row{display:grid;gap:12px;align-items:end;border:1px dashed #C9CED4;border-radius:12px;padding:14px;background:#FAFAFB}
.rep .row .x{justify-self:end}
.savebar{position:sticky;bottom:0;background:rgba(255,255,255,.97);border-top:1px solid var(--line);padding:14px 0;display:flex;gap:10px;align-items:center;z-index:5}
.savebar .msg{color:var(--muted);font-size:.9rem;margin-left:auto}
.pend{list-style:none;margin:0;padding:0}
.pend>li{border:1px solid var(--line);border-radius:12px;margin-bottom:10px}
.pend details summary{cursor:pointer;padding:14px 18px;display:flex;gap:12px;align-items:center;font-weight:600;list-style:none}
.pend details summary b{font-family:var(--display);font-weight:400;font-size:1.4rem;min-width:36px;color:var(--red-d)}
.pend details ul{margin:0;padding:0 18px 14px 66px}
.pend details li{margin:6px 0;font-size:.95rem}
.ak{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:32px}
.ak div{border:1px solid var(--line);border-radius:12px;padding:16px}
.ak b{font-family:var(--display);font-weight:400;font-size:2rem;display:block;line-height:1.1}
.ak span{font-size:.9rem;color:var(--ink-2)}
@media (max-width:700px){.ak{grid-template-columns:1fr 1fr}}
.toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:var(--ink);color:#fff;padding:12px 20px;border-radius:12px;z-index:90;font-weight:600;box-shadow:0 10px 30px -10px rgba(0,0,0,.5)}
.toast.err{background:var(--red-d)}
.gate{max-width:560px;border:1px solid var(--line);border-radius:16px;padding:32px}
.adm-solo{padding:48px 24px 120px;display:flex;justify-content:center}
.gate form{display:grid;gap:14px;margin-top:20px}
.gate label{font-weight:600;font-size:.92rem;display:block;margin-bottom:4px}
.gate input[type=email],.gate input[type=password]{width:100%;font:inherit;font-size:.97rem;padding:11px 12px;border:1.5px solid #C9CED4;border-radius:10px;background:#fff}
.gate .err{color:var(--red-d);font-size:.92rem;margin:0;min-height:1.2em}
.gate .lnk{background:none;border:0;padding:0;font:inherit;font-size:.92rem;color:var(--ink-2);text-decoration:underline;cursor:pointer;justify-self:start}
.adm-who{display:flex;gap:10px;align-items:center;flex-wrap:wrap;font-size:.88rem;color:#C9CED4}
.cfm{position:fixed;inset:0;background:rgba(31,35,40,.6);display:flex;align-items:center;justify-content:center;z-index:95;padding:20px}
.cfm .box{background:#fff;border-radius:16px;padding:28px;max-width:460px;width:100%}
.cfm .box div{display:flex;gap:10px;justify-content:flex-end;margin-top:20px}
.msgcard{border:1px solid var(--line);border-radius:14px;padding:18px 20px;margin-bottom:12px}
.msgcard header{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:8px}
.msgcard p{white-space:pre-wrap}
`;
const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

const NAV = [['adm', 'Painel'], ['adm-parcerias', 'Parcerias'], ['adm-documentos', 'Documentos'], ['adm-contas', 'Contas bancárias'], ['adm-diretoria', 'Diretoria'], ['adm-unidades', 'Unidades'], ['adm-textos', 'Textos da página'], ['-'], ['adm-ouvidoria', 'Ouvidoria'], ['adm-arquivos', 'Arquivos enviados']];
const COLLECTION_BY = { parceria: 'parcerias', documento: 'documentos', conta: 'contas', dirigente: 'dirigentes', unidade: 'unidades' };
const LIST_ROUTE = { parcerias: 'adm-parcerias', documentos: 'adm-documentos', contas: 'adm-contas', dirigentes: 'adm-diretoria', unidades: 'adm-unidades' };

const money = v => brl(Number(v) || 0);
const parseMoney = s => { s = String(s ?? '').trim(); if (!s) return 0; if (/,\d{1,2}$/.test(s) || s.includes(',')) s = s.replace(/\./g, '').replace(',', '.'); return Number(s.replace(/[^\d.-]/g, '')) || 0; };
const fmtMoneyInput = v => (Number(v) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ---------- esquemas de formulário ----------
const F = (k, label, type = 'text', o = {}) => Object.assign({ k, label, type }, o);
const SCHEMAS = {
  parceria: [
    ['Identificação', [
      F('nome', 'Nome curto', 'text', { req: 1, wide: 1, hint: 'Aparece na lista pública. Ex.: Acolhimento · Rede Especial · recurso municipal' }),
      F('num', 'Identificação completa', 'textarea', { req: 1, wide: 1, hint: 'Número do termo, processo, edital, chamamento ou emenda, separados por " · "' }),
      F('tipo', 'Tipo de instrumento', 'select', { opts: TIPOS }), F('esfera', 'Origem do recurso', 'select', { opts: ESFERAS }),
      F('orgao', 'Órgão responsável', 'text', { req: 1 }), F('area', 'Área', 'text', { list: 'areas', hint: 'Ex.: SCFV, Acolhimento, Esporte' }),
      F('objeto', 'Descrição do objeto', 'textarea', { wide: 1, hint: 'Exigida pelo art. 11 da Lei 13.019/2014' }),
    ]],
    ['Datas e valores', [
      F('assinatura', 'Data de assinatura', 'date', { hint: 'Exigida pelo art. 11 da Lei 13.019/2014' }), F('valor', 'Valor total (R$)', 'money', { req: 1 }),
      F('ini', 'Início da vigência', 'date', { req: 1 }), F('fim', 'Fim da vigência', 'date', { req: 1 }),
    ]],
    ['Conta bancária vinculada', [F('contaBanco', 'Banco'), F('contaAgencia', 'Agência'), F('conta', 'Conta corrente')]],
    ['Documentos da parceria', [F('docs', '', 'rep', { add: 'Adicionar documento', fields: [F('nome', 'Nome do documento', 'text', { req: 1, hint: 'Ex.: Termo de colaboração, Edital, Plano de trabalho, Termo aditivo' }), F('url', 'Arquivo', 'file', { req: 1 })] })]],
    ['Repasses recebidos', [F('repasses', '', 'rep', { add: 'Adicionar repasse', fields: [F('data', 'Data do crédito', 'date', { req: 1 }), F('valor', 'Valor (R$)', 'money', { req: 1 }), F('extrato', 'Extrato bancário', 'file'), F('relatorio', 'Relatório ou demonstrativo', 'file')] })]],
    ['Prestação de contas', [
      F('pcStatus', 'Situação', 'select', { opts: PC_STATUS }), F('pcResultado', 'Resultado da análise', 'text', { hint: 'Ex.: aprovada pelo gestor em 10/03/2026' }),
      F('pcPrevista', 'Data prevista de apresentação', 'date'), F('pcApresentada', 'Data em que foi apresentada', 'date'),
      F('pc', '', 'rep', { wide: 1, add: 'Adicionar documento de prestação de contas', fields: [F('ano', 'Ano', 'text', { req: 1 }), F('desc', 'Descrição', 'text', { req: 1 }), F('url', 'Arquivo', 'file', { req: 1 })] }),
    ]],
    ['Aviso público', [F('alerta', 'Aviso de dado em revisão', 'textarea', { wide: 1, hint: 'Aparece em destaque na página da parceria e marca o item como "Em revisão". Deixe vazio quando o dado estiver confirmado.' })]],
  ],
  documento: [['Documento', [
    F('nome', 'Nome do documento', 'text', { req: 1, wide: 1 }), F('cat', 'Categoria', 'select', { opts: DOC_CATS }), F('ano', 'Ano', 'number', { req: 1 }),
    F('validade', 'Válido até', 'date', { hint: 'Para certidões. O site avisa quando vencer.' }), F('obs', 'Observação interna', 'text'),
    F('url', 'Arquivo', 'file', { req: 1, wide: 1 }),
  ]]],
  conta: [['Conta bancária', [
    F('grupo', 'Grupo', 'text', { req: 1, list: 'grupos', hint: 'Ex.: Doações e recursos próprios' }), F('uso', 'Uso da conta', 'text', { req: 1 }),
    F('banco', 'Banco'), F('agencia', 'Agência'), F('conta', 'Conta', 'text', { req: 1 }), F('ordem', 'Ordem de exibição', 'number'),
  ]]],
  dirigente: [['Dirigente', [F('nome', 'Nome', 'text', { req: 1 }), F('cargo', 'Cargo', 'text', { hint: 'Ex.: Presidente, Tesoureiro(a)' }), F('mandatoIni', 'Início do mandato', 'date'), F('mandatoFim', 'Fim do mandato', 'date'), F('ordem', 'Ordem de exibição', 'number')]]],
  unidade: [['Unidade', [
    F('codigo', 'Código', 'text', { req: 1, hint: 'Ex.: I, II, Adm' }), F('nome', 'Nome', 'text', { req: 1 }), F('tipo', 'Atividade', 'text', { wide: 1 }),
    F('end', 'Endereço', 'text', { wide: 1 }), F('protegido', 'Ocultar o endereço no site (casas de acolhimento)', 'check', { wide: 1 }),
    F('tel', 'Telefone'), F('email', 'E-mail'), F('hor', 'Horário'), F('ordem', 'Ordem de exibição', 'number'),
  ]]],
  config: [['Textos da Transparência', [
    F('intro', 'Texto de abertura', 'textarea', { wide: 1 }),
    F('financasNota', 'Nota em "Balanços e auditoria"', 'textarea', { wide: 1, hint: 'Deixe vazio para esconder o bloco "Receitas e despesas".' }),
    F('nota', 'Nota legal no rodapé da visão geral', 'textarea', { wide: 1 }),
  ]]],
};
const BLANK = {
  parceria: () => ({ nome: '', num: '', tipo: 'Fomento', esfera: 'Municipal', orgao: 'Prefeitura Municipal de Bauru', area: '', objeto: '', assinatura: '', ini: '', fim: '', valor: 0, contaBanco: 'Banco do Brasil', contaAgencia: '3015-5', conta: '', docs: [], repasses: [], pc: [], pcStatus: 'A apresentar', pcPrevista: '', pcApresentada: '', pcResultado: '', alerta: '' }),
  documento: () => ({ nome: '', cat: 'Certidões', ano: Number(TODAY.slice(0, 4)), validade: '', obs: '', url: '' }),
  conta: () => ({ grupo: 'Doações e recursos próprios', uso: '', banco: 'Banco do Brasil', agencia: '', conta: '', ordem: 50 }),
  dirigente: () => ({ nome: '', cargo: '', mandatoIni: '', mandatoFim: '', ordem: 10 }),
  unidade: () => ({ codigo: '', nome: '', tipo: '', end: '', protegido: false, tel: '', email: '', hor: '', ordem: 10 }),
};

// ---------- estado ----------
const S_ = { editing: false, dirty: false, form: null, kind: null, id: null, isNew: false, cur: null, skipHash: false };
const toast = (t, err) => { document.querySelectorAll('.toast').forEach(x => x.remove()); const d = document.createElement('div'); d.className = 'toast' + (err ? ' err' : ''); d.setAttribute('role', 'status'); d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 4200); };
const confirmBox = (title, text, ok = 'Confirmar', danger) => new Promise(res => {
  const d = document.createElement('div'); d.className = 'cfm'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true');
  d.innerHTML = `<div class="box"><h3 style="margin-bottom:8px">${title}</h3><p>${text}</p><div><button class="ab" type="button" data-r="0">Cancelar</button><button class="ab ${danger ? 'red' : 'solid'}" type="button" data-r="1">${ok}</button></div></div>`;
  document.body.appendChild(d); d.querySelector('[data-r="1"]').focus();
  d.onclick = e => { const r = e.target.dataset && e.target.dataset.r; if (r !== undefined || e.target === d) { d.remove(); res(r === '1'); } };
});

// ---------- pendências ----------
function pendencias() {
  const P2 = [];
  const add = (key, title, items) => items.length && P2.push({ key, title, items });
  const pr = L.parcerias;
  add('alerta', 'parcerias com dado em revisão', pr.filter(p => p.alerta).map(p => [p.nome, 'adm-parceria-' + p.id]));
  add('pc', 'parcerias encerradas sem prestação de contas publicada', pr.filter(p => p.fim < TODAY && !pcOk(p.pcStatus) && p.pcStatus !== 'Rejeitada').map(p => [p.nome, 'adm-parceria-' + p.id]));
  add('objeto', 'parcerias sem descrição do objeto (MROSC)', pr.filter(p => !p.objeto).map(p => [p.nome, 'adm-parceria-' + p.id]));
  add('assin', 'parcerias sem data de assinatura (MROSC)', pr.filter(p => !p.assinatura).map(p => [p.nome, 'adm-parceria-' + p.id]));
  add('rel', 'repasses sem relatório', pr.flatMap(p => p.repasses.filter(r => !r.relatorio).map(r => [`${p.nome} · ${dt(r.data)}`, 'adm-parceria-' + p.id])));
  add('semdoc', 'parcerias sem nenhum documento', pr.filter(p => !p.docs.length).map(p => [p.nome, 'adm-parceria-' + p.id]));
  const cert = L.documentos.filter(d => d.cat === 'Certidões');
  add('venc', 'certidões vencidas', cert.filter(d => d.validade && d.validade < TODAY).map(d => [`${d.nome} (venceu em ${dt(d.validade)})`, 'adm-documento-' + d.id]));
  add('val', 'certidões sem data de validade', cert.filter(d => !d.validade).map(d => [d.nome, 'adm-documento-' + d.id]));
  const anos = new Set(L.documentos.filter(d => d.cat === 'Balanços e auditoria').map(d => d.ano)); const falt = [];
  for (let y = 2016; y < Number(TODAY.slice(0, 4)); y++) if (!anos.has(y)) falt.push([`Balanço de ${y}`, 'adm-documento-novo']);
  add('bal', 'anos sem demonstrações financeiras', falt);
  add('ouv', 'manifestações novas na ouvidoria', L.ouvidoria.filter(m => m.status === 'Nova').map(m => [`${m.protocolo} · ${m.tipo}`, 'adm-ouvidoria']));
  add('cargo', 'dirigentes sem cargo informado', L.dirigentes.filter(d => !d.cargo).map(d => [d.nome, 'adm-dirigente-' + d.id]));
  return P2;
}

// ---------- telas ----------
const whoBar = () => CAP.session ? `<span class="adm-who">${esc(CAP.email)}${CAP.recovery ? '' : `<button class="ab" type="button" data-chpw style="background:transparent;color:#fff;border-color:#fff">Alterar senha</button>`}<button class="ab" type="button" data-signout style="background:transparent;color:#fff;border-color:#fff">Sair</button></span>` : '';
const topBar = (detail) => `<div class="adm-top"><div class="wrap"><div><h1>Área administrativa</h1>${detail ? `<p>${detail}</p>` : ''}</div><span style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">${whoBar()}<a class="ab" style="background:transparent;color:#fff;border-color:#fff" href="#transparencia">Ver a Transparência pública</a></span></div></div>`;
const gateShell = body => `${topBar('')}<div class="adm-solo">${body}</div>`;
const shell = (h, body) => `${topBar(`Transparência · ${L.source === 'banco' ? 'dados do banco' : 'dados de reserva do site atual'} · última atualização ${fmtDT(L.config.atualizadoEm)}`)}
<div class="wrap adm"><nav class="adm-nav" aria-label="Área administrativa">${NAV.map(([r, t]) => r === '-' ? '<hr>' : `<a href="#${r}" ${navActive(h, r) ? 'aria-current="page"' : ''}>${t}${r === 'adm-ouvidoria' && L.ouvidoria.filter(m => m.status === 'Nova').length ? `<span class="n">${L.ouvidoria.filter(m => m.status === 'Nova').length}</span>` : ''}</a>`).join('')}</nav><div id="admBody">${body}</div></div>`;
const navActive = (h, r) => h === r || (r === 'adm-parcerias' && h.startsWith('adm-parceria-')) || (r === 'adm-documentos' && h.startsWith('adm-documento-')) || (r === 'adm-contas' && h.startsWith('adm-conta-')) || (r === 'adm-diretoria' && h.startsWith('adm-dirigente-')) || (r === 'adm-unidades' && h.startsWith('adm-unidade-'));

function gate() {
  if (!CAP.ready) return `<div class="gate"><h2>Verificando seu acesso…</h2><p class="muted">Isso leva poucos segundos.</p></div>`;
  if (!CAP.sb) return `<div class="gate"><h2>Área administrativa indisponível</h2><p>O site ainda não está conectado ao banco de dados. Quem cuida do site precisa preencher o arquivo <code>config.js</code>.</p><a class="ab" href="#transparencia">Voltar para a Transparência</a></div>`;
  if (CAP.recovery) return `<div class="gate"><h2>Crie uma nova senha</h2><p class="muted">Use pelo menos 10 caracteres.</p>
    <form id="gNew" novalidate><div><label for="gPw1">Nova senha</label><input type="password" id="gPw1" autocomplete="new-password" minlength="10" required></div>
    <div><label for="gPw2">Repita a nova senha</label><input type="password" id="gPw2" autocomplete="new-password" required></div>
    <p class="err" id="gErr" role="alert"></p><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="ab solid" type="submit" id="gBtn">Salvar nova senha</button>${CAP.session ? '<button class="ab" type="button" id="gCancel">Cancelar</button>' : ''}</div></form></div>`;
  if (!CAP.session) return `<div class="gate"><h2>Entrar</h2><p class="muted">Acesso restrito à equipe que administra a Transparência.</p>
    <form id="gLogin" novalidate><div><label for="gEmail">E-mail</label><input type="email" id="gEmail" autocomplete="username" required></div>
    <div><label for="gPw">Senha</label><input type="password" id="gPw" autocomplete="current-password" required></div>
    <p class="err" id="gErr" role="alert"></p>
    <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap"><button class="ab solid" type="submit" id="gBtn">Entrar</button><button class="lnk" type="button" id="gForgot">Esqueci minha senha</button></div></form></div>`;
  if (!CAP.canEdit) return `<div class="gate"><h2>Acesso restrito</h2><p>A conta <b>${esc(CAP.email)}</b> não tem permissão para administrar a Transparência. Peça a quem administra o site para cadastrar você.</p><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="ab solid" type="button" data-signout>Sair</button><a class="ab" href="#transparencia">Voltar para a Transparência</a></div></div>`;
  return null;
}

function bindSignout() {
  document.querySelectorAll('[data-chpw]').forEach(b => b.onclick = () => { if (S_.dirty) return toast('Salve ou descarte as alterações antes.', true); S_.editing = false; CAP.recovery = true; emit('auth'); });
  document.querySelectorAll('[data-signout]').forEach(b => b.onclick = async () => { b.disabled = true; try { await signOut(); } catch (e) { b.disabled = false; toast('Não foi possível sair agora.', true); } });
}

function bindGate() {
  bindSignout();
  const err = $('#gErr'), btn = $('#gBtn');
  const login = $('#gLogin');
  if (login) {
    $('#gEmail').focus();
    login.onsubmit = async e => {
      e.preventDefault();
      const email = $('#gEmail').value.trim(), pw = $('#gPw').value;
      if (!email || !pw) { err.textContent = 'Informe e-mail e senha.'; return; }
      btn.disabled = true; btn.textContent = 'Entrando…'; err.textContent = '';
      try { await signIn(email, pw); }
      catch (x) {
        btn.disabled = false; btn.textContent = 'Entrar';
        const m = String(x.message || '');
        err.textContent = /invalid login/i.test(m) ? 'E-mail ou senha incorretos.' : /not confirmed/i.test(m) ? 'Confirme seu e-mail antes de entrar.' : /rate|too many/i.test(m) ? 'Muitas tentativas. Aguarde alguns minutos.' : 'Não foi possível entrar agora. Tente de novo.';
        $('#gPw').value = ''; $('#gPw').focus();
      }
    };
    $('#gForgot').onclick = async () => {
      const email = $('#gEmail').value.trim();
      if (!email) { err.textContent = 'Digite seu e-mail acima e clique de novo em "Esqueci minha senha".'; $('#gEmail').focus(); return; }
      try { await sendPasswordReset(email); } catch (x) { /* não revela se o e-mail existe */ }
      err.textContent = '';
      toast('Se esse e-mail tiver acesso, enviamos um link para criar nova senha.');
    };
  }
  const nw = $('#gNew');
  if (nw) $('#gPw1').focus();
  const cancel = $('#gCancel');
  if (cancel) cancel.onclick = () => { CAP.recovery = false; emit('auth'); };
  if (nw) nw.onsubmit = async e => {
    e.preventDefault();
    const a = $('#gPw1').value, b = $('#gPw2').value;
    if (a.length < 10) { err.textContent = 'A senha precisa ter pelo menos 10 caracteres.'; return; }
    if (a !== b) { err.textContent = 'As senhas não são iguais.'; return; }
    btn.disabled = true; err.textContent = '';
    try { await setNewPassword(a); toast('Senha alterada.'); emit('auth'); }
    catch (x) { btn.disabled = false; err.textContent = /different from the old/i.test(String(x.message)) ? 'A nova senha precisa ser diferente da anterior.' : /weak|short/i.test(String(x.message)) ? 'Senha fraca. Use uma senha mais longa.' : 'Não foi possível salvar. O link pode ter expirado: peça outro.'; }
  };
}

function painel() {
  const pend = pendencias();
  return `<h2>Painel</h2><p class="sub">O que está publicado e o que falta para a Transparência ficar completa.</p>
  <div class="ak"><div><b>${L.parcerias.length}</b><span>parcerias</span></div><div><b>${L.documentos.length}</b><span>documentos</span></div><div><b>${L.contas.length + new Set(L.parcerias.map(p => p.conta).filter(Boolean)).size}</b><span>contas bancárias</span></div><div><b>${L.ouvidoria.filter(m => m.status !== 'Respondida').length}</b><span>manifestações em aberto</span></div></div>
  <div class="adm-bar"><h3 style="font-size:1.3rem">Pendências</h3><span style="display:flex;gap:8px;flex-wrap:wrap"><a class="ab solid" href="#adm-parceria-nova">Nova parceria</a><a class="ab" href="#adm-documento-novo">Novo documento</a></span></div>
  ${pend.length ? `<ul class="pend">${pend.map(p => `<li><details><summary><b>${p.items.length}</b>${p.title}</summary><ul>${p.items.map(([t, r]) => `<li><a href="#${r}">${esc(t)}</a></li>`).join('')}</ul></details></li>`).join('')}</ul>` : '<p>Nenhuma pendência. Tudo publicado.</p>'}`;
}

function listParcerias() {
  return `<div class="adm-bar"><div><h2>Parcerias</h2><p class="sub" style="margin:0">Termos de fomento e colaboração com o poder público.</p></div><a class="ab solid" href="#adm-parceria-nova">Nova parceria</a></div>
  <div class="adm-bar"><input type="search" id="aq" placeholder="Buscar parceria" aria-label="Buscar parceria"></div>
  <div class="tscroll"><table class="at"><thead><tr><th>Parceria</th><th>Vigência</th><th class="r">Valor</th><th>Situação</th><th></th></tr></thead><tbody id="atb">${L.parcerias.map(p => `<tr data-s="${esc((p.nome + ' ' + p.num + ' ' + p.orgao).toLowerCase())}"><td><b>${esc(p.nome)}</b><small>${esc(p.num.split(' · ')[0])}</small></td><td>${dt(p.ini)} a ${dt(p.fim)}</td><td class="r">${money(p.valor)}</td><td>${pStatus(p)}</td><td class="r"><a class="ab" href="#adm-parceria-${p.id}">Editar</a></td></tr>`).join('')}</tbody></table></div>`;
}
function listDocs() {
  return `<div class="adm-bar"><div><h2>Documentos</h2><p class="sub" style="margin:0">Estatuto, atas, certidões, balanços e relatórios.</p></div><a class="ab solid" href="#adm-documento-novo">Novo documento</a></div>
  <div class="adm-bar"><input type="search" id="aq" placeholder="Buscar documento" aria-label="Buscar documento"></div>
  <div class="tscroll"><table class="at"><thead><tr><th>Ano</th><th>Documento</th><th>Categoria</th><th>Validade</th><th></th></tr></thead><tbody id="atb">${L.documentos.map(d => `<tr data-s="${esc((d.nome + ' ' + d.cat + ' ' + d.ano).toLowerCase())}"><td>${d.ano}</td><td><b>${esc(d.nome)}</b>${d.obs ? `<small>${esc(d.obs)}</small>` : ''}</td><td>${esc(d.cat)}</td><td>${d.cat === 'Certidões' ? (d.validade ? (d.validade < TODAY ? `<span class="pill red">Vencida ${dt(d.validade)}</span>` : `<span class="pill ok">Até ${dt(d.validade)}</span>`) : '<span class="pill warn">Informar</span>') : '–'}</td><td class="r"><a class="ab" href="${esc(fileUrl(d.url))}" target="_blank" rel="noopener">Abrir</a> <a class="ab" href="#adm-documento-${d.id}">Editar</a></td></tr>`).join('')}</tbody></table></div>`;
}
const simpleList = (title, sub, kind, rows, cols, row) => `<div class="adm-bar"><div><h2>${title}</h2><p class="sub" style="margin:0">${sub}</p></div><a class="ab solid" href="#adm-${kind}-novo">Adicionar</a></div>
  <div class="tscroll"><table class="at"><thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}<th></th></tr></thead><tbody>${rows.map(r => `<tr>${row(r).map(c => `<td>${c}</td>`).join('')}<td class="r"><a class="ab" href="#adm-${kind}-${r.id}">Editar</a></td></tr>`).join('')}</tbody></table></div>`;

function textos() { return formView('config', 'config', L.config, false); }

function ouvidoria() {
  if (!L.ouvidoria.length) return `<h2>Ouvidoria</h2><p class="sub">Nenhuma manifestação recebida ainda.</p>`;
  return `<h2>Ouvidoria</h2><p class="sub">${L.ouvidoria.length} manifestações. Mude a situação e registre a resposta dada.</p>
  ${L.ouvidoria.map((m, i) => `<article class="msgcard" data-i="${i}"><header><b>${esc(m.protocolo)}</b><span class="pill ${m.tipo === 'Denúncia' || m.tipo === 'Reclamação' ? 'red' : 'off'}">${esc(m.tipo)}</span><span class="muted small">${fmtDT(m.criadoEm)}</span><span class="small">${m.anonimo ? 'Anônima' : esc((m.nome || 'Sem nome') + (m.contato ? ' · ' + m.contato : ''))}</span></header>
  <p>${esc(m.msg)}</p>
  <div class="af" style="gap:12px"><div class="grid"><div><label class="l">Situação</label><select data-f="status">${['Nova', 'Em análise', 'Respondida', 'Encaminhada'].map(o => `<option ${m.status === o ? 'selected' : ''}>${o}</option>`).join('')}</select></div><div class="wide"><label class="l">Resposta ou providência</label><textarea data-f="resposta">${esc(m.resposta || '')}</textarea></div></div><div><button class="ab solid" type="button" data-save="${i}">Salvar</button></div></div></article>`).join('')}`;
}

function arquivos() {
  return `<h2>Arquivos enviados</h2><p class="sub">PDFs e imagens enviados pela área administrativa. Um arquivo só pode ser apagado quando nenhum item usa mais ele.</p>
  <div class="adm-bar"><span id="usage" class="muted">Carregando…</span><label class="ab solid" style="cursor:pointer">Enviar arquivo<input type="file" id="upAny" hidden accept=".pdf,image/*"></label></div>
  <div id="assetList"></div>`;
}

// ---------- motor de formulários ----------
const getPath = (o, p) => p.split('.').reduce((a, k) => a == null ? a : a[k], o);
function fieldHTML(f, val, path) {
  const id = 'f_' + path.replace(/\./g, '_');
  const lab = f.label ? `<label class="l" for="${id}">${f.label}${f.req ? ' <span class="req" aria-hidden="true">*</span>' : ''}</label>` : '';
  const hint = f.hint ? `<p class="hint">${f.hint}</p>` : '';
  const wrap = inner => `<div class="${f.wide ? 'wide' : ''}">${lab}${inner}${hint}</div>`;
  const common = `id="${id}" data-k="${path}" data-t="${f.type}" ${f.req ? 'data-req="1" aria-required="true"' : ''}`;
  switch (f.type) {
    case 'textarea': return wrap(`<textarea ${common}>${esc(val ?? '')}</textarea>`);
    case 'select': return wrap(`<select ${common}>${f.opts.map(o => `<option ${o === val ? 'selected' : ''}>${o}</option>`).join('')}</select>`);
    case 'date': return wrap(`<input type="date" ${common} value="${esc(val || '')}">`);
    case 'number': return wrap(`<input type="number" ${common} value="${esc(val ?? '')}">`);
    case 'money': return wrap(`<input type="text" inputmode="decimal" ${common} value="${esc(fmtMoneyInput(val))}">`);
    case 'check': return `<div class="wide"><label class="check" style="font-weight:600"><input type="checkbox" ${common} ${val ? 'checked' : ''}> ${f.label}</label>${hint}</div>`;
    case 'file': return wrap(`<div class="file"><input type="text" ${common} value="${esc(val || '')}" placeholder="Envie um arquivo ou cole um link"><label class="ab" style="cursor:pointer">Enviar<input type="file" hidden accept=".pdf,image/*" data-up="${path}"></label>${val ? `<a class="ab" href="${esc(fileUrl(val))}" target="_blank" rel="noopener">Abrir</a>` : ''}</div><p class="st" data-st="${path}"></p>`);
    case 'rep': return `<div class="wide"><div class="rep" data-rep="${path}">${(val || []).map((row, i) => `<div class="row" style="grid-template-columns:${f.fields.length > 2 ? '1fr 1fr' : '1fr 1.4fr'}">${f.fields.map(sf => fieldHTML(Object.assign({}, sf, { wide: 0, hint: i ? '' : sf.hint }), row[sf.k], `${path}.${i}.${sf.k}`)).join('')}<button class="ab red x" type="button" data-del="${path}.${i}" style="grid-column:1/-1">Remover</button></div>`).join('') || '<p class="muted small" style="margin:0">Nenhum item.</p>'}</div><p style="margin:12px 0 0"><button class="ab" type="button" data-add="${path}">+ ${f.add}</button></p></div>`;
    default: return wrap(`<input type="text" ${common} value="${esc(val ?? '')}" ${f.list ? `list="${f.list}"` : ''}>`);
  }
}
function collect() {
  const data = JSON.parse(JSON.stringify(S_.cur));
  document.querySelectorAll('#aform [data-k]').forEach(el => {
    const path = el.dataset.k.split('.'); let o = data;
    for (let i = 0; i < path.length - 1; i++) { const k = /^\d+$/.test(path[i]) ? Number(path[i]) : path[i]; o = o[k]; }
    const last = path[path.length - 1];
    o[last] = el.dataset.t === 'check' ? el.checked : el.dataset.t === 'money' ? parseMoney(el.value) : el.dataset.t === 'number' ? (el.value === '' ? '' : Number(el.value)) : el.value.trim();
  });
  return data;
}
function formView(kind, id, item, isNew) {
  const schema = SCHEMAS[kind];
  const title = { parceria: 'parceria', documento: 'documento', conta: 'conta bancária', dirigente: 'dirigente', unidade: 'unidade', config: '' }[kind];
  const back = kind === 'config' ? 'adm' : LIST_ROUTE[COLLECTION_BY[kind]];
  const pub = kind === 'parceria' && !isNew ? `<a class="ab" href="#parceria-${id}" target="_self">Ver no site</a>` : '';
  return `<div class="adm-bar"><div>${kind !== 'config' ? `<p style="margin:0 0 6px"><a class="link" href="#${back}">Voltar</a></p>` : ''}<h2>${kind === 'config' ? 'Textos da página' : (isNew ? 'Nova ' + title : esc(item.nome || item.uso || title))}</h2></div>${pub}</div>
  <form id="aform" class="af" novalidate>
    ${kind === 'parceria' && isNew ? `<fieldset><legend>Código</legend><div class="grid"><div><label class="l" for="f_newid">Código curto <span class="req">*</span></label><input type="text" id="f_newid" placeholder="Ex.: 3316 ou condeca-2026"><p class="hint">Vira o endereço da página: #parceria-código. Não pode ser trocado depois.</p></div></div></fieldset>` : ''}
    ${schema.map(([leg, fields]) => `<fieldset><legend>${leg}</legend><div class="grid">${fields.map(f => fieldHTML(f, item[f.k], f.k)).join('')}</div></fieldset>`).join('')}
    <datalist id="areas">${[...new Set(L.parcerias.map(p => p.area))].map(a => `<option value="${esc(a)}">`).join('')}</datalist>
    <datalist id="grupos">${[...new Set(L.contas.map(c => c.grupo))].map(a => `<option value="${esc(a)}">`).join('')}</datalist>
    <div class="savebar"><button class="btn btn-red btn-sm" type="submit" id="aSave">Salvar e publicar</button><a class="ab" href="#${back}">Cancelar</a>${!isNew && kind !== 'config' ? `<button class="ab red" type="button" id="aDel">Excluir</button>` : ''}<span class="msg" id="aMsg">Alterações aparecem no site assim que você salva.</span></div>
  </form>`;
}
function bindForm(kind, id, isNew) {
  const form = $('#aform');
  S_.editing = true; S_.dirty = false;
  const rerender = () => { S_.cur = collect(); const y = scrollY; $('#admBody').innerHTML = formView(kind, id, S_.cur, isNew); bindForm(kind, id, isNew); S_.dirty = true; scrollTo(0, y); };
  form.addEventListener('input', () => { S_.dirty = true; $('#aMsg').textContent = 'Alterações não salvas.'; });
  form.querySelectorAll('[data-add]').forEach(b => b.onclick = () => {
    const cur = collect(); const path = b.dataset.add; const f = SCHEMAS[kind].flatMap(s => s[1]).find(x => x.k === path);
    cur[path] = (cur[path] || []).concat([Object.fromEntries(f.fields.map(sf => [sf.k, sf.type === 'money' ? 0 : '']))]); S_.cur = cur; rerender();
  });
  form.querySelectorAll('[data-del]').forEach(b => b.onclick = () => { const [k, i] = b.dataset.del.split('.'); const cur = collect(); cur[k].splice(Number(i), 1); S_.cur = cur; rerender(); });
  form.querySelectorAll('[data-up]').forEach(inp => inp.onchange = async () => {
    const file = inp.files[0]; if (!file) return; const path = inp.dataset.up; const stEl = form.querySelector(`[data-st="${path}"]`);
    stEl.textContent = `Enviando ${file.name}…`;
    try { const r = await uploadFile(file); form.querySelector(`[data-k="${path}"]`).value = r.url; stEl.textContent = `Enviado: ${file.name} (${Math.round(r.sizeBytes / 1024)} KB). Salve para publicar.`; S_.dirty = true; }
    catch (e) { stEl.textContent = e.code === 'too_large' ? 'Arquivo maior que 20 MB. Comprima o PDF e tente de novo.' : e.code === 'unsupported_type' ? 'Formato não aceito. Envie PDF ou imagem.' : 'Não foi possível enviar agora. Tente de novo.'; }
  });
  form.onsubmit = async e => {
    e.preventDefault();
    form.querySelectorAll('.bad').forEach(x => x.classList.remove('bad'));
    let newId = id;
    if (isNew && kind === 'parceria') { newId = slugify($('#f_newid').value); if (!newId) { $('#f_newid').classList.add('bad'); $('#f_newid').focus(); $('#aMsg').textContent = 'Informe o código da parceria.'; return; } if (L.parcerias.some(p => p.id === newId)) { $('#f_newid').classList.add('bad'); $('#aMsg').textContent = 'Já existe uma parceria com esse código.'; return; } }
    const missing = [...form.querySelectorAll('[data-req]')].filter(el => el.dataset.t === 'money' ? !parseMoney(el.value) && el.value.trim() === '' : !el.value.trim());
    if (missing.length) { missing.forEach(x => x.classList.add('bad')); missing[0].focus(); $('#aMsg').textContent = `Preencha os ${missing.length} campo(s) obrigatório(s) marcados.`; return; }
    const data = collect();
    if (kind === 'parceria' && data.fim && data.ini && data.fim < data.ini) { $('#f_fim').classList.add('bad'); $('#aMsg').textContent = 'O fim da vigência é anterior ao início.'; return; }
    $('#aSave').disabled = true; $('#aMsg').textContent = 'Salvando…';
    try {
      if (kind === 'config') await saveConfig(data);
      else { if (isNew) { data.ordem = data.ordem ?? 0; } await saveItem(COLLECTION_BY[kind], newId, data); }
      S_.dirty = false; S_.editing = false; toast('Salvo e publicado.');
      location.hash = kind === 'config' ? 'adm' : LIST_ROUTE[COLLECTION_BY[kind]];
    } catch (err) { $('#aSave').disabled = false; $('#aMsg').textContent = err.code === 'invalid_argument' ? 'Sem permissão para salvar. Confira se você é editor do site.' : err.code === 'quota_exceeded' ? 'Limite de armazenamento atingido.' : 'Não foi possível salvar agora. Tente de novo.'; }
  };
  const del = $('#aDel');
  if (del) del.onclick = async () => {
    const ok = await confirmBox('Excluir este item?', 'Ele sai do site público na hora. Os arquivos enviados continuam guardados em "Arquivos enviados".', 'Excluir', true);
    if (!ok) return;
    try { await deleteItem(COLLECTION_BY[kind], id); S_.dirty = false; S_.editing = false; toast('Item excluído.'); location.hash = LIST_ROUTE[COLLECTION_BY[kind]]; }
    catch (e) { toast('Não foi possível excluir agora.', true); }
  };
}

// ---------- roteamento interno ----------
let lastHash = '';
const ADM = window.ADM = {
  isEditing: () => S_.editing,
  guardLeave() {
    if (!S_.dirty) { S_.editing = false; return true; }
    const target = location.hash;
    history.replaceState(null, '', '#' + lastHash);
    confirmBox('Descartar alterações?', 'Você tem alterações que ainda não foram salvas.', 'Descartar', true).then(ok => { if (ok) { S_.dirty = false; S_.editing = false; location.hash = target; } });
    return false;
  },
  render(h) {
    lastHash = h;
    const g = gate(); if (g) { S_.editing = false; return gateShell(g); }
    const m = h.match(/^adm-(parceria|documento|conta|dirigente|unidade)-(.+)$/);
    if (m) {
      const [, kind, id] = m; const isNew = id === 'novo' || id === 'nova';
      const item = isNew ? BLANK[kind]() : (L[COLLECTION_BY[kind]].find(x => x.id === id));
      if (!item) return shell(h, `<h2>Item não encontrado</h2><p><a class="link" href="#${LIST_ROUTE[COLLECTION_BY[kind]]}">Voltar para a lista</a></p>`);
      S_.kind = kind; S_.id = isNew ? (kind === 'parceria' ? null : kind + '-' + Date.now().toString(36)) : id; S_.isNew = isNew;
      S_.cur = JSON.parse(JSON.stringify(item));
      return shell(h, formView(kind, S_.id, S_.cur, isNew));
    }
    S_.editing = false;
    const views = {
      adm: painel, 'adm-parcerias': listParcerias, 'adm-documentos': listDocs, 'adm-textos': () => { S_.kind = 'config'; S_.cur = JSON.parse(JSON.stringify(L.config)); return formView('config', 'config', S_.cur, false); },
      'adm-contas': () => simpleList('Contas bancárias', 'Contas de doações, recursos próprios e projetos incentivados. As contas das parcerias são editadas em cada parceria.', 'conta', L.contas, ['Grupo', 'Uso', 'Banco', 'Agência', 'Conta'], r => [esc(r.grupo), `<b>${esc(r.uso)}</b>`, esc(r.banco), esc(r.agencia), esc(r.conta)]),
      'adm-diretoria': () => simpleList('Diretoria', 'Dirigentes eleitos, com cargo e mandato.', 'dirigente', L.dirigentes, ['Nome', 'Cargo', 'Mandato'], r => [`<b>${esc(r.nome)}</b>`, r.cargo ? esc(r.cargo) : '<span class="pill warn">Informar</span>', r.mandatoIni ? `${dt(r.mandatoIni)}${r.mandatoFim ? ' a ' + dt(r.mandatoFim) : ''}` : '–']),
      'adm-unidades': () => simpleList('Unidades', 'Unidades de atendimento e sede.', 'unidade', L.unidades, ['Código', 'Nome', 'Telefone', 'Endereço'], r => [esc(r.codigo), `<b>${esc(r.nome)}</b><small>${esc(r.tipo)}</small>`, esc(r.tel), r.protegido ? '<span class="pill off">Oculto</span>' : esc(r.end)]),
      'adm-ouvidoria': ouvidoria, 'adm-arquivos': arquivos,
    };
    return shell(h, (views[h] || painel)());
  },
  after(h) {
    if (gate()) return bindGate();
    bindSignout();
    if (/^adm-(parceria|documento|conta|dirigente|unidade)-/.test(h) && S_.cur) return bindForm(S_.kind, S_.id, S_.isNew);
    if (h === 'adm-textos') return bindForm('config', 'config', false);
    const q = $('#aq'); if (q) q.oninput = () => document.querySelectorAll('#atb tr').forEach(tr => tr.hidden = !tr.dataset.s.includes(q.value.toLowerCase()));
    if (h === 'adm-ouvidoria') document.querySelectorAll('[data-save]').forEach(b => b.onclick = async () => {
      const m = L.ouvidoria[Number(b.dataset.save)]; const card = b.closest('.msgcard');
      b.disabled = true;
      try { await updateManifestacao(m.id, card.querySelector('[data-f="status"]').value, card.querySelector('[data-f="resposta"]').value.trim()); toast('Manifestação atualizada.'); }
      catch (e) { toast('Não foi possível salvar.', true); b.disabled = false; }
    });
    if (h === 'adm-arquivos') loadAssets();
  },
};

async function loadAssets() {
  if (!CAP.canEdit) { $('#usage').textContent = 'Envio de arquivos indisponível.'; return; }
  const used = new Map();
  L.parcerias.forEach(p => { p.docs.forEach(d => used.set(d.url, p.nome)); p.repasses.forEach(r => { used.set(r.extrato, p.nome); used.set(r.relatorio, p.nome); }); p.pc.forEach(x => used.set(x.url, p.nome)); });
  L.documentos.forEach(d => used.set(d.url, d.nome));
  try {
    const { assets, usage } = await ASSETS.list();
    $('#usage').textContent = `${usage.files} arquivo(s) · ${(usage.bytes / 1048576).toFixed(1)} MB de ${(usage.maxBytes / 1048576).toFixed(0)} MB`;
    $('#assetList').innerHTML = assets.length ? `<table class="at"><thead><tr><th>Enviado em</th><th>Usado em</th><th class="r">Tamanho</th><th></th></tr></thead><tbody>${assets.slice().reverse().map(a => { const u = used.get(a.url); return `<tr><td>${fmtDT(a.createdAt)}<small>${esc(a.contentType)}</small></td><td>${u ? esc(u) : '<span class="pill warn">Nenhum item</span>'}</td><td class="r">${Math.round(a.sizeBytes / 1024)} KB</td><td class="r"><a class="ab" href="${esc(a.url)}" target="_blank" rel="noopener">Abrir</a> ${u ? '' : `<button class="ab red" type="button" data-rm="${a.id}">Apagar</button>`}</td></tr>`; }).join('')}</tbody></table>` : '<p class="muted">Nenhum arquivo enviado ainda. Os documentos atuais continuam hospedados no site antigo até serem reenviados.</p>';
    document.querySelectorAll('[data-rm]').forEach(b => b.onclick = async () => { if (!(await confirmBox('Apagar arquivo?', 'Ele será removido para sempre. Nenhum item do site usa este arquivo.', 'Apagar', true))) return; try { await ASSETS.delete(b.dataset.rm); toast('Arquivo apagado.'); loadAssets(); } catch (e) { toast('Não foi possível apagar.', true); } });
  } catch (e) { $('#usage').textContent = 'Não foi possível listar os arquivos agora.'; }
  const up = $('#upAny'); if (up) up.onchange = async () => { const f = up.files[0]; if (!f) return; $('#usage').textContent = 'Enviando…'; try { const r = await uploadFile(f); toast('Arquivo enviado. Use-o num documento colando o link ' + r.url); loadAssets(); } catch (e) { toast('Não foi possível enviar.', true); loadAssets(); } };
}
})();
