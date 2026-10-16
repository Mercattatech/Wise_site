import { useState, useEffect, useRef } from 'react';
import { Play, Gift, Heart, Instagram, Copy, Check, ChevronDown, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CONFIG } from '../lib/config';
import logoImg from '../imports/Logo.png';
import pixQrImg from '../imports/Jantar_WiseMadness.jpg';

// ── Helpers ──────────────────────────────────────────────────────────────────

function maskPhone(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d{0,4})(\d{0,4})/, (_, a, b, c) => `(${a}) ${b}${c ? '-' + c : ''}`);
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, a, b, c) => `(${a}) ${b}${c ? '-' + c : ''}`);
}

function getUTMs() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get('utm_source'),
    utm_medium: p.get('utm_medium'),
    utm_campaign: p.get('utm_campaign'),
    utm_content: p.get('utm_content'),
    utm_term: p.get('utm_term'),
  };
}

function pushEvent(name: string) {
  if (CONFIG.GTM_ID && typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event: name });
  }
}

function buildVideoEmbed(url: string): string | null {
  if (!url) return null;
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`;
  // Vimeo
  const vmMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vmMatch) return `https://player.vimeo.com/video/${vmMatch[1]}`;
  return url;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function VideoSection({ onScroll }: { onScroll?: () => void }) {
  const [playing, setPlaying] = useState(false);
  const hasIframe = Boolean(CONFIG.VIDEO_IFRAME);
  const embedUrl = hasIframe ? null : buildVideoEmbed(CONFIG.VIDEO_URL);

  return (
    <section id="video" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-[800] text-[#111111] mb-3 leading-tight">
            Uma história que merece ser conhecida.
          </h2>
          <p className="text-gray-600 text-lg">
            Assista e conheça um pouco mais sobre essa história, essa parceria e o impacto que juntos podemos gerar.
          </p>
        </div>

        <div className="relative w-full rounded-2xl overflow-hidden bg-[#111111] shadow-xl" style={{ paddingBottom: '56.25%' }}>
          {hasIframe ? (
            <div
              className="absolute inset-0 w-full h-full"
              dangerouslySetInnerHTML={{ __html: CONFIG.VIDEO_IFRAME.replace('<iframe', '<iframe style="position:absolute;top:0;left:0;width:100%;height:100%"') }}
            />
          ) : embedUrl && playing ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`${embedUrl}&autoplay=1`}
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Vídeo WISE Madness"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1B1B1B]">
              {embedUrl ? (
                <button
                  onClick={() => { setPlaying(true); pushEvent('video_play'); }}
                  className="group flex flex-col items-center gap-4"
                  aria-label="Assistir vídeo"
                >
                  <div className="w-20 h-20 rounded-full bg-[#B5191B] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play size={36} className="text-white ml-1" fill="white" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">Assistir à história</span>
                </button>
              ) : (
                <div className="flex flex-col items-center gap-3 text-white/40">
                  <Play size={48} />
                  <p className="text-lg font-semibold tracking-widest uppercase">Vídeo em breve</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

type FormState = 'idle' | 'loading' | 'success' | 'duplicate' | 'error';

function GiveawaySection() {
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', instagram: '', consent: false });
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => { pushEvent('giveaway_view'); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === 'loading') return;

    // Open Google Forms if configured
    if (CONFIG.FORM_MODE === 'google_forms' && CONFIG.GOOGLE_FORMS_URL) {
      window.open(CONFIG.GOOGLE_FORMS_URL, '_blank');
      return;
    }

    setFormState('loading');
    pushEvent('giveaway_submit');

    try {
      const phone = form.phone.replace(/\D/g, '');
      const email = form.email.toLowerCase().trim();

      // Duplicate check
      const { data: existing } = await supabase
        .from('event_leads')
        .select('id')
        .or(`phone.eq.${phone},email.eq.${email}`)
        .limit(1);

      if (existing && existing.length > 0) {
        setFormState('duplicate');
        return;
      }

      const utms = getUTMs();
      const { error } = await supabase.from('event_leads').insert({
        full_name: form.full_name.trim(),
        phone,
        email,
        instagram: form.instagram.trim() || null,
        consent: form.consent,
        source: 'Evento WISE',
        winner: false,
        ...utms,
      });

      if (error) throw error;

      setFormState('success');
      pushEvent('giveaway_success');
    } catch {
      setFormState('error');
      setErrorMsg('Não conseguimos concluir seu cadastro agora. Tente novamente em alguns instantes.');
    }
  };

  if (formState === 'success') {
    return (
      <section id="sorteio" className="py-16 bg-[#F7F7F7]">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-[800] text-[#111111] mb-3">Você está participando!</h2>
            <p className="text-gray-600 mb-8">Cadastro confirmado. Agora é só ficar atento ao sorteio durante o evento.</p>
            {CONFIG.INSTAGRAM_URL && (
              <a
                href={CONFIG.INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-[700] hover:opacity-90 transition-opacity"
              >
                <Instagram size={20} />
                Conhecer o Instagram
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (formState === 'duplicate') {
    return (
      <section id="sorteio" className="py-16 bg-[#F7F7F7]">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-[800] text-[#111111] mb-3">Você já está participando!</h2>
            <p className="text-gray-600">Encontramos seu cadastro. Você já está participando do sorteio. Boa sorte!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="sorteio" className="py-16 bg-[#F7F7F7]">
      <div className="container mx-auto px-4 max-w-lg">
        <div className="text-center mb-8">
          <span className="text-4xl">🎁</span>
          <h2 className="text-3xl md:text-4xl font-[800] text-[#111111] mt-2 mb-3">
            Participe do nosso sorteio
          </h2>
          <p className="text-gray-600">Cadastre-se para participar do sorteio realizado durante o evento.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {CONFIG.FORM_MODE === 'google_forms' && CONFIG.GOOGLE_FORMS_URL ? (
            <div className="text-center py-4">
              <a
                href={CONFIG.GOOGLE_FORMS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#B5191B] text-white text-xl font-[800] px-10 py-4 rounded-xl hover:bg-[#8B1010] transition-colors w-full text-center"
              >
                QUERO PARTICIPAR
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="full_name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Nome completo <span className="text-[#B5191B]">*</span>
                </label>
                <input
                  id="full_name"
                  type="text"
                  required
                  value={form.full_name}
                  onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B5191B]/40 focus:border-[#B5191B] bg-gray-50"
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                  WhatsApp <span className="text-[#B5191B]">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: maskPhone(e.target.value) }))}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B5191B]/40 focus:border-[#B5191B] bg-gray-50"
                  autoComplete="tel"
                  inputMode="numeric"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                  E-mail <span className="text-[#B5191B]">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B5191B]/40 focus:border-[#B5191B] bg-gray-50"
                  autoComplete="email"
                  inputMode="email"
                />
              </div>

              <div>
                <label htmlFor="instagram" className="block text-sm font-semibold text-gray-700 mb-1">
                  Instagram <span className="text-gray-400">(opcional)</span>
                </label>
                <input
                  id="instagram"
                  type="text"
                  value={form.instagram}
                  onChange={e => setForm(f => ({ ...f, instagram: e.target.value }))}
                  placeholder="@seuusuario"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B5191B]/40 focus:border-[#B5191B] bg-gray-50"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={form.consent}
                    onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))}
                    className="mt-1 w-4 h-4 accent-[#B5191B] flex-shrink-0"
                  />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    Concordo com o uso dos meus dados para participação nesta ação e comunicações relacionadas, conforme a{' '}
                    {CONFIG.PRIVACY_URL
                      ? <a href={CONFIG.PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="text-[#B5191B] underline">Política de Privacidade</a>
                      : <span className="text-[#B5191B]">Política de Privacidade</span>
                    }.
                    {CONFIG.GIVEAWAY_RULES_URL && (
                      <>{' '}Consulte também o{' '}
                        <a href={CONFIG.GIVEAWAY_RULES_URL} target="_blank" rel="noopener noreferrer" className="text-[#B5191B] underline">Regulamento do Sorteio</a>.
                      </>
                    )}
                  </span>
                </label>
              </div>

              {formState === 'error' && (
                <p className="text-red-600 text-sm bg-red-50 rounded-lg px-4 py-3" role="alert">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={formState === 'loading' || !form.consent}
                className="w-full bg-[#B5191B] text-white text-xl font-[800] py-4 rounded-xl hover:bg-[#8B1010] disabled:opacity-60 disabled:cursor-not-allowed transition-all mt-2"
              >
                {formState === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Aguarde…
                  </span>
                ) : 'QUERO PARTICIPAR'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function DonationSection() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) pushEvent('pix_view'); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleCopy = async () => {
    if (!CONFIG.PIX_COPY_PASTE) return;
    try {
      await navigator.clipboard.writeText(CONFIG.PIX_COPY_PASTE);
      setCopied(true);
      pushEvent('pix_copy');
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // fallback: show key
    }
  };

  return (
    <section id="doacao" ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <h2 className="text-3xl md:text-4xl font-[800] text-[#111111] mb-3">
          Transforme junto com a gente.
        </h2>
        <p className="text-gray-600 mb-10">
          Se essa história tocou você e deseja contribuir, sua doação pode fazer parte dessa transformação.
        </p>

        <div className="bg-[#F7F7F7] rounded-2xl p-8 shadow-sm">
          <img
            src={pixQrImg}
            alt="QR Code PIX WISE Madness"
            className="w-64 h-64 mx-auto rounded-xl object-contain bg-white p-2 shadow-sm"
          />

          {CONFIG.PIX_KEY && (
            <p className="mt-4 text-sm text-gray-500">
              Chave PIX: <span className="font-semibold text-[#1B1B1B]">{CONFIG.PIX_KEY}</span>
            </p>
          )}

          {CONFIG.PIX_COPY_PASTE && (
            <button
              onClick={handleCopy}
              className="mt-6 flex items-center gap-2 mx-auto bg-[#B5191B] text-white px-8 py-3 rounded-xl font-[700] hover:bg-[#8B1010] transition-colors"
              aria-label="Copiar código PIX"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'PIX copiado!' : 'COPIAR PIX'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function InstagramSection() {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Elfsight widget script for Instagram feed embed
    const existing = document.querySelector('script[src*="elfsight"]');
    if (!existing) {
      const s = document.createElement('script');
      s.src = 'https://static.elfsight.com/platform/platform.js';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  if (!CONFIG.INSTAGRAM_URL) return null;

  const handle = CONFIG.INSTAGRAM_URL.replace(/\/$/, '').split('/').pop() ?? 'wisemadnesssocial';

  return (
    <section id="instagram" className="py-16 bg-[#1B1B1B]">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
            <Instagram size={14} /> @{handle}
          </div>
          <h2 className="text-3xl md:text-4xl font-[800] text-white mb-3">Continue conectado.</h2>
          <p className="text-white/60">Acompanhe nosso trabalho, histórias e próximos projetos.</p>
        </div>

        {/* Instagram feed placeholder grid — replace the 6 tiles below with your Elfsight widget div */}
        <div className="grid grid-cols-3 gap-1.5 rounded-2xl overflow-hidden mb-8" ref={embedRef}>
          {Array.from({ length: 6 }).map((_, i) => (
            <a
              key={i}
              href={CONFIG.INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => pushEvent('instagram_click')}
              className="relative aspect-square bg-gradient-to-br from-[#B5191B]/80 to-[#1B1B1B] flex items-center justify-center group overflow-hidden"
            >
              <Instagram size={28} className="text-white/20 group-hover:text-white/50 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-orange-900/30 group-hover:opacity-70 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={20} className="text-white" />
              </div>
            </a>
          ))}
        </div>

        {/* Elfsight widget slot — paste your widget code here */}
        {/* <div className="elfsight-app-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" data-elfsight-app-lazy></div> */}

        <div className="text-center">
          <a
            href={CONFIG.INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => pushEvent('instagram_click')}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-10 py-4 rounded-xl text-lg font-[800] hover:opacity-90 transition-opacity shadow-lg"
          >
            <Instagram size={22} />
            SEGUIR NO INSTAGRAM
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { pushEvent('page_view'); }, []);

  const quickActions = [
    {
      id: 'video',
      icon: <Play size={28} className="text-[#B5191B]" />,
      label: 'Conheça essa história',
      sub: 'Assista ao vídeo',
      highlight: false,
    },
    {
      id: 'sorteio',
      icon: <Gift size={28} className="text-white" />,
      label: 'Participe do sorteio',
      sub: 'Cadastre-se agora',
      highlight: true,
    },
    {
      id: 'doacao',
      icon: <Heart size={28} className="text-[#B5191B]" />,
      label: 'Faça uma doação',
      sub: 'Via PIX',
      highlight: false,
    },
    {
      id: 'instagram',
      icon: <Instagram size={28} className="text-[#B5191B]" />,
      label: 'Siga no Instagram',
      sub: '@wisemadnesssocial',
      highlight: false,
      href: CONFIG.INSTAGRAM_URL,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-['Montserrat',sans-serif]">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="inicio" className="min-h-screen flex flex-col items-center justify-center bg-[#1B1B1B] px-4 py-16 text-center relative overflow-hidden">
        {/* subtle red glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#B5191B]/20 blur-[120px] rounded-full pointer-events-none" />

        <img src={logoImg} alt="Wise Madness" className="h-20 w-auto mb-8 relative z-10" />

        <h1 className="text-4xl md:text-6xl font-[900] text-white mb-6 leading-tight max-w-2xl relative z-10">
          Você faz parte<br />desse movimento.
        </h1>

        <p className="text-lg text-white/70 mb-10 max-w-md relative z-10 leading-relaxed">
          Conheça essa história, participe do sorteio e descubra como você também pode fazer parte dessa transformação.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full max-w-sm sm:max-w-none sm:justify-center">
          <button
            onClick={() => scrollTo('sorteio')}
            className="bg-[#B5191B] text-white font-[800] text-base px-8 py-4 rounded-xl hover:bg-[#8B1010] transition-colors shadow-lg w-full sm:w-auto"
          >
            QUERO PARTICIPAR DO SORTEIO
          </button>
          <button
            onClick={() => scrollTo('video')}
            className="border-2 border-white/40 text-white font-[700] text-base px-8 py-4 rounded-xl hover:border-white hover:bg-white/10 transition-colors w-full sm:w-auto"
          >
            ASSISTIR À HISTÓRIA
          </button>
        </div>

        <button
          onClick={() => scrollTo('acoes')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors animate-bounce"
          aria-label="Rolar para baixo"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* ── QUICK ACTIONS ────────────────────────────────────── */}
      <section id="acoes" className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((a) => {
              const inner = (
                <div
                  key={a.id}
                  className={`rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer shadow-sm transition-all active:scale-95 hover:shadow-md ${
                    a.highlight
                      ? 'bg-[#B5191B] text-white'
                      : 'bg-[#F7F7F7] text-[#1B1B1B]'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${a.highlight ? 'bg-white/20' : 'bg-white'}`}>
                    {a.icon}
                  </div>
                  <div className="text-center">
                    <p className={`font-[700] text-sm leading-tight ${a.highlight ? 'text-white' : 'text-[#1B1B1B]'}`}>{a.label}</p>
                    <p className={`text-xs mt-0.5 ${a.highlight ? 'text-white/70' : 'text-gray-400'}`}>{a.sub}</p>
                  </div>
                </div>
              );

              return a.href ? (
                <a key={a.id} href={a.href} target="_blank" rel="noopener noreferrer" onClick={() => pushEvent('instagram_click')}>
                  {inner}
                </a>
              ) : (
                <button key={a.id} onClick={() => scrollTo(a.id)} className="text-left">
                  {inner}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VIDEO ──────────────────────────────────────────── */}
      <VideoSection />

      {/* ── SORTEIO ──────────────────────────────────────────── */}
      <GiveawaySection />

      {/* ── DOAÇÃO ──────────────────────────────────────────── */}
      <DonationSection />

      {/* ── INSTAGRAM ──────────────────────────────────────── */}
      <InstagramSection />

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="bg-[#111111] text-white py-10 text-center px-4">
        <img src={logoImg} alt="Wise Madness" className="h-10 w-auto mx-auto mb-4 brightness-0 invert" />
        <p className="text-white/40 text-sm">© 2026 WISE Madness. Todos os direitos reservados.</p>
        <div className="flex justify-center gap-6 mt-4 text-white/40 text-sm flex-wrap">
          {CONFIG.PRIVACY_URL && (
            <a href={CONFIG.PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
              Política de Privacidade
            </a>
          )}
          {CONFIG.GIVEAWAY_RULES_URL && (
            <a href={CONFIG.GIVEAWAY_RULES_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
              Regulamento
            </a>
          )}
          {CONFIG.INSTAGRAM_URL && (
            <a href={CONFIG.INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
              Instagram
            </a>
          )}
        </div>
      </footer>
    </div>
  );
}
