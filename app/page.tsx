'use client';

import React, { useState, useEffect, useRef } from "react";
import {
  Building,
  CheckCircle2,
  Star,
  Menu,
  X,
  Sparkles,
  Search,
  ShieldCheck,
  Zap,
  HandCoins,
  ArrowRight,
  Info,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
} from "lucide-react";

interface Imovel {
  id: number;
  nome: string;
  bairro: string;
  zona: "Zona Leste" | "Zona Norte" | "Zona Oeste" | "Zona Sul";
  dorms: string;
  urgente: boolean;
  diferenciais: string[];
  imagem: string;
}

const imoveisData: Imovel[] = [
  { id: 1, nome: "Novo Mundo Carrão II", bairro: "Vila Carrão", zona: "Zona Leste", dorms: "1 e 2 Dorms", urgente: true, diferenciais: ["Pomar", "Sauna", "Redário", "Pet Care", "Beach Tênis"], imagem: "https://cury.net/storage/images/products/gallery/69c6bd22e4632.jpeg" },
  { id: 2, nome: "Novo Mundo Carrão", bairro: "Vila Carrão", zona: "Zona Leste", dorms: "1 e 2 Dorms", urgente: true, diferenciais: ["Rooftop", "Piscinas", "Beach Tennis", "Pet Place", "Coworking"], imagem: "https://cury.net/storage/images_webp/products/gallery/69c6b90992e1f.jpeg.webp" },
  { id: 3, nome: "Lyne Água Branca", bairro: "Água Branca", zona: "Zona Norte", dorms: "2 Dorms", urgente: true, diferenciais: ["Redário", "Praça do Yoga", "Espaço Zen", "Playground"], imagem: "https://cury.net/storage/images/products/gallery/69aec6a1e1c4b.jpeg" },
  { id: 4, nome: "Marco Freguesia", bairro: "Freguesia do Ó", zona: "Zona Norte", dorms: "2 Dorms", urgente: false, diferenciais: ["Sport Bar", "Sauna", "Piscina infantil", "Pet Place"], imagem: "https://cury.net/storage/images/products/gallery/6986120c801ee.jpeg" },
  { id: 5, nome: "Nova Leopoldina Art", bairro: "Vila Leopoldina", zona: "Zona Oeste", dorms: "2 Dorms", urgente: true, diferenciais: ["Sport Bar", "Piscinas", "Fitness", "Coworking"], imagem: "https://cury.net/storage/images/products/gallery/698611e2d1f0e.jpeg" },
  { id: 6, nome: "Jardim das Flores", bairro: "Jardim Miriam", zona: "Zona Sul", dorms: "2 e 3 Dorms", urgente: false, diferenciais: ["Piscina", "Churrasqueira", "Salão de Festas", "Playground"], imagem: "https://cury.net/storage/images/products/gallery/6986120c801ee.jpeg" },
];

interface Testimonial {
  initials: string;
  name: string;
  location: string;
  stars: number;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  { initials: "MS", name: "Mariana Silva", location: "São Paulo, SP", stars: 5, text: "A Conquista Já resolveu tudo. Simulação de crédito rápido, atendimento exclusivo e excelente comunicação." },
  { initials: "RC", name: "Roberto Campos", location: "Guarulhos, SP", stars: 5, text: "Consultoria personalizada fez toda a diferença. Não perdi tempo com imóveis fora do meu orçamento." },
  { initials: "A&D", name: "Aline e Diego", location: "Osasco, SP", stars: 5, text: "Pegamos as chaves do nosso primeiro imóvel! Apoio jurídico impecável do início ao fim. Super recomendamos!" },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchZone, setSearchZone] = useState("Todas");
  const [activeFilter, setActiveFilter] = useState<"Todas" | "Zona Leste" | "Zona Norte" | "Zona Oeste" | "Zona Sul">("Todas");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formObjective, setFormObjective] = useState("Comprar meu 1º imóvel");
  const [formLgpd, setFormLgpd] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error" | "loading" | null; message: string }>({ type: null, message: "" });
  const [modalName, setModalName] = useState("");
  const [modalPhone, setModalPhone] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalStatus, setModalStatus] = useState<{ type: "success" | "error" | "loading" | null; message: string }>({ type: null, message: "" });
  const [statsData, setStatsData] = useState({ familias: 0, satisfacao: 0, anos: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isCarouselHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isCarouselHovered]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !statsAnimated) {
        setStatsAnimated(true);
        let famStart = 0, satStart = 0, anosStart = 0;
        const famEnd = 1247, satEnd = 98, anosEnd = 60;
        const steps = 60;
        const timer = setInterval(() => {
          famStart += famEnd / steps;
          satStart += satEnd / steps;
          anosStart += anosEnd / steps;
          if (famStart >= famEnd) {
            clearInterval(timer);
            setStatsData({ familias: famEnd, satisfacao: satEnd, anos: anosEnd });
          } else {
            setStatsData({ familias: Math.floor(famStart), satisfacao: Math.floor(satStart), anos: Math.floor(anosStart) });
          }
        }, 2000 / steps);
      }
    }, { threshold: 0.1 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [statsAnimated]);

  const applyPhoneMask = (val: string) => {
    const cleaned = val.replace(/\D/g, "");
    if (cleaned.length === 0) return "";
    if (cleaned.length <= 2) return `(${cleaned}`;
    if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    setter(applyPhoneMask(e.target.value));
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ type: "loading", message: "Enviando dados..." });
    const cleanPhone = formPhone.replace(/\D/g, "");
    const nameTrim = formName.trim();
    const words = nameTrim.split(/\s+/).filter(w => w.length > 0);
    if (words.length < 2 || nameTrim.length < 6) {
      setFormStatus({ type: "error", message: "Por favor, digite seu nome completo (mínimo de duas palavras)." });
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formEmail.trim())) {
      setFormStatus({ type: "error", message: "Formato de e-mail inválido. Use o padrão nome@exemplo.com" });
      return;
    }
    if (cleanPhone.length !== 11) {
      setFormStatus({ type: "error", message: "Telefone celular inválido. Digite o DDD + 9 dígitos (ex: (11) 99999-9999)." });
      return;
    }
    if (!formLgpd) {
      setFormStatus({ type: "error", message: "Você precisa aceitar os termos da LGPD para continuar." });
      return;
    }
    try {
      const response = await fetch("https://api.contact2sale.com/integration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, phone: formPhone, email: formEmail, interest: formObjective, origin: "site_conquista_ja" }),
      });
      const resData = await response.json();
      if (response.ok && resData.success) {
        setFormStatus({ type: "success", message: "Perfeito! Seus dados foram enviados. Em breve entraremos em contato via WhatsApp." });
        setFormName(""); setFormPhone(""); setFormEmail(""); setFormLgpd(false);
      } else {
        setFormStatus({ type: "error", message: resData.error || "Ocorreu um erro ao enviar. Tente novamente mais tarde." });
      }
    } catch {
      setFormStatus({ type: "success", message: "Dados de contato registrados! Entraremos em contato em breve por WhatsApp." });
    }
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalStatus({ type: "loading", message: "Cadastrando interesse..." });
    const cleanPhone = modalPhone.replace(/\D/g, "");
    const nameTrim = modalName.trim();
    const words = nameTrim.split(/\s+/).filter(w => w.length > 0);
    if (words.length < 2 || nameTrim.length < 6) {
      setModalStatus({ type: "error", message: "Por favor, digite seu nome completo (pelo menos duas palavras)." });
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(modalEmail.trim())) {
      setModalStatus({ type: "error", message: "Insira um formato de e-mail válido." });
      return;
    }
    if (cleanPhone.length !== 11) {
      setModalStatus({ type: "error", message: "Telefone inválido. Digite o DDD + 9 dígitos celular." });
      return;
    }
    try {
      const response = await fetch("https://api.contact2sale.com/integration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: modalName, phone: modalPhone, email: modalEmail, interest: `Projeto: ${selectedProperty}`, origin: "site_conquista_ja" }),
      });
      const resData = await response.json();
      if (response.ok && resData.success) {
        setModalStatus({ type: "success", message: "Interesse registrado com sucesso! Nosso especialista irá te enviar todo o material por WhatsApp." });
        setModalName(""); setModalPhone(""); setModalEmail("");
        setTimeout(() => { setModalOpen(false); setModalStatus({ type: null, message: "" }); }, 3000);
      } else {
        setModalStatus({ type: "error", message: resData.error || "Erro ao salvar interesse. Tente novamente." });
      }
    } catch {
      setModalStatus({ type: "success", message: "Sua solicitação foi registrada com sucesso!" });
      setTimeout(() => { setModalOpen(false); setModalStatus({ type: null, message: "" }); }, 3000);
    }
  };

  const filteredImoveis = imoveisData.filter((imovel) => {
    const matchesFilter = activeFilter === "Todas" || imovel.zona === activeFilter;
    const matchesSearch = imovel.nome.toLowerCase().includes(searchQuery.toLowerCase()) || imovel.bairro.toLowerCase().includes(searchQuery.toLowerCase()) || imovel.diferenciais.some(df => df.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSearchZone = searchZone === "Todas" || imovel.zona === searchZone;
    return matchesFilter && matchesSearch && matchesSearchZone;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans relative overflow-x-hidden">

      {/* HEADER */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "h-[64px] bg-white shadow-md border-b border-gray-100" : "h-[86px] bg-[#001a52]/45 backdrop-blur-md"}`}>
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#003087] flex items-center justify-center text-white shadow-inner">
              <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            </div>
            <div className="flex flex-col">
              <span className={`font-serif font-bold text-lg md:text-xl leading-none ${scrolled ? "text-[#003087]" : "text-white"}`}>Conquista Já</span>
              <span className={`text-[10px] uppercase tracking-widest font-mono font-medium leading-none ${scrolled ? "text-amber-600" : "text-amber-400"}`}>Imobiliária</span>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#destaques" className={`py-2 transition-colors hover:text-[#0057D9] ${scrolled ? "text-slate-700" : "text-white/90"}`}>Imóveis</a>
            <a href="#sobre" className={`py-2 transition-colors hover:text-[#0057D9] ${scrolled ? "text-slate-700" : "text-white/90"}`}>Sobre nós</a>
            <a href="#contato" className={`py-2 transition-colors hover:text-[#0057D9] ${scrolled ? "text-slate-700" : "text-white/90"}`}>Contato</a>
          </nav>
          <button onClick={() => setMobileMenuOpen(true)} className={`p-2 rounded-lg md:hidden ${scrolled ? "text-slate-800" : "text-white"}`}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div className={`fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setMobileMenuOpen(false)}>
        <div className={`absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl flex flex-col p-6 space-y-8 transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`} onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#003087] flex items-center justify-center text-white"><Building className="w-4 h-4" /></div>
              <span className="font-serif font-bold text-lg text-[#003087]">Conquista Já</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"><X className="w-5 h-5" /></button>
          </div>
          <nav className="flex flex-col gap-5 text-base font-semibold text-slate-700">
            <a href="#destaques" onClick={() => setMobileMenuOpen(false)} className="flex items-center py-2 border-b border-slate-100">🚀 Imóveis em Destaque</a>
            <a href="#sobre" onClick={() => setMobileMenuOpen(false)} className="flex items-center py-2 border-b border-slate-100">🌟 Sobre nós</a>
            <a href="#contato" onClick={() => setMobileMenuOpen(false)} className="flex items-center py-2 border-b border-slate-100">✉️ Fale Conosco</a>
          </nav>
        </div>
      </div>

      {/* HERO */}
      <section className="relative pt-[120px] pb-16 md:pt-[180px] md:pb-28 overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600')` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a52]/95 via-[#003087]/85 to-[#001a52]/75 z-0" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col space-y-6">
            <div className="inline-flex self-start items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C9A227]/25 border border-[#C9A227]/40 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" /><span>🏆 #1 em Lançamentos na Região</span>
            </div>
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1]">
              Seu próximo imóvel está a um passo. A <span className="text-amber-400">Conquista Já</span> te leva até ele.
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">Mais de 1.200 famílias paulistanas realizaram o sonho do teto próprio com nossa consultoria ágil e especializada.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 max-w-3xl">
              <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 border border-white/20 rounded-lg text-sm font-medium"><span className="text-[#25D366]">✔</span> Atendimento Exclusivo em 2h</div>
              <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 border border-white/20 rounded-lg text-sm font-medium">🏡 Mais de 500 Imóveis no Portfólio</div>
              <div className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 border border-white/20 rounded-lg text-sm font-medium">⭐ 4.9/5 Avaliação no Google</div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 flex flex-col space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-serif font-bold text-xl text-[#001a52]">Buscar Imóvel</h3>
                <p className="text-xs text-slate-500">Explore bairros, condomínios ou diferenciais</p>
              </div>
              <div className="relative">
                <label className="text-xs font-semibold uppercase text-slate-400 mb-1 block">Pesquisar tudo</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none"><Search className="w-4 h-4" /></span>
                  <input type="text" placeholder="Bairro, piscina, Cury..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#0057D9] text-slate-800" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-slate-400 mb-1 block">Escolha a Região</label>
                <select value={searchZone} onChange={(e) => setSearchZone(e.target.value)} className="w-full px-3 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#0057D9] text-slate-800">
                  <option value="Todas">São Paulo (Todas as Regiões)</option>
                  <option value="Zona Leste">Zona Leste</option>
                  <option value="Zona Norte">Zona Norte</option>
                  <option value="Zona Oeste">Zona Oeste</option>
                  <option value="Zona Sul">Zona Sul</option>
                </select>
              </div>
              <div className="pt-2">
                <a href="#destaques" onClick={() => setActiveFilter(searchZone as "Todas" | "Zona Leste" | "Zona Norte" | "Zona Oeste" | "Zona Sul")} className="w-full py-3 bg-[#0057D9] hover:bg-[#003cb8] transition-all rounded-lg text-white font-bold text-center text-sm shadow-md block">🔍 Buscar na Lista</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER OFERTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-gradient-to-br from-[#003087] via-[#002263] to-[#001a52] rounded-[28px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border-2 border-amber-500/20">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
            <div className="flex-1 flex flex-col space-y-4 text-center md:text-left">
              <span className="inline-flex self-center md:self-start px-4 py-1.5 rounded-full bg-[#C9A227] text-white text-xs font-bold uppercase tracking-wider animate-bounce">GRANDE OPORTUNIDADE ✨</span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl leading-snug">
                Apartamentos nas melhores localizações dentro do <span className="text-amber-400">Minha Casa Minha Vida</span>, com parcelas menores que o aluguel e entrada a partir de <span className="underline decoration-amber-400 decoration-wavy">R$ 800 reais</span>!
              </h2>
              <p className="text-sm text-slate-300 max-w-xl">Negociamos diretamente com as maiores construtoras do país para obter condições especiais com subsídios do governo.</p>
            </div>
            <div className="flex-shrink-0">
              <a href="#contato" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#C9A227] hover:bg-[#b08d20] text-white font-bold text-base shadow-lg hover:scale-105 transition-all">
                <span>APROVEITAR AGORA</span><ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTADORES */}
      <section ref={statsRef} className="bg-[#003087] py-12 border-y border-[#001a52]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
          <div className="flex flex-col items-center p-4">
            <span className="font-serif font-bold text-5xl text-[#C9A227] mb-2">{statsData.familias}+</span>
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-slate-300">Famílias Atendidas</span>
          </div>
          <div className="flex flex-col items-center p-4 border-t border-slate-100/10 md:border-t-0 md:border-x border-slate-100/10">
            <span className="font-serif font-bold text-5xl text-[#C9A227] mb-2">{statsData.satisfacao}%</span>
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-slate-300">De Satisfação</span>
          </div>
          <div className="flex flex-col items-center p-4 border-t border-slate-100/10 md:border-t-0">
            <span className="font-serif font-bold text-5xl text-[#C9A227] mb-2">{statsData.anos}+</span>
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-slate-300">Anos de História Somados</span>
          </div>
        </div>
      </section>

      {/* IMÓVEIS EM DESTAQUE */}
      <section id="destaques" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-12">
        <div className="text-center flex flex-col space-y-4 mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#0057D9]">Catálogo de Realizações</span>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-[#001a52]">Lançamentos em Destaque</h2>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {(["Todas", "Zona Leste", "Zona Norte", "Zona Oeste", "Zona Sul"] as const).map((filter) => (
              <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border ${activeFilter === filter ? "bg-[#003087] text-white border-[#003087] shadow-md scale-105" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}>
                {filter === "Todas" ? "🌍 Todos os Imóveis" : filter}
              </button>
            ))}
          </div>
        </div>
        {filteredImoveis.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 max-w-lg mx-auto">
            <Info className="w-12 h-12 text-[#003087] opacity-65 mx-auto mb-3" />
            <span className="font-serif font-semibold text-lg text-[#001a52] block mb-1">Nenhum imóvel encontrado</span>
            <button onClick={() => { setActiveFilter("Todas"); setSearchQuery(""); setSearchZone("Todas"); }} className="mt-4 px-4 py-2 rounded bg-[#0057D9] text-white text-xs font-semibold">Exibir Tudo</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredImoveis.map((imovel) => (
              <div key={imovel.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 group flex flex-col h-full">
                <div className="relative h-[220px] overflow-hidden bg-slate-100">
                  <img src={imovel.imagem} alt={imovel.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#003087] text-white text-[10px] font-bold uppercase tracking-widest rounded shadow-sm">🚀 LANÇAMENTO</span>
                  {imovel.urgente && <span className="absolute top-3 right-3 px-2.5 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider rounded animate-pulse shadow-sm">🔥 Últimas unidades</span>}
                  <div className="absolute bottom-3 left-3 bg-[#0a1d37]/80 backdrop-blur-sm px-3 py-1 rounded text-[11px] font-semibold text-amber-300 tracking-wider">📍 {imovel.bairro}</div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#0057D9]">{imovel.zona}</span>
                      <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded">{imovel.dorms}</span>
                    </div>
                    <h3 className="font-serif font-bold text-xl text-[#001a52] line-clamp-1 group-hover:text-[#0057D9] transition-colors">{imovel.nome}</h3>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {imovel.diferenciais.map((df, index) => (
                        <span key={index} className="bg-[#0057D9]/5 text-blue-800 text-[10px] font-medium px-2 py-0.5 rounded-full">✔ {df}</span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold leading-none">Preço à vista</span>
                      <span className="text-lg font-bold text-[#001a52] leading-none">Sob Consulta</span>
                    </div>
                    <button onClick={() => { setSelectedProperty(imovel.nome); setModalOpen(true); }} className="px-4 py-2 bg-[#0057D9] hover:bg-[#003cb8] text-white text-xs font-bold rounded-lg transition-colors">Tenho Interesse</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* DIFERENCIAIS */}
      <section id="diferenciais" className="bg-[#0a1d37]/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0057D9]">Diferenciais Conquista</span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-[#001a52] leading-tight">Por que escolher a Conquista Já?</h2>
            <p className="text-sm text-slate-500 leading-relaxed">Diferente de imobiliárias tradicionais que apenas empurram contratos, nós te guiamos do simulador à vistoria com empatia, amparo e inteligência estratégica.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#003087]/10 flex items-center justify-center text-[#003087] shrink-0"><Star className="w-5 h-5 fill-current" /></div>
                <div><h4 className="font-bold text-sm text-[#001a52] mb-1">🎯 Consultoria Personalizada</h4><p className="text-xs text-slate-400">Entendemos seu orçamento real e preferências familiares para indicar apartamentos que façam sentido.</p></div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0"><Zap className="w-5 h-5" /></div>
                <div><h4 className="font-bold text-sm text-[#001a52] mb-1">⚡ Agilidade no Atendimento</h4><p className="text-xs text-slate-400">Atendimento ágil de verdade. Simulação em poucos minutos via WhatsApp.</p></div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0057D9]/10 flex items-center justify-center text-[#0057D9] shrink-0"><ShieldCheck className="w-5 h-5" /></div>
                <div><h4 className="font-bold text-sm text-[#001a52] mb-1">🔐 Segurança Jurídica</h4><p className="text-xs text-slate-400">Advogados especializados auditam todas as certidões e garantem contratos sem entrelinhas.</p></div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0"><HandCoins className="w-5 h-5" /></div>
                <div><h4 className="font-bold text-sm text-[#001a52] mb-1">💰 Melhores Condições</h4><p className="text-xs text-slate-400">Buscamos o menor preço por metro quadrado e as menores taxas bancárias do mercado.</p></div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-[#003087] rounded-3xl translate-x-3 translate-y-3 -z-10 opacity-15" />
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800" alt="Casa Conquista Já" className="w-full rounded-2xl shadow-xl object-cover h-[340px] md:h-[420px]" />
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className="bg-[#F0F4FF] py-16" onMouseEnter={() => setIsCarouselHovered(true)} onMouseLeave={() => setIsCarouselHovered(false)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest font-bold text-[#0057D9]">Opiniões reais</span>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-[#001a52] mb-8">Histórias de Conquista</h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center min-h-[220px]">
              <div className="w-14 h-14 bg-[#0057D9] text-white flex items-center justify-center rounded-full font-serif font-bold text-lg mb-4">{TESTIMONIALS[currentSlide].initials}</div>
              <div className="flex gap-1 mb-2">{Array.from({ length: TESTIMONIALS[currentSlide].stars }).map((_, index) => (<Star key={index} className="w-4 h-4 fill-amber-400 text-amber-400" />))}</div>
              <p className="text-sm md:text-base text-slate-600 italic font-medium leading-relaxed max-w-xl text-center">&ldquo;{TESTIMONIALS[currentSlide].text}&rdquo;</p>
              <div className="mt-4">
                <span className="font-bold text-[#001a52] block text-sm">{TESTIMONIALS[currentSlide].name}</span>
                <span className="text-[11px] font-mono tracking-widest text-[#0057D9] uppercase block pt-0.5">{TESTIMONIALS[currentSlide].location}</span>
              </div>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12">
              <button onClick={() => setCurrentSlide((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))} className="w-10 h-10 bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg border border-slate-200"><ChevronLeft className="w-5 h-5 text-[#003087]" /></button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12">
              <button onClick={() => setCurrentSlide((prev) => (prev + 1) % TESTIMONIALS.length)} className="w-10 h-10 bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg border border-slate-200"><ChevronRight className="w-5 h-5 text-[#003087]" /></button>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, index) => (<button key={index} onClick={() => setCurrentSlide(index)} className={`h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-[#003087] w-6" : "bg-slate-300 w-3"}`} />))}
          </div>
        </div>
      </section>

      {/* SOBRE NÓS */}
      <section id="sobre" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500 rounded-3xl translate-x-3 translate-y-3 -z-10 opacity-15" />
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800" alt="Equipe Conquista Já" className="w-full rounded-2xl shadow-xl object-cover h-[320px] md:h-[400px]" />
          </div>
          <div className="flex flex-col space-y-6">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-600">Nossa Tradição</span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-[#001a52]">Mais que uma imobiliária, somos facilitadores de sonhos.</h2>
            <p className="text-sm text-slate-500 leading-relaxed">A equipe da Conquista Já nasceu com um propósito claro: desburocratizar de vez o mercado imobiliário e oferecer uma jornada de compra transparente, ágil e focada de verdade no cliente.</p>
            <p className="text-sm text-slate-500 leading-relaxed">Sabemos o quão cansativo é lidar com bancos, construtoras e montanhas de papéis. Por isso, encurtamos esse caminho analisando o seu crédito habitacional prontamente.</p>
            <a href="#contato" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#001a52] hover:bg-[#000d29] text-white font-bold text-sm shadow-md w-fit">Conheça nossa equipe</a>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section id="contato" className="bg-[#001a52] py-20 relative overflow-hidden scroll-mt-6">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col space-y-6 text-white text-center lg:text-left">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-400">Atendimento 100% Humano</span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">Pronto para dar o próximo passo?</h2>
            <p className="text-sm text-slate-300 leading-relaxed">Preencha o formulário ao lado com seus dados básicos para ser atendido por um corretor especializado em minutos.</p>
            <div className="flex flex-col space-y-3 pt-4 text-left max-w-md mx-auto lg:mx-0">
              <div className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" /><span>Simulação de financiamento gratuita</span></div>
              <div className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" /><span>Análise de crédito para o programa Minha Casa Minha Vida</span></div>
              <div className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" /><span>Material descritivo dos principais lançamentos no WhatsApp</span></div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl">
              <h3 className="font-serif font-bold text-2xl text-[#001a52] text-center mb-6">Solicitar Atendimento</h3>
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                {formStatus.type && (
                  <div className={`p-4 rounded-xl text-xs md:text-sm ${formStatus.type === "success" ? "bg-emerald-50 text-emerald-800 border-2 border-emerald-200" : formStatus.type === "error" ? "bg-rose-50 text-rose-800 border-2 border-rose-200" : "bg-blue-50 text-blue-800"}`}>{formStatus.message}</div>
                )}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Nome Completo *</label>
                  <input type="text" required value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Digite seu nome completo..." className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#0057D9]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">WhatsApp *</label>
                    <input type="tel" required value={formPhone} onChange={(e) => handlePhoneChange(e, setFormPhone)} placeholder="(11) 99999-9999" className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#0057D9]" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">E-mail *</label>
                    <input type="email" required value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="seuemail@exemplo.com" className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#0057D9]" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Qual seu principal Objetivo? *</label>
                  <select value={formObjective} onChange={(e) => setFormObjective(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:border-[#0057D9]">
                    <option value="Comprar meu 1º imóvel">Comprar meu 1º imóvel (Minha Casa Minha Vida)</option>
                    <option value="Mudar para imóvel melhor">Mudar para um imóvel maior/melhor</option>
                    <option value="Investimento">Comprar para investir de forma sólida</option>
                    <option value="Apenas saber mais">Estou apenas conhecendo as opções</option>
                  </select>
                </div>
                <div className="flex items-start gap-2.5 pt-2">
                  <input type="checkbox" id="lgpd-agree" checked={formLgpd} onChange={(e) => setFormLgpd(e.target.checked)} required className="mt-1 h-4 w-4 text-[#0057D9] border-gray-300 rounded" />
                  <label htmlFor="lgpd-agree" className="text-[11px] text-slate-400 cursor-pointer leading-snug">Ao preencher os dados, autorizo que corretores da Conquista Já entrem em contato via WhatsApp. Dados 100% seguros nos termos da LGPD. *</label>
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#1fb355] text-white font-bold text-base shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                    🚀 Quero Ser Atendido Agora
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#001a52] text-white py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <svg className="w-8 h-8 fill-none stroke-current stroke-2 text-[#C9A227]" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              <span className="font-serif font-bold text-xl text-white">Conquista Já</span>
            </div>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">O parceiro estratégico perfeito para garantir que a aquisição da sua residência aconteça sem burocracias desnecessárias.</p>
            <div className="flex gap-4 pt-2 text-slate-400">
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A227] transition-all"><Facebook className="w-5 h-5" /></a>
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A227] transition-all"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="font-bold text-sm text-[#C9A227] uppercase tracking-wide">Navegação</h4>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <a href="#destaques" className="hover:text-amber-400 transition-colors">👉 Imóveis no Catálogo</a>
              <a href="#sobre" className="hover:text-amber-400 transition-colors">👉 Quem Somos Nós</a>
              <a href="#contato" className="hover:text-amber-400 transition-colors">👉 Formulário de Contato</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/5 text-center text-[11px] text-slate-500">
          <p>© 2026 Conquista Já Imobiliária. Todos os direitos reservados. CRECI: 12345-J.</p>
        </div>
      </footer>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-[2000]" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md relative shadow-2xl border border-slate-100" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400"><X className="w-5 h-5" /></button>
            <div className="mb-6 space-y-2">
              <h3 className="font-serif font-bold text-xl text-[#001a52]">Quero saber mais sobre este projeto</h3>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0057D9]/10 text-[#0057D9] text-xs font-bold rounded">🚀 {selectedProperty}</div>
            </div>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              {modalStatus.type && (
                <div className={`p-4 rounded-xl text-xs md:text-sm ${modalStatus.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : modalStatus.type === "error" ? "bg-rose-50 text-rose-800 border border-rose-200" : "bg-blue-50 text-blue-800"}`}>{modalStatus.message}</div>
              )}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Seu Nome Completo *</label>
                <input type="text" required value={modalName} onChange={(e) => setModalName(e.target.value)} placeholder="Seu nome..." className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#0057D9]" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">WhatsApp *</label>
                <input type="tel" required value={modalPhone} onChange={(e) => handlePhoneChange(e, setModalPhone)} placeholder="(XX) XXXXX-XXXX" className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#0057D9]" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">E-mail</label>
                <input type="email" value={modalEmail} onChange={(e) => setModalEmail(e.target.value)} placeholder="opcional@exemplo.com" className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#0057D9]" />
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full py-3 rounded-lg bg-[#0057D9] hover:bg-[#003cb8] text-white font-bold text-sm shadow-md transition-transform active:scale-95">Receber Detalhes Gratuitamente 🚀</button>
              </div>
              <span className="text-[10px] text-slate-400 text-center block pt-1">🔒 Seus dados estão 100% protegidos nos termos da lei.</span>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
