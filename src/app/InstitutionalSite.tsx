import { Menu, X, Facebook, Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';
import { FAQ } from './components/FAQ';
import logoImg from "../imports/Logo.png";
import heroImg from "../imports/DAN_0389.jpg";
import aboutImg from "../imports/DAN_0391.jpg";
import projectImg1 from "../imports/DAN_0372.jpg";
import projectImg2 from "../imports/DAN_0373.jpg";
import projectImg3 from "../imports/DAN_0374.jpg";
import projectImg4 from "../imports/DAN_0375.jpg";
import projectImg5 from "../imports/DAN_0581.jpg";
import selosImg from "../imports/image-9.png";

export default function InstitutionalSite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header / Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <img src={logoImg} alt="Wise Madness" className="h-12 w-auto" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('inicio')} className="text-[#111111] hover:text-[#CC0000] transition-colors">
              Início
            </button>
            <button onClick={() => scrollToSection('sobre')} className="text-[#111111] hover:text-[#CC0000] transition-colors">
              Sobre
            </button>
            <button onClick={() => scrollToSection('projetos')} className="text-[#111111] hover:text-[#CC0000] transition-colors">
              Projetos
            </button>
            <button onClick={() => scrollToSection('apoiar')} className="text-[#111111] hover:text-[#CC0000] transition-colors">
              Como Apoiar
            </button>
            <button onClick={() => scrollToSection('contato')} className="text-[#111111] hover:text-[#CC0000] transition-colors">
              Contato
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-[#111111] hover:text-[#CC0000] transition-colors">
              FAQ
            </button>
            <button onClick={() => scrollToSection('transparencia')} className="text-[#111111] hover:text-[#CC0000] transition-colors">
              Transparência
            </button>
            <a
              href="https://sitevero-cms-production.nyc3.cdn.digitaloceanspaces.com/ed56bfa9-6eca-4a60-8be4-4f0eb861d98d/1774005832342_E-book_CMDCA.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#111111] hover:text-[#CC0000] transition-colors"
            >
              Ebook
            </a>
            <button
              onClick={() => scrollToSection('apoiar')}
              className="bg-[#CC0000] text-white px-6 py-2 rounded-md hover:bg-[#AA0000] transition-colors"
            >
              Apoiar
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#111111]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="container mx-auto px-4 flex flex-col gap-4">
              <button onClick={() => scrollToSection('inicio')} className="text-[#111111] hover:text-[#CC0000] text-left">
                Início
              </button>
              <button onClick={() => scrollToSection('sobre')} className="text-[#111111] hover:text-[#CC0000] text-left">
                Sobre
              </button>
              <button onClick={() => scrollToSection('projetos')} className="text-[#111111] hover:text-[#CC0000] text-left">
                Projetos
              </button>
              <button onClick={() => scrollToSection('apoiar')} className="text-[#111111] hover:text-[#CC0000] text-left">
                Como Apoiar
              </button>
              <button onClick={() => scrollToSection('contato')} className="text-[#111111] hover:text-[#CC0000] text-left">
                Contato
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-[#111111] hover:text-[#CC0000] text-left">
                FAQ
              </button>
              <button onClick={() => scrollToSection('transparencia')} className="text-[#111111] hover:text-[#CC0000] text-left">
                Transparência
              </button>
              <a
                href="https://sitevero-cms-production.nyc3.cdn.digitaloceanspaces.com/ed56bfa9-6eca-4a60-8be4-4f0eb861d98d/1774005832342_E-book_CMDCA.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111111] hover:text-[#CC0000] text-left"
              >
                Ebook
              </a>
              <button
                onClick={() => scrollToSection('apoiar')}
                className="bg-[#CC0000] text-white px-6 py-2 rounded-md hover:bg-[#AA0000] transition-colors text-center"
              >
                Apoiar
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative h-screen flex items-center justify-center bg-[#111111] mt-20"
        style={{
          backgroundImage: `linear-gradient(rgba(17, 17, 17, 0.7), rgba(17, 17, 17, 0.7)), url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-[800] mb-6 leading-tight">
            Arte, cultura e acolhimento<br />para transformar realidades.
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Desde 2006, a Wise Madness muda vidas em Bauru através da arte, esporte e acolhimento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('apoiar')}
              className="bg-[#CC0000] text-white px-8 py-4 rounded-md text-lg hover:bg-[#AA0000] transition-colors"
            >
              Quero Apoiar
            </button>
            <button
              onClick={() => scrollToSection('projetos')}
              className="border-2 border-white text-white px-8 py-4 rounded-md text-lg hover:bg-white hover:text-[#111111] transition-colors"
            >
              Conheça nossos projetos
            </button>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-[800] text-[#CC0000] mb-2">700+</div>
              <p className="text-gray-600">Crianças e adolescentes impactados</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-[800] text-[#CC0000] mb-2">630</div>
              <p className="text-gray-600">Atendidos no SCFV</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-[800] text-[#CC0000] mb-2">40</div>
              <p className="text-gray-600">Crianças acolhidas nos abrigos</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-[800] text-[#CC0000] mb-2">184 mil</div>
              <p className="text-gray-600">Pessoas alcançadas pelo Impactar com Arte</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={aboutImg}
                alt="Wise Madness - Nossa História"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div>
              <div className="inline-block bg-[#CC0000] text-white px-4 py-1 rounded-full text-sm mb-4">
                19 anos de história
              </div>
              <h2 className="text-4xl md:text-5xl font-[800] text-[#111111] mb-6">
                Quem somos
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Somos uma Associação Sociocultural nascida em 2006. Começamos em casas e espaços públicos trabalhando com Street Dance, teatro e pirofagia.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Desde 2010, temos sede própria. Em 2014, firmamos parceria com a Prefeitura de Bauru para atender crianças e adolescentes em situação de vulnerabilidade.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nossa missão é transformar vidas através da arte, cultura, esporte e acolhimento, oferecendo oportunidades reais de desenvolvimento para quem mais precisa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-[800] text-[#111111] mb-4">
              Nossos Projetos
            </h2>
            <p className="text-xl text-gray-600">
              Conheça as iniciativas que transformam vidas em Bauru
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-[#CC0000] hover:shadow-xl transition-shadow">
              <img src={projectImg1} alt="Wise Way" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-[700] text-[#111111] mb-3">Wise Way — Grupo de Artes</h3>
                <p className="text-gray-700 mb-4">
                  Grupo de artes para crianças e adolescentes de 6 a 16 anos, fundado em 2011. Oficinas de Street Dance, teatro, música e artes visuais.
                </p>
                <button className="text-[#CC0000] hover:text-[#AA0000] font-[700]">Saiba mais →</button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-[#CC0000] hover:shadow-xl transition-shadow">
              <img src={projectImg2} alt="Impactar com Arte" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-[700] text-[#111111] mb-3">Impactar com Arte</h3>
                <p className="text-gray-700 mb-4">
                  Oficinas culturais gratuitas de malabares, break, street dance, MC, percussão e dança contemporânea. Apoiado pela Lei Rouanet (R$ 949 mil). Meta: 6 mil pessoas até 2026.
                </p>
                <button className="text-[#CC0000] hover:text-[#AA0000] font-[700]">Saiba mais →</button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-[#CC0000] hover:shadow-xl transition-shadow">
              <img src={projectImg3} alt="SCFV" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-[700] text-[#111111] mb-3">Serviço de Convivência e Fortalecimento de Vínculos</h3>
                <p className="text-gray-700 mb-4">
                  Em parceria com a Prefeitura de Bauru, 630 crianças atendidas em 4 unidades no contraturno escolar.
                </p>
                <button className="text-[#CC0000] hover:text-[#AA0000] font-[700]">Saiba mais →</button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-[#CC0000] hover:shadow-xl transition-shadow">
              <img src={projectImg4} alt="Casa de Acolhimento" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-[700] text-[#111111] mb-3">Casa de Acolhimento</h3>
                <p className="text-gray-700 mb-4">
                  Duas unidades que acolhem crianças afastadas do convívio familiar. 40 crianças atendidas diariamente.
                </p>
                <button className="text-[#CC0000] hover:text-[#AA0000] font-[700]">Saiba mais →</button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-[#CC0000] hover:shadow-xl transition-shadow">
              <img src={projectImg5} alt="Projeto Hóquei" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-[700] text-[#111111] mb-3">Projeto Hóquei</h3>
                <p className="text-gray-700 mb-4">
                  Escola de hóquei sobre patins para crianças em situação de risco. Em 2024: Campeões Sub-12B no Paulista, Vice-Campeões no Brasileiro.
                </p>
                <button className="text-[#CC0000] hover:text-[#AA0000] font-[700]">Saiba mais →</button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-t-4 border-[#CC0000] hover:shadow-xl transition-shadow">
              <div className="p-6">
                <h3 className="text-2xl font-[700] text-[#111111] mb-3">Curso Foco — Empreendedorismo</h3>
                <p className="text-gray-700 mb-4">
                  Iniciativa transformadora voltada para adolescentes em situação de vulnerabilidade, com foco em empreendedorismo e inserção no mercado de trabalho.
                </p>
                <button className="text-[#CC0000] hover:text-[#AA0000] font-[700]">Saiba mais →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Help Section */}
      <section id="apoiar" className="py-20 bg-[#CC0000] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-[800] mb-4">Faça parte dessa transformação</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="text-center">
              <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-[700] mb-4">Doação Recorrente</h3>
              <p className="text-lg opacity-90">Contribuição mensal com qualquer valor via site ou PIX</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-[700] mb-4">Seja Voluntário</h3>
              <p className="text-lg opacity-90">Presencial ou home office — escolha como se envolver</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-[700] mb-4">Parceria Empresarial</h3>
              <p className="text-lg opacity-90">Lei Rouanet, IR, Nota Fiscal Paulista ou doação direta</p>
            </div>
          </div>
          <div className="text-center">
            <button className="bg-white text-[#CC0000] px-10 py-4 rounded-md text-xl font-[700] hover:bg-gray-100 transition-colors">
              Quero Apoiar Agora
            </button>
          </div>
        </div>
      </section>

      {/* Donation Strip */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h3 className="text-2xl md:text-3xl font-[700] text-[#111111]">Sua doação salva infâncias.</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#CC0000] text-white px-8 py-3 rounded-md hover:bg-[#AA0000] transition-colors">PIX / TED</button>
              <button className="border-2 border-[#CC0000] text-[#CC0000] px-8 py-3 rounded-md hover:bg-[#CC0000] hover:text-white transition-colors">Saiba mais formas</button>
            </div>
          </div>
        </div>
      </section>

      {/* Transparência Section */}
      <section id="transparencia" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-[800] text-[#CC0000] mb-4">Transparência</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              Nessa seção, os visitantes poderão visualizar todos os relatórios sobre nossas atividades, ações, doações e captação de recursos de um jeito claro e objetivo.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: "Informações Institucionais", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
              { title: "Impacto Social", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: "Relatórios Financeiros", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
              { title: "Contratos e Serviços", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
              { title: "Estrutura Administrativa e Contatos", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
              { title: "Outros / Itens Adicionais", icon: "M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" },
            ].map(({ title, icon }) => (
              <div key={title} className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-[700] text-[#111111]">{title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-[800] text-[#111111] text-center mb-12">
            Quem acredita na nossa causa
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {["BTG Pactual", "Mezzani", "Grupo Lwart", "Imeca", "Promins", "Paschoalotto", "Supermercados Pacaembu", "Prefeitura de Bauru"].map((p) => (
              <div key={p} className="text-center p-4">
                <p className="text-xl font-[700] text-gray-600">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-[#111111] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            <div>
              <img src={logoImg} alt="Wise Madness" className="h-12 w-auto mb-4 brightness-0 invert" />
              <p className="text-gray-400 mb-6">Arte, cultura e acolhimento para transformar realidades.</p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/wisemadness" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#CC0000] transition-colors" aria-label="Facebook">
                  <Facebook size={24} />
                </a>
                <a href="https://www.instagram.com/wisemadnesssocial/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#CC0000] transition-colors" aria-label="Instagram">
                  <Instagram size={24} />
                </a>
                <a href="https://www.youtube.com/@WMsabialoucura" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#CC0000] transition-colors" aria-label="YouTube">
                  <Youtube size={24} />
                </a>
              </div>
              <div className="mt-8">
                <img src={selosImg} alt="Selos de Transparência - IMPACTODO" className="w-48 h-auto" />
              </div>
            </div>
            <div>
              <h4 className="font-[700] mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                {[['inicio','Início'],['sobre','Sobre'],['projetos','Projetos'],['apoiar','Como Apoiar'],['contato','Contato'],['faq','FAQ'],['transparencia','Transparência']].map(([id, label]) => (
                  <li key={id}>
                    <button onClick={() => scrollToSection(id)} className="text-gray-400 hover:text-[#CC0000] transition-colors">{label}</button>
                  </li>
                ))}
                <li>
                  <a href="https://sitevero-cms-production.nyc3.cdn.digitaloceanspaces.com/ed56bfa9-6eca-4a60-8be4-4f0eb861d98d/1774005832342_E-book_CMDCA.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#CC0000] transition-colors">Ebook</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-[700] mb-4">Contato</h4>
              <ul className="space-y-3 text-gray-400">
                <li>Rua Braz Lemes de Almeida nº 2-45</li>
                <li>Bauru, São Paulo</li>
                <li>CEP: 17047-630, Brasil</li>
                <li className="pt-2">Tel.: 14 3208-7400</li>
                <li className="pt-2">
                  <a href="mailto:adm@wisemadness.com.br" className="hover:text-[#CC0000] transition-colors">adm@wisemadness.com.br</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 Associação Wise Madness — CNPJ: 13.890.668/0001-01</p>
            <p className="mt-2">
              <a href="#" className="hover:text-[#CC0000] transition-colors">Política de Privacidade</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
