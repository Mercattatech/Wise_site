import { useState, useEffect, useRef, useCallback } from 'react';
import { LogOut, RefreshCw, Download, Users, Calendar, Clock, Trophy, Search, QrCode, Shuffle } from 'lucide-react';
import * as QRCode from 'qrcode';
import { supabase } from '../lib/supabase';
import { CONFIG } from '../lib/config';
import type { Lead } from '../lib/supabase';
import logoImg from '../imports/Logo.png';

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'America/Sao_Paulo' });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' });
}

function maskPartialPhone(phone: string) {
  if (!phone) return '—';
  const d = phone.replace(/\D/g, '');
  return `•••• ${d.slice(-4)}`;
}

function exportCSV(leads: Lead[]) {
  const header = ['Nome', 'WhatsApp', 'E-mail', 'Instagram', 'Data', 'Hora', 'Origem'].join(';');
  const rows = leads.map(l => [
    l.full_name,
    l.phone,
    l.email,
    l.instagram ?? '',
    formatDate(l.created_at),
    formatTime(l.created_at),
    l.source,
  ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(';'));
  const bom = '﻿';
  const blob = new Blob([bom + [header, ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `wise-participantes-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Login ─────────────────────────────────────────────────────────────────────

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) { setError('E-mail ou senha incorretos.'); return; }
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#1B1B1B] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src={logoImg} alt="Wise Madness" className="h-14 w-auto mx-auto mb-4 brightness-0 invert" />
          <p className="text-white/50 text-sm">Área restrita — Administração</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl space-y-4">
          <h1 className="text-xl font-[800] text-[#1B1B1B] mb-6 text-center">Acesso Administrativo</h1>
          <div>
            <label htmlFor="adm-email" className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
            <input id="adm-email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B5191B]/40 bg-gray-50"
              autoComplete="email" />
          </div>
          <div>
            <label htmlFor="adm-pass" className="block text-sm font-semibold text-gray-700 mb-1">Senha</label>
            <input id="adm-pass" type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B5191B]/40 bg-gray-50"
              autoComplete="current-password" />
          </div>
          {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg px-4 py-2">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full bg-[#B5191B] text-white font-[800] py-3 rounded-xl hover:bg-[#8B1010] disabled:opacity-60 transition-colors mt-2">
            {loading ? 'Entrando…' : 'ENTRAR'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Draw Manager ─────────────────────────────────────────────────────────────

type DrawState = 'idle' | 'spinning' | 'result' | 'confirmed';

function DrawManager({ leads }: { leads: Lead[] }) {
  const [drawState, setDrawState] = useState<DrawState>('idle');
  const [displayName, setDisplayName] = useState('');
  const [winner, setWinner] = useState<Lead | null>(null);
  const [winners, setWinners] = useState<Lead[]>([]);
  const [excludePrevious, setExcludePrevious] = useState(true);
  const [presentationMode, setPresentationMode] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const eligibles = leads.filter(l => !(excludePrevious && l.winner));

  const startDraw = () => {
    if (eligibles.length === 0) return;
    setDrawState('spinning');
    setWinner(null);

    let tick = 0;
    intervalRef.current = setInterval(() => {
      const random = eligibles[Math.floor(Math.random() * eligibles.length)];
      setDisplayName(random.full_name);
      tick++;
      if (tick > 30) {
        clearInterval(intervalRef.current!);
        const finalWinner = eligibles[Math.floor(Math.random() * eligibles.length)];
        setWinner(finalWinner);
        setDisplayName(finalWinner.full_name);
        setDrawState('result');
      }
    }, 80);
  };

  const confirmWinner = async () => {
    if (!winner) return;
    await supabase.from('event_leads').update({ winner: true, winner_at: new Date().toISOString() }).eq('id', winner.id);
    setWinners(w => [...w, winner]);
    setDrawState('confirmed');
  };

  const reset = () => {
    setDrawState('idle');
    setWinner(null);
    setDisplayName('');
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#B5191B]/10 flex items-center justify-center">
            <Shuffle size={20} className="text-[#B5191B]" />
          </div>
          <div>
            <h2 className="font-[800] text-[#1B1B1B] text-lg">Sorteio ao Vivo</h2>
            <p className="text-sm text-gray-500">{eligibles.length} elegíveis</p>
          </div>
        </div>
        <button onClick={() => setPresentationMode(true)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
          <Trophy size={16} /> Modo Apresentação
        </button>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-600 mb-6 cursor-pointer select-none">
        <input type="checkbox" checked={excludePrevious} onChange={e => setExcludePrevious(e.target.checked)}
          className="accent-[#B5191B]" />
        Excluir ganhadores anteriores
      </label>

      {/* Name display */}
      <div className="rounded-xl bg-[#1B1B1B] py-10 text-center mb-6 min-h-[120px] flex items-center justify-center">
        {drawState === 'idle' ? (
          <p className="text-white/30 text-lg">Clique em REALIZAR SORTEIO</p>
        ) : (
          <p className={`text-white text-2xl md:text-3xl font-[900] px-4 transition-all ${drawState === 'spinning' ? 'blur-[1px]' : 'blur-0'}`}>
            {displayName}
          </p>
        )}
      </div>

      {drawState === 'idle' && (
        <button onClick={startDraw} disabled={eligibles.length === 0}
          className="w-full bg-[#B5191B] text-white font-[800] text-lg py-4 rounded-xl hover:bg-[#8B1010] disabled:opacity-50 transition-colors">
          REALIZAR SORTEIO
        </button>
      )}

      {drawState === 'spinning' && (
        <button disabled className="w-full bg-[#B5191B]/50 text-white font-[800] text-lg py-4 rounded-xl">
          Sorteando…
        </button>
      )}

      {drawState === 'result' && winner && (
        <div className="space-y-3">
          <p className="text-center text-sm text-gray-500 mb-2">WhatsApp {maskPartialPhone(winner.phone)}</p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={startDraw}
              className="bg-gray-100 text-gray-700 font-[700] py-4 rounded-xl hover:bg-gray-200 transition-colors">
              SORTEAR NOVAMENTE
            </button>
            <button onClick={confirmWinner}
              className="bg-[#B5191B] text-white font-[700] py-4 rounded-xl hover:bg-[#8B1010] transition-colors">
              CONFIRMAR GANHADOR
            </button>
          </div>
        </div>
      )}

      {drawState === 'confirmed' && (
        <div className="text-center space-y-4">
          <p className="text-green-600 font-semibold">✓ Ganhador confirmado e registrado!</p>
          <button onClick={reset}
            className="bg-gray-100 text-gray-700 font-[700] px-8 py-3 rounded-xl hover:bg-gray-200 transition-colors">
            Realizar novo sorteio
          </button>
        </div>
      )}

      {winners.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm font-semibold text-gray-500 mb-3">Ganhadores desta sessão:</p>
          <ul className="space-y-2">
            {winners.map(w => (
              <li key={w.id} className="flex items-center gap-2 text-sm">
                <span className="text-yellow-500">🏆</span>
                <span className="font-semibold">{w.full_name}</span>
                <span className="text-gray-400">{maskPartialPhone(w.phone)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Presentation Mode Overlay */}
      {presentationMode && (
        <div className="fixed inset-0 z-50 bg-[#1B1B1B] flex flex-col items-center justify-center text-white">
          <button onClick={() => setPresentationMode(false)}
            className="absolute top-6 right-6 text-white/40 hover:text-white/70 text-sm border border-white/20 px-4 py-2 rounded-xl">
            Fechar
          </button>
          <img src={logoImg} alt="Wise Madness" className="h-16 w-auto mb-12 brightness-0 invert" />
          <h2 className="text-3xl font-[700] text-white/50 mb-6 tracking-widest uppercase">Sorteio</h2>
          {drawState === 'idle' && (
            <div className="text-center">
              <p className="text-white/30 text-2xl mb-8">Aguardando início…</p>
              <button onClick={startDraw} disabled={eligibles.length === 0}
                className="bg-[#B5191B] text-white font-[800] text-xl px-16 py-5 rounded-2xl hover:bg-[#8B1010] disabled:opacity-50">
                SORTEAR
              </button>
            </div>
          )}
          {(drawState === 'spinning' || drawState === 'result') && (
            <div className="text-center">
              {drawState === 'result' && <p className="text-7xl mb-6">🎉</p>}
              {drawState === 'result' && <p className="text-3xl font-[700] text-white/60 mb-4 uppercase tracking-widest">Parabéns!</p>}
              <p className={`text-5xl md:text-7xl font-[900] px-8 text-center leading-tight ${drawState === 'spinning' ? 'blur-sm text-white/60' : 'text-white'}`}>
                {displayName || '…'}
              </p>
            </div>
          )}
          {drawState === 'result' && winner && (
            <div className="mt-12 flex gap-6">
              <button onClick={startDraw}
                className="bg-white/10 text-white font-[700] px-10 py-4 rounded-xl hover:bg-white/20 transition-colors">
                SORTEAR NOVAMENTE
              </button>
              <button onClick={confirmWinner}
                className="bg-[#B5191B] text-white font-[700] px-10 py-4 rounded-xl hover:bg-[#8B1010] transition-colors">
                CONFIRMAR
              </button>
            </div>
          )}
          {drawState === 'confirmed' && (
            <div className="mt-8 text-center">
              <p className="text-green-400 text-xl font-semibold">✓ Ganhador confirmado!</p>
              <button onClick={reset} className="mt-6 text-white/50 hover:text-white/70 transition-colors">
                Novo sorteio
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── QR Generator ─────────────────────────────────────────────────────────────

function QRGenerator() {
  const [url, setUrl] = useState(CONFIG.PUBLIC_URL);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = useCallback(async () => {
    if (!url.trim()) return;
    setLoading(true);
    try {
      const dataUrl = await QRCode.toDataURL(url.trim(), {
        width: 1200,
        margin: 4,
        color: { dark: '#000000', light: '#ffffff' },
        errorCorrectionLevel: 'H',
      });
      setQrDataUrl(dataUrl);
    } catch { /* ignore */ }
    setLoading(false);
  }, [url]);

  useEffect(() => { generate(); }, [generate]);

  const downloadPNG = () => {
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'wise-qrcode.png';
    a.click();
  };

  const downloadSVG = async () => {
    const svg = await QRCode.toString(url.trim(), { type: 'svg', margin: 4, color: { dark: '#000000', light: '#ffffff' } });
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'wise-qrcode.svg';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#B5191B]/10 flex items-center justify-center">
          <QrCode size={20} className="text-[#B5191B]" />
        </div>
        <div>
          <h2 className="font-[800] text-[#1B1B1B] text-lg">QR Code da Landing Page</h2>
          <p className="text-sm text-gray-500">Para impressão nos chaveiros</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">URL permanente</label>
        <div className="flex gap-2">
          <input type="url" value={url} onChange={e => setUrl(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B5191B]/40 bg-gray-50 text-sm" />
          <button onClick={generate} disabled={loading}
            className="bg-[#1B1B1B] text-white px-4 py-3 rounded-xl hover:bg-black transition-colors disabled:opacity-50 text-sm font-semibold">
            Gerar
          </button>
        </div>
      </div>

      {qrDataUrl && (
        <div className="flex flex-col items-center gap-6">
          <div className="bg-white border-4 border-white shadow-lg rounded-xl p-2">
            <img src={qrDataUrl} alt="QR Code" className="w-48 h-48 object-contain" />
          </div>
          <div className="flex gap-3 w-full">
            <button onClick={downloadPNG}
              className="flex-1 flex items-center justify-center gap-2 bg-[#1B1B1B] text-white font-[700] py-3 rounded-xl hover:bg-black transition-colors text-sm">
              <Download size={16} /> PNG
            </button>
            <button onClick={downloadSVG}
              className="flex-1 flex items-center justify-center gap-2 border border-[#1B1B1B] text-[#1B1B1B] font-[700] py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm">
              <Download size={16} /> SVG
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Participants Table ────────────────────────────────────────────────────────

function ParticipantsTable({ leads, onRefresh, loading }: { leads: Lead[]; onRefresh: () => void; loading: boolean }) {
  const [search, setSearch] = useState('');

  const filtered = leads.filter(l => {
    const q = search.toLowerCase();
    return !q || l.full_name.toLowerCase().includes(q) || l.phone.includes(q) || l.email.toLowerCase().includes(q);
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 md:p-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#B5191B]/10 flex items-center justify-center">
            <Users size={20} className="text-[#B5191B]" />
          </div>
          <h2 className="font-[800] text-[#1B1B1B] text-lg">Participantes</h2>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="search" placeholder="Buscar…" value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#B5191B]/40 bg-gray-50" />
          </div>
          <button onClick={onRefresh} disabled={loading}
            className="flex items-center gap-1.5 border border-gray-200 text-gray-600 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Atualizar
          </button>
          <button onClick={() => exportCSV(leads)}
            className="flex items-center gap-1.5 bg-[#1B1B1B] text-white px-3 py-2 rounded-xl hover:bg-black transition-colors text-sm font-semibold">
            <Download size={14} /> CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-semibold">Nome</th>
              <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">WhatsApp</th>
              <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">E-mail</th>
              <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Instagram</th>
              <th className="text-left px-4 py-3 font-semibold">Data</th>
              <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Hora</th>
              <th className="text-left px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-12 text-gray-400">Nenhum participante encontrado.</td></tr>
            ) : filtered.map(l => (
              <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-[#1B1B1B]">{l.full_name}</td>
                <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{maskPartialPhone(l.phone)}</td>
                <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{l.email}</td>
                <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{l.instagram ?? '—'}</td>
                <td className="px-4 py-3 text-gray-600">{formatDate(l.created_at)}</td>
                <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{formatTime(l.created_at)}</td>
                <td className="px-4 py-3">
                  {l.winner
                    ? <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-full">🏆 Ganhador</span>
                    : <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">✓ Inscrito</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'overview' | 'draw' | 'qr'>('overview');

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('event_leads')
      .select('*')
      .order('created_at', { ascending: false });
    setLeads(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLeads();
    const channel = supabase
      .channel('event_leads_rt')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'event_leads' }, fetchLeads)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchLeads]);

  const today = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const todayCount = leads.filter(l => formatDate(l.created_at) === today).length;
  const lastLead = leads[0];
  const winnersCount = leads.filter(l => l.winner).length;

  const stats = [
    { icon: <Users size={22} className="text-[#B5191B]" />, label: 'Participantes', value: leads.length },
    { icon: <Calendar size={22} className="text-[#B5191B]" />, label: 'Cadastros hoje', value: todayCount },
    { icon: <Clock size={22} className="text-[#B5191B]" />, label: 'Último cadastro', value: lastLead ? formatTime(lastLead.created_at) : '—' },
    { icon: <Trophy size={22} className="text-[#B5191B]" />, label: 'Sorteados', value: winnersCount },
  ];

  const tabs = [
    { id: 'overview', label: 'Participantes' },
    { id: 'draw', label: 'Sorteio' },
    { id: 'qr', label: 'QR Code' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logoImg} alt="Wise Madness" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <h1 className="font-[800] text-[#1B1B1B] text-base leading-tight">WISE — Painel do Evento</h1>
              <p className="text-xs text-gray-400">Administração</p>
            </div>
          </div>
          <button onClick={onLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm font-semibold">
            <LogOut size={16} /> Sair
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                {s.icon}
                <span className="text-sm text-gray-500 font-medium">{s.label}</span>
              </div>
              <p className="text-3xl font-[900] text-[#1B1B1B]">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl border border-gray-100 p-1 w-fit">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-5 py-2 rounded-lg text-sm font-[700] transition-colors ${tab === t.id ? 'bg-[#B5191B] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'overview' && (
          <ParticipantsTable leads={leads} onRefresh={fetchLeads} loading={loading} />
        )}
        {tab === 'draw' && (
          <DrawManager leads={leads} />
        )}
        {tab === 'qr' && (
          <div className="max-w-sm">
            <QRGenerator />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(!!s);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (session === null) {
    return (
      <div className="min-h-screen bg-[#1B1B1B] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <LoginForm onLogin={() => setSession(true)} />;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(false);
  };

  return <Dashboard onLogout={handleLogout} />;
}
