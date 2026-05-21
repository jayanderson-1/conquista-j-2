'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'motion/react';
import { 
  Home, Menu, X, Search, CheckCircle, MapPin, Bed, Car, Maximize, 
  Target, Zap, Shield, DollarSign, MessageCircle, Instagram, Facebook,
  Building, ChevronLeft, ChevronRight, Heart, Send, Bookmark, Play
} from 'lucide-react';
import Image from 'next/image';

const COLORS = {
  primary: '#003087',
  accent: '#0057D9',
  gold: '#C9A227',
  dark: '#001a52'
};

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModalProperty, setActiveModalProperty] = useState<any | null>(null);
  const [selectedRegion, setSelectedRegion] = useState('');
  
  // Handle Scroll for Header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#0057D9] selection:text-white">
      {/* HEADER */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-4' : 'bg-white/95 backdrop-blur-sm py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#003087]">
            <Home className="w-8 h-8 flex-shrink-0" />
            <span className="font-playfair font-bold text-2xl whitespace-nowrap">Conquista Já</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#imoveis" className="text-sm font-medium hover:text-[#0057D9] transition-colors relative group">
              Imóveis
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0057D9] transition-all group-hover:w-full"></span>
            </a>
            <a href="#sobre" className="text-sm font-medium hover:text-[#0057D9] transition-colors relative group">
              Sobre nós
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0057D9] transition-all group-hover:w-full"></span>
            </a>
            <a href="#contato" className="text-sm font-medium hover:text-[#0057D9] transition-colors relative group">
              Contato
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0057D9] transition-all group-hover:w-full"></span>
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[#003087]"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-2xl flex flex-col p-6 md:hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-playfair font-bold text-xl text-[#003087]">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                <a href="#imoveis" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium border-b pb-2">Imóveis</a>
                <a href="#sobre" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium border-b pb-2">Sobre nós</a>
                <a href="#contato" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium border-b pb-2">Contato</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="pt-[100px]">
        {/* HERO SECTION */}
        <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden shrink-0">
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600" 
              alt="Luxury Real Estate" 
              fill
              className="object-cover object-center"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#001a52]/90 to-[#003087]/70" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 bg-[#C9A227]/20 border border-[#C9A227]/50 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                🏆 #1 em Lançamentos na Região
              </div>
              
              <h1 className="font-playfair text-4xl md:text-6xl text-white font-bold leading-tight mb-6">
                Seu próximo imóvel está a um passo. A Conquista Já te leva até ele.
              </h1>
              
              <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl font-light">
                Mais de 1.200 famílias realizaram o sonho da casa própria com nossa equipe. A sua história começa aqui.
              </p>

              {/* Search Bar */}
              <div className="bg-white p-3 rounded-2xl flex flex-col md:flex-row gap-3 shadow-2xl max-w-4xl">
                <input 
                  type="text" 
                  placeholder="Cidade, bairro ou referência..." 
                  className="flex-1 bg-slate-50 px-4 py-3 rounded-xl outline-none border border-transparent focus:border-[#0057D9] transition-colors"
                />
                <select 
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="bg-slate-50 px-4 py-3 rounded-xl outline-none border border-transparent focus:border-[#0057D9] text-gray-700 min-w-[150px]"
                >
                  <option value="">Região (Todas)</option>
                  <option value="Zona Leste">Zona Leste</option>
                  <option value="Zona Norte">Zona Norte</option>
                  <option value="Zona Oeste">Zona Oeste</option>
                  <option value="Zona Sul">Zona Sul</option>
                </select>
                <a href="#imoveis" className="bg-[#0057D9] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#0046b3] transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                  <Search className="w-5 h-5" />
                  Buscar
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SOCIAL PROOF / COUNTERS */}
        <section className="bg-[#003087] py-16 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/20">
              <CounterItem value={1247} label="Famílias Atendidas" suffix="+" />
              <CounterItem value={98} label="De Satisfação" suffix="%" />
              <CounterItem value={60} label="Anos de História" prefix="Mais de " suffix="+" />
            </div>
          </div>
        </section>

        {/* HIGHLIGHT MINHA CASA MINHA VIDA */}
        <section className="py-12 bg-white border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-[#003087] to-[#001a52] rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden text-white flex flex-col md:flex-row items-center gap-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0057D9]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#C9A227]/10 rounded-full blur-2xl" />
              
              <div className="flex-1 text-center md:text-left z-10">
                <span className="bg-[#C9A227] text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm animate-pulse">
                  Grande Oportunidade ✨
                </span>
                <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                  Apartamentos dentro das condições <span className="text-[#C9A227]">Minha Casa Minha Vida</span>, e entrada a partir de <span className="underline decoration-[#C9A227] decoration-2">800 reais</span>!
                </h3>
                <p className="text-slate-200 text-base md:text-lg font-light leading-relaxed">
                  Você consegue realizar o sonho da casa própria com a entrada a partir de 800 reais de entrada.
                </p>
              </div>
              
              <div className="flex-shrink-0 z-10">
                <a 
                  href="#contato" 
                  className="bg-[#C9A227] hover:bg-[#b08b1a] text-[#001a52] font-extrabold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 cursor-pointer text-base uppercase tracking-wider"
                >
                  <span>Aproveitar Agora</span>
                  <span className="text-lg">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* DESTAAQUES / IMÓVEIS */}
        <section id="imoveis" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl text-[#001a52] font-bold mb-4">
                Imóveis em Destaque
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Uma curadoria exclusiva com as melhores opções da região, selecionadas para você.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROPERTIES.filter(p => !selectedRegion || p.region === selectedRegion).length > 0 ? (
                PROPERTIES.filter(p => !selectedRegion || p.region === selectedRegion).map((prop, idx) => (
                  <PropertyCard 
                    key={idx} 
                    property={prop} 
                    onInterest={() => setActiveModalProperty(prop)} 
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-slate-500">
                  <Search className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                  <p>Nenhum lançamento encontrado para a região de {selectedRegion}.</p>
                </div>
              )}
            </div>

            <div className="mt-16 text-center">
              <button className="border-2 border-[#0057D9] text-[#0057D9] px-8 py-3 rounded-full font-medium hover:bg-[#0057D9] hover:text-white transition-all">
                Ver Todos os Imóveis
              </button>
            </div>
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-playfair text-3xl md:text-4xl text-[#001a52] font-bold mb-6">
                  Por que escolher a Conquista Já?
                </h2>
                <p className="text-slate-600 mb-10 text-lg">
                  Nosso compromisso vai além de encontrar um imóvel. Cuidamos de cada detalhe para que sua experiência seja segura, ágil e livre de preocupações.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex gap-4">
                    <div className="bg-[#003087]/10 p-3 rounded-xl h-fit text-[#003087]">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#001a52] mb-1">Consultoria Personalizada</h4>
                      <p className="text-sm text-slate-500">Entendemos seu perfil exato antes de oferecer opções.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-[#003087]/10 p-3 rounded-xl h-fit text-[#003087]">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#001a52] mb-1">Agilidade no Atendimento</h4>
                      <p className="text-sm text-slate-500">Respostas rápidas e processos otimizados para fechar negócio.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-[#003087]/10 p-3 rounded-xl h-fit text-[#003087]">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#001a52] mb-1">Segurança Jurídica</h4>
                      <p className="text-sm text-slate-500">Documentação verificada e suporte legal do inÃ­cio ao fim.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-[#003087]/10 p-3 rounded-xl h-fit text-[#003087]">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#001a52] mb-1">Melhores Condições</h4>
                      <p className="text-sm text-slate-500">Negociação forte para garantir o melhor custo-benefício.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-[#003087]/20">
                <Image 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800" 
                  alt="Diferenciais Conquista Já" 
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="py-24 bg-[#F0F4FF] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl text-[#001a52] font-bold mb-4">
                Histórias de Conquista
              </h2>
            </div>
            
            <TestimonialCarousel />
            <InstagramReels />
          </div>
        </section>

        {/* SOBRE */}
        <section id="sobre" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex flex-col-reverse lg:flex-row gap-16 items-center">
               <div className="w-full lg:w-[60%]">
                 <h2 className="font-playfair text-3xl md:text-4xl text-[#001a52] font-bold mb-6">
                    Mais que uma imobiliária, somos facilitadores de sonhos
                 </h2>
                 <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                   A equipe <strong>Conquista Já</strong> nasceu com um propósito claro: desburocratizar o mercado imobiliário e oferecer uma jornada de compra transparente, ágil e focada 100% no bem-estar do cliente.
                 </p>
                 <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                   Trabalhamos incansavelmente para conectar famílias aos lares perfeitos, sempre com ética, profundo conhecimento do mercado local e parcerias com as melhores construtoras da região.
                 </p>
                 <a href="#contato" className="inline-block bg-[#001a52] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#003087] transition-colors">
                   Conheça nossa equipe
                 </a>
               </div>
               <div className="w-full lg:w-[40%]">
                 <div className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                   <Image 
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800" 
                      alt="Equipe reunida" 
                      fill
                      className="object-cover"
                      unoptimized
                   />
                 </div>
               </div>
             </div>
          </div>
        </section>

        {/* LEAD CAPTURE FORM SECTION */}
        <section id="contato" className="py-24 bg-gradient-to-br from-[#003087] to-[#001a52] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
                Pronto para dar o próximo passo?
              </h2>
              <p className="text-blue-200 text-lg">
                Preencha os dados abaixo e o corretor ideal para o seu perfil entrará em contato em instantes.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-slate-800">
              <LeadForm origin="Site - Formulário Principal" />
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#001a52] text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 text-white mb-6 justify-center">
            <Home className="w-8 h-8" />
            <span className="font-playfair font-bold text-2xl">Conquista Já</span>
          </div>
          <p className="text-blue-200 max-w-md mx-auto mb-8">
            Sua parceira de confiança para realizar o sonho do imóvel próprio com segurança e agilidade.
          </p>
          <div className="flex gap-4 mb-8 justify-center">
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#C9A227] transition-colors text-white">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#C9A227] transition-colors text-white">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
          
          <div className="border-t border-white/10 w-full pt-8 text-center text-blue-300 text-sm">
            &copy; {new Date().getFullYear()} Conquista Já Imobiliária. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <motion.a
        href="https://wa.me/5511965707049?text=Ol%C3%A1%2C%20queria%20obter%20mais%20informa%C3%A7%C3%B5es"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3, type: 'spring' }}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 bg-white text-slate-800 text-sm py-2 px-4 rounded-xl font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Fale com um corretor
        </span>
      </motion.a>

      {/* PROPERTY MODAL */}
      <AnimatePresence>
        {activeModalProperty && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProperty(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto flex flex-col no-scrollbar mx-auto"
            >
              <button 
                onClick={() => setActiveModalProperty(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* HERO BANNER */}
              <div className="relative w-full h-[250px] md:h-[350px] shrink-0">
                <Image src={activeModalProperty.image} fill className="object-cover" alt={activeModalProperty.title} unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-10 right-6 z-10 flex flex-col items-start text-left">
                  <span className="bg-[#cc2229] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3 shadow-lg">
                    {activeModalProperty.tag || 'Lançamento'}
                  </span>
                  <h3 className="font-playfair text-3xl md:text-5xl text-white font-bold mb-2">{activeModalProperty.title}</h3>
                  <p className="flex items-center gap-1.5 text-slate-200 text-sm font-medium">
                    <MapPin className="w-4 h-4 text-[#25D366]" /> {activeModalProperty.location}
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-10 shrink-0">
                {/* DORMITORIOS / VAGAS BAR */}
                <div className="flex justify-center divide-x divide-slate-200 mb-10 border-b border-slate-200 pb-8">
                   <div className="px-8 flex flex-col items-center">
                     <span className="text-2xl font-bold text-[#001a52]">{activeModalProperty.beds}</span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Dormitórios</span>
                   </div>
                   <div className="px-8 flex flex-col items-center">
                     <span className="text-2xl font-bold text-[#001a52]">{activeModalProperty.cars}</span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Vagas Garagem</span>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                   {/* COLUMN 1: SOBRE, LOCALIZACAO, INSTAGRAM */}
                   <div className="space-y-10">
                      <div>
                         <h4 className="font-bold text-[#001a52] text-xl mb-4 border-b border-slate-100 pb-2">Sobre o Imóvel</h4>
                         <p className="text-sm text-slate-600 leading-relaxed">
                           {activeModalProperty.description}
                         </p>
                      </div>

                      {activeModalProperty.locationDetails && (
                         <div>
                            <h4 className="font-bold text-[#25D366] text-sm flex items-center gap-2 mb-4 uppercase tracking-widest">
                               <MapPin className="w-4 h-4" /> Localização Estratégica
                            </h4>
                            <ul className="space-y-3">
                              {activeModalProperty.locationDetails.map((loc: string, i: number) => (
                                <li key={i} className="text-sm text-slate-500 flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                                  <span className="leading-tight">{loc}</span>
                                </li>
                              ))}
                            </ul>
                         </div>
                      )}

                      <div>
                         <div className="flex items-center gap-2 mb-4">
                            <MessageCircle className="w-4 h-4 text-[#C9A227]" />
                            <h4 className="font-bold text-[#001a52] text-sm uppercase tracking-widest text-[#C9A227]">Depoimento de Cliente</h4>
                         </div>
                         <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm max-w-[340px] mx-auto md:mx-0">
                            <div className="p-3 flex items-center justify-between border-b border-slate-100 hidden">
                               <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden relative border border-slate-200">
                                     <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" fill className="object-cover" alt="User Avatar" unoptimized />
                                  </div>
                                  <div className="leading-tight">
                                     <div className="text-xs font-bold text-slate-800 flex items-center gap-1">gerentebaracela <CheckCircle className="w-3 h-3 text-blue-500 fill-current" /></div>
                                     <div className="text-[10px] text-slate-500">Depoimento de Cliente</div>
                                  </div>
                               </div>
                               <a href="https://www.instagram.com/gerentebaracela/" target="_blank" rel="noopener noreferrer" className="bg-[#0095f6] text-white text-[10px] font-bold px-4 py-1.5 rounded-md hover:bg-[#1877F2] transition-colors inline-block text-center">Ver perfil</a>
                            </div>

                            {/* Insta Image/Video */}
                            <div className="relative aspect-[4/5] bg-black group flex items-center justify-center overflow-hidden">
                               {activeModalProperty.testimonialReelId ? (
                                  <iframe
                                     src={`https://www.instagram.com/reel/${activeModalProperty.testimonialReelId}/embed`}
                                     className="absolute inset-0 w-full h-full border-0"
                                     allowFullScreen
                                     scrolling="no"
                                     allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                  />
                               ) : (
                                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                                     <Image src={activeModalProperty.images?.[0] || activeModalProperty.image} fill className="object-cover opacity-90 transition-transform group-hover:scale-105 duration-500" alt="Insta Post" unoptimized />
                                     <div className="absolute inset-0 bg-black/20" />
                                     <div className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform border border-white/40">
                                        <Play className="w-8 h-8 text-white fill-current ml-1" />
                                     </div>
                                     <div className="absolute bottom-4 left-0 right-0 text-center text-white text-[11px] font-bold drop-shadow-md tracking-wider">
                                        Assistir no Instagram
                                     </div>
                                  </div>
                               )}
                            </div>
                            
                            {/* Insta Footer */}
                            <div className="p-4">
                               <div className="text-xs text-[#003087] font-semibold hover:underline cursor-pointer mb-3 inline-block">Ver mais no Instagram</div>
                               <div className="flex items-center gap-4 text-slate-700 mb-3">
                                  <Heart className="w-6 h-6 hover:text-red-500 cursor-pointer" />
                                  <MessageCircle className="w-6 h-6 hover:text-blue-500 cursor-pointer" />
                                  <Send className="w-6 h-6 hover:text-blue-500 cursor-pointer" />
                                  <Bookmark className="w-6 h-6 ml-auto hover:text-slate-900 cursor-pointer" />
                               </div>
                               <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mt-4 pb-2">Veja a felicidade de quem já conquistou</div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* COLUMN 2: DIFERENCIAIS, VIDEO, GALERIA */}
                   <div className="space-y-10">
                      <div>
                         <h4 className="font-bold text-[#001a52] text-xl mb-4 border-b border-slate-100 pb-2">Diferenciais e Lazer</h4>
                         <div className="flex flex-wrap gap-2">
                            {activeModalProperty.differentials.split('·').map((diff: string, i: number) => (
                               <span key={i} className="text-xs font-semibold text-[#0057D9] bg-blue-50/70 border border-blue-100/50 px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-100 transition-colors">
                                 {['Piscina', 'Fitness', 'Salões', 'Churrasqueira', 'Pet Place'][i % 5] === 'Piscina' && <Zap className="w-3.5 h-3.5" />}
                                 {['Piscina', 'Fitness', 'Salões', 'Churrasqueira', 'Pet Place'][i % 5] === 'Fitness' && <Target className="w-3.5 h-3.5" />}
                                 {['Piscina', 'Fitness', 'Salões', 'Churrasqueira', 'Pet Place'][i % 5] === 'Salões' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>}
                                 {['Piscina', 'Fitness', 'Salões', 'Churrasqueira', 'Pet Place'][i % 5] === 'Churrasqueira' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}
                                 {['Piscina', 'Fitness', 'Salões', 'Churrasqueira', 'Pet Place'][i % 5] === 'Pet Place' && <Zap className="w-3.5 h-3.5" />}
                                 {diff.trim()}
                               </span>
                            ))}
                         </div>
                      </div>

                      {activeModalProperty.video && (
                         <div>
                            <div className="rounded-xl overflow-hidden shadow-md bg-black relative pt-[56.25%] group cursor-pointer border border-slate-200">
                               <iframe 
                                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                                  src={activeModalProperty.video} 
                                  title="YouTube tour" 
                                  frameBorder="0" 
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                  allowFullScreen
                               ></iframe>
                            </div>
                         </div>
                      )}

                      {activeModalProperty.images && activeModalProperty.images.length > 0 && (
                         <div>
                            <h4 className="font-bold text-[#001a52] text-xl mb-4 border-b border-slate-100 pb-2">Galeria de Imagens</h4>
                            <ModalGalleryCarousel images={activeModalProperty.images} />
                         </div>
                      )}
                   </div>
                </div>

                {/* A Região */}
                {activeModalProperty.region && (
                   <div className="mt-16 bg-[#001a52] rounded-[2rem] flex flex-col md:flex-row overflow-hidden shadow-2xl relative">
                      <div className="absolute right-0 top-0 w-64 h-64 bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                      
                      <div className="p-8 md:p-12 md:w-5/12 border-b md:border-b-0 md:border-r border-blue-800/50 flex flex-col justify-center relative z-10">
                         <h4 className="font-playfair text-[#C9A227] text-3xl font-bold mb-2">A Região</h4>
                         <p className="text-xs font-bold text-white uppercase tracking-widest opacity-80">{activeModalProperty.region}</p>
                      </div>
                      <div className="p-8 md:p-12 md:w-7/12 flex items-center relative z-10">
                         <p className="text-sm md:text-base text-blue-50 leading-relaxed font-light">
                           {activeModalProperty.aboutRegion}
                         </p>
                      </div>
                   </div>
                )}

                {/* Formulário Desktop / Final do Modal */}
                <div className="mt-16 bg-slate-50 border border-slate-200 rounded-[2rem] p-8 md:p-12 shadow-sm">
                   <div className="text-center max-w-xl mx-auto mb-10">
                     <h3 className="font-playfair text-[#001a52] text-3xl md:text-4xl font-bold mb-4">Quero saber mais sobre este projeto</h3>
                     <p className="text-sm text-slate-500 leading-relaxed">
                       Preencha seus dados e receba a apresentação completa e condições de pagamento do <strong>{activeModalProperty.title}</strong>.
                     </p>
                   </div>
                   
                   <div className="max-w-2xl mx-auto">
                     <ModalLeadForm propertyName={activeModalProperty.title} onSuccess={() => setTimeout(() => setActiveModalProperty(null), 2500)} />
                     
                     <div className="mt-10 flex items-center gap-4">
                        <hr className="flex-1 border-slate-300" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Ou se preferir</span>
                        <hr className="flex-1 border-slate-300" />
                     </div>
                     
                     <a 
                        href="https://wa.me/5511965707049?text=Ol%C3%A1%2C%20queria%20saber%20mais%20informa%C3%A7%C3%B5es"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold mt-8 hover:bg-[#20bd5a] transition-all flex justify-center items-center gap-2 shadow-lg shadow-[#25D366]/20"
                     >
                        <MessageCircle className="w-6 h-6" /> Falar com Especialista agora (+55 11 96570-7049)
                     </a>
                     <p className="text-[9px] text-center text-slate-400 mt-6 uppercase font-bold tracking-widest leading-relaxed">
                        Não enviamos spam. Seus dados estão 100% protegidos.
                     </p>
                   </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function ModalGalleryCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative aspect-[4/3] md:aspect-video rounded-xl overflow-hidden group bg-slate-100 border border-slate-200">
       <Image src={images[index]} fill className="object-cover" unoptimized alt="Galeria" />
       
       <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            type="button"
            onClick={() => setIndex(i => i === 0 ? images.length - 1 : i - 1)}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            type="button"
            onClick={() => setIndex(i => i === images.length - 1 ? 0 : i + 1)}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
       </div>
       
       <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
          <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
             <span className="text-[10px] font-bold text-white tracking-widest">{index + 1} / {images.length} FOTOS</span>
          </div>
       </div>
    </div>
  );
}

function ModalLeadForm({ propertyName, onSuccess }: { propertyName?: string, onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      origin: propertyName ? `Modal - ${propertyName}` : 'Modal'
    };

    try {
      const resp = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (resp.ok) {
        setSuccess(true);
        if (onSuccess) onSuccess();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl flex items-center gap-4 animate-in fade-in zoom-in duration-300">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h4 className="font-bold text-lg text-green-800">Solicitação Enviada!</h4>
          <p className="text-sm">Um corretor especialista entrará em contato em breve.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <input 
           required 
           name="name" 
           type="text" 
           placeholder="Nome completo" 
           className="bg-white px-4 py-3 rounded-xl outline-none border border-slate-200 focus:border-[#0057D9] transition-colors"
         />
         <input 
           required 
           name="phone" 
           type="tel" 
           placeholder="Seu WhatsApp" 
           className="bg-white px-4 py-3 rounded-xl outline-none border border-slate-200 focus:border-[#0057D9] transition-colors"
         />
       </div>
       <input 
         required 
         name="email" 
         type="email" 
         placeholder="Seu melhor e-mail" 
         className="bg-white px-4 py-3 rounded-xl outline-none border border-slate-200 focus:border-[#0057D9] transition-colors w-full"
       />
       <button 
         type="submit" 
         disabled={loading}
         className="bg-[#0057D9] text-white py-4 rounded-xl font-bold hover:bg-[#0046b3] transition-colors mt-2"
       >
         {loading ? 'Enviando...' : 'Receber Detalhes Gratuitamente 🚀'}
       </button>
       {error && <p className="text-red-500 text-sm italic text-center">Ops! Algo deu errado. Tente pelo WhatsApp.</p>}
    </form>
  );
}

function CounterItem({ value, label, suffix = '', prefix = '' }: { value: number, label: string, suffix?: string, prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = 30; // ms
      const steps = Math.ceil(duration / incrementTime);
      const increment = end / steps;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, incrementTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center px-4 py-8">
      <div className="font-playfair text-4xl md:text-5xl font-bold text-[#C9A227] mb-2">
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm md:text-base font-medium tracking-wide uppercase text-blue-100">
        {label}
      </div>
    </div>
  );
}

function PropertyCard({ property, onInterest }: { property: any, onInterest: () => void }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col border border-slate-100">
      <div className="relative h-56 overflow-hidden">
        <Image 
          src={property.image} 
          alt={property.title} 
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <button onClick={onInterest} className="bg-white text-[#001a52] px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all">
             Ver detalhes
           </button>
        </div>
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase text-white shadow-md ${
             property.tag === 'Lançamento' ? 'bg-[#003087]' : 'bg-[#C9A227]'
          }`}>
            {property.tag}
          </span>
        </div>
        {property.urgent && (
          <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            🔥 Últimas unidades
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-playfair text-xl font-bold text-[#001a52] mb-1 line-clamp-1">{property.title}</h3>
        <p className="flex items-center gap-1 text-slate-500 mb-4 text-sm">
          <MapPin className="w-4 h-4 text-red-500" /> {property.location}
        </p>
        
        <div className="flex items-center justify-between py-4 border-y border-slate-100 mb-4">
          <div className="flex flex-col items-center">
            <Bed className="w-5 h-5 text-[#0057D9] mb-1" />
            <span className="text-sm font-medium text-slate-700">{property.beds} Dorms</span>
          </div>
          <div className="flex flex-col items-center">
            <Car className="w-5 h-5 text-[#0057D9] mb-1" />
            <span className="text-sm font-medium text-slate-700">{property.cars} Vagas</span>
          </div>
          <div className="flex flex-col items-center">
            <Maximize className="w-5 h-5 text-[#0057D9] mb-1" />
            <span className="text-sm font-medium text-slate-700">{property.area}m²</span>
          </div>
        </div>
        
        <div className="text-xs text-slate-500 uppercase tracking-widest mb-6 min-h-[32px] line-clamp-2">
          {property.differentials}
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">A partir de</span>
            <span className="font-bold text-[#0057D9] text-lg">{property.price}</span>
          </div>
          <button onClick={onInterest} className="bg-[#003087] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0057D9] transition-colors">
            Tenho Interesse
          </button>
        </div>
      </div>
    </div>
  );
}

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
    {
      name: "Mariana Silva",
      location: "São Paulo, SP",
      text: "Eu achava que comprar meu apartamento na planta seria uma dor de cabeça, mas a Conquista Já resolveu tudo. Fizeram a simulação, aprovaram meu crédito rápido e a comunicação foi excelente.",
      initials: "MS"
    },
    {
      name: "Roberto Campos",
      location: "Guarulhos, SP",
      text: "A consultoria personalizada fez toda a diferença. Eles entenderam o que eu precisava e não me fizeram perder tempo com imóveis fora do meu orçamento. Experiência fantástica.",
      initials: "RC"
    },
    {
      name: "Aline & Diego",
      location: "Osasco, SP",
      text: "Pegamos as chaves do nosso primeiro imóvel semana passada! A equipe nos apoiou juridicamente do início ao fim, nos sentimos muito seguros. Recomendamos de olhos fechados.",
      initials: "A&D"
    }
  ];

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, testimonials.length]);

  return (
    <div 
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden">
        <motion.div 
          className="flex"
          animate={{ x: `-${index * 100}%` }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-full px-4">
               <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-blue-50 relative">
                 {/* Quote icon */}
                 <div className="absolute top-8 right-8 text-[#003087]/10">
                   <svg width="60" height="45" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                   </svg>
                 </div>

                 <div className="flex items-center gap-4 mb-6">
                   <div className="w-16 h-16 bg-[#0057D9] text-white rounded-full flex items-center justify-center font-bold text-xl font-playfair shadow-md">
                     {t.initials}
                   </div>
                   <div>
                     <h4 className="font-bold text-[#001a52] text-lg">{t.name}</h4>
                     <p className="text-sm text-slate-500">{t.location}</p>
                   </div>
                 </div>
                 
                 <div className="flex gap-1 text-[#C9A227] mb-4">
                   {[1,2,3,4,5].map(star => <span key={star}>★</span>)}
                 </div>
                 
                 <p className="text-lg text-slate-700 italic leading-relaxed relative z-10">
                   &quot;{t.text}&quot;
                 </p>
               </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className="flex justify-center mt-8 gap-3">
        {testimonials.map((_, i) => (
          <button 
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? 'bg-[#0057D9] w-8' : 'bg-blue-200 hover:bg-blue-300'
            }`}
            aria-label={`Go to slide ${i+1}`}
          />
        ))}
      </div>
    </div>
  );
}

function InstagramReels() {
  const [showAll, setShowAll] = useState(false);
  
  const reels = [
    { id: "DYnI9Y1SasK", title: "Sonho Realizado no Novo Mundo Carrão" },
    { id: "DYhWvBnS0Si", title: "Sucesso de Atendimento · Família Feliz" },
    { id: "DYhWLMiSWuG", title: "Entrega de Chaves Emocionante" },
    { id: "DYV0Ok6Srzv", title: "Mais uma Jornada de Conquista Finalizada" },
    { id: "DXu9fX7ifqd", title: "Assinatura de Contrato e Comemoração" },
    { id: "DXzvPZwysEY", title: "Chaves na Mão para nova Família" },
    { id: "DXu9Grqif6j", title: "Momento de Conquista e Gratidão" },
    { id: "DXkTiUnCaeV", title: "Atendimento Diferenciado e Transparente" },
    { id: "DXhnbLlCYyn", title: "Parceria de Sucesso com Nossos Clientes" },
  ];

  const visibleReels = showAll ? reels : reels.slice(0, 3);

  return (
    <div className="mt-20 border-t border-blue-100 pt-16">
      <div className="text-center mb-12">
        <span className="text-[#0057D9] text-sm uppercase tracking-wider font-semibold bg-blue-50 px-4 py-1.5 rounded-full inline-block mb-3">
          Prova Social
        </span>
        <h3 className="font-playfair text-2.5xl md:text-3xl text-[#001a52] font-semibold mb-3">
          Depoimentos de Clientes & Sucessos Recentes
        </h3>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Veja em tempo real o depoimento de famílias que conquistaram o imóvel próprio com o Gerente Baracela e nossa equipe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {visibleReels.map((reel) => (
          <div key={reel.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 p-4 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between">
            <div className="relative aspect-[9/16] w-full bg-slate-50 rounded-2.5xl overflow-hidden">
              <iframe
                src={`https://www.instagram.com/reel/${reel.id}/embed`}
                className="absolute inset-0 w-full h-full border-0 rounded-2.5xl"
                allowFullScreen
                scrolling="no"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-bold text-[#001a52] text-sm line-clamp-1">{reel.title}</p>
              <a
                href={`https://www.instagram.com/reel/${reel.id}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#0057D9] font-medium hover:underline mt-1.5 inline-flex items-center gap-1"
              >
                <span>Assistir no Instagram</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-white text-[#003087] border-2 border-[#003087] hover:bg-[#003087] hover:text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-md active:scale-95 inline-flex items-center gap-2 cursor-pointer"
        >
          <span>{showAll ? "Ver Menos Vídeos" : "Ver Mais Depoimentos"}</span>
          <span>{showAll ? "↑" : "↓"}</span>
        </button>
      </div>
    </div>
  );
}

function LeadForm({ origin, onSuccess }: { origin: string, onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{type: 'success'|'error', msg: string} | null>(null);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      interest: formData.get('interest'),
      origin
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      
      if (json.success) {
        setStatus({ type: 'success', msg: 'Recebemos seu contato! Um corretor falará com você em breve.' });
        (e.target as HTMLFormElement).reset();
        if (onSuccess) onSuccess();
      } else {
        setStatus({ type: 'error', msg: json.error || 'Erro ao enviar. Tente novamente.' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Erro de conexão. Verifique sua internet.' });
    } finally {
      setLoading(false);
    }
  };

  const phoneMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    e.target.value = value;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status && (
        <div className={`p-4 rounded-xl text-sm font-medium ${
          status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status.msg}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nome Completo</label>
          <input required name="name" type="text" placeholder="Ex: João da Silva" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#0057D9] focus:ring-1 focus:ring-[#0057D9] transition-all" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">WhatsApp</label>
          <input required name="phone" type="tel" maxLength={15} onChange={phoneMask} placeholder="(11) 99999-9999" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#0057D9] focus:ring-1 focus:ring-[#0057D9] transition-all" />
        </div>
      </div>
      
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">E-mail</label>
        <input required name="email" type="email" placeholder="seu@email.com" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#0057D9] focus:ring-1 focus:ring-[#0057D9] transition-all" />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Qual o seu objetivo?</label>
        <select required name="interest" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:border-[#0057D9] focus:ring-1 focus:ring-[#0057D9] transition-all text-slate-700">
          <option value="">Selecione uma opção</option>
          <option value="Comprar 1º imóvel">Comprar meu 1º imóvel</option>
          <option value="Fazer um upgrade">Mudar para um imóvel melhor</option>
          <option value="Investimento">Investimento</option>
          <option value="Apenas saber mais">Apenas saber mais / Curiosidade</option>
        </select>
      </div>

      <div className="flex items-start gap-3 mt-4">
        <input required type="checkbox" id="lgpd" className="mt-1 w-4 h-4 text-[#0057D9] rounded border-slate-300 focus:ring-[#0057D9]" />
        <label htmlFor="lgpd" className="text-xs text-slate-500 leading-tight">
          Concordo em receber comunicações da Conquista Já via WhatsApp e E-mail. Seus dados estão seguros.
        </label>
      </div>

      <button disabled={loading} type="submit" className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#20bd5a] transition-all shadow-lg shadow-[#25D366]/30 flex justify-center items-center gap-2 mt-6 disabled:opacity-70">
        {loading ? (
          <div className="w-6 h-6 border-2 border-white rounded-full border-t-transparent animate-spin"/>
        ) : (
          <>
            🚀 Quero Ser Atendido Agora
          </>
        )}
      </button>
    </form>
  );
}

// --- MOCK DATA ---
const PROPERTIES = [
  {
    image: 'https://cury.net/storage/images/products/gallery/69c6bd22e4632.jpeg',
    images: [
      'https://cury.net/storage/images_webp/products/gallery/69c6b90992e1f.jpeg.webp',
      'https://cury.net/storage/images/products/gallery/69c6b912cc6f5.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b9343c503.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b940dbec7.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b94c88745.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b95604b57.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b9633e1e8.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b96d282ba.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b9845ae8b.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b9a481c1e.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b9b0d010e.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b9c1745c3.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b9cbde21a.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b9f69b73d.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6ba1673bd8.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6bd22e4632.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b8f6862ee.jpeg'
    ],
    tag: 'Lançamento',
    urgent: true,
    title: 'Novo Mundo Carrão II',
    testimonialReelId: 'DYnI9Y1SasK',
    location: 'Vila Carrão, Zona Leste - SP',
    region: 'Zona Leste',
    beds: '1 e 2',
    cars: '1',
    area: 'Diversas',
    differentials: 'Pomar · Sauna · Redário · Pet Care · Beach Tênis · Piscina Infantil',
    price: 'Sob Consulta',
    description: 'Apartamentos à venda de 1 e 2 dorms. com opção suíte, terraço e lazer completo. Conheça o Novo Mundo Carrão II com a Cury Construtora!',
    locationDetails: [
      'Perto da BRVET (Medicina Veterinária Diagnóstica)', 
      'Próximo a futura estação Santa Isabel', 
      'Ao lado da estação Carrão - Assaí Atacadista e do Shopping Aricanduva'
    ],
    aboutRegion: 'A Zona Leste de São Paulo é perfeita para quem procura um lugar para viver com qualidade e muitas possibilidades.'
  },
  {
    image: 'https://cury.net/storage/images_webp/products/gallery/69c6b90992e1f.jpeg.webp',
    images: [
      'https://cury.net/storage/images_webp/products/gallery/69c6b90992e1f.jpeg.webp',
      'https://cury.net/storage/images/products/gallery/69c6b912cc6f5.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b9343c503.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b940dbec7.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b94c88745.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b95604b57.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b9633e1e8.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b96d282ba.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b9845ae8b.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b9a481c1e.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b9b0d010e.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b9c1745c3.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b9cbde21a.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b9f69b73d.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6ba1673bd8.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6bd22e4632.jpeg',
      'https://cury.net/storage/images/products/gallery/69c6b8f6862ee.jpeg'
    ],
    video: 'https://www.youtube.com/embed/Y5B4bAsmAu8?autoplay=1&mute=1&playsinline=1',
    tag: 'Lançamento',
    urgent: true,
    title: 'Novo Mundo Carrão',
    testimonialReelId: 'DYhWvBnS0Si',
    location: 'Vila Carrão, Zona Leste - SP',
    region: 'Zona Leste',
    beds: '1 e 2',
    cars: '1',
    area: 'Diversas',
    differentials: 'Rooftop · Piscinas · Beach Tennis · Pet Place · Coworking · Academia',
    price: 'Sob Consulta',
    description: 'Apartamentos à venda de 1 e 2 dorms. com opção de varanda, suíte e vaga. Conheça o Novo Mundo Carrão da Cury Construtora.',
    locationDetails: [
      'Ao lado da Smart FIT',
      'Próximo a Estação Carrão e Shopping Aricanduva',
      'Perto da Futura Estação Santa Isabel e Assaí Atacadista'
    ],
    aboutRegion: 'A Zona Leste de São Paulo é perfeita para quem procura um lugar para viver com qualidade e muitas possibilidades. O local se destaca por ocupar o segundo lugar no ranking de melhor região para morar na cidade de São Paulo. A Zona Leste é contemplada por bairros com altos índices de desenvolvimento, como Mooca, Belém, Tatuapé, Vila Prudente e Água Rasa.'
  },
  {
    image: 'https://cury.net/storage/images/products/gallery/69aec6a1e1c4b.jpeg',
    images: [
      'https://cury.net/storage/images/products/gallery/69aec6a1e1c4b.jpeg',
      'https://cury.net/storage/images/products/gallery/69aec76cb0ca2.jpeg',
      'https://cury.net/storage/images/products/gallery/69aec77556d58.jpeg',
      'https://cury.net/storage/images/products/gallery/69aec77f0d224.jpeg',
      'https://cury.net/storage/images/products/gallery/69aec78fba2af.jpeg',
      'https://cury.net/storage/images/products/gallery/69aec7a7c8a28.jpeg',
      'https://cury.net/storage/images/products/gallery/69aec7b58f4bc.jpeg',
      'https://cury.net/storage/images/products/gallery/69aec7c2df1ec.jpeg',
      'https://cury.net/storage/images/products/gallery/69aec7cd3e57b.jpeg',
      'https://cury.net/storage/images/products/gallery/69aec7d91730e.jpeg',
      'https://cury.net/storage/images/products/gallery/69aec7e3b75eb.jpeg',
      'https://cury.net/storage/images/products/gallery/69aec7f8eb99d.jpeg',
      'https://cury.net/storage/images/products/gallery/69aec80e6c0f7.jpeg',
      'https://cury.net/storage/images/products/gallery/69aec81a3a8d6.jpeg',
      'https://cury.net/storage/images/products/gallery/69aec826516b0.jpeg',
      'https://cury.net/storage/images/products/gallery/69aec8314d2f1.jpeg'
    ],
    video: 'https://www.youtube.com/embed/sBztQBvFZE0?autoplay=1&mute=1&playsinline=1',
    tag: 'Lançamento',
    urgent: true,
    title: 'Lyne Água Branca',
    testimonialReelId: 'DYV0Ok6Srzv',
    location: 'Água Branca - Zona Norte',
    region: 'Zona Norte',
    beds: '2',
    cars: '1',
    area: 'Diversas',
    differentials: 'Redário · Praça do Yoga · Espaço Zen · Praça do Piquenique · Playground · Piscina Infantil',
    price: 'Sob Consulta',
    description: 'Apartamentos à venda de 2 dorms. com opção de suíte, terraço e lazer completo. Conheça o Lyne Água Branca com a Cury Construtora!',
    locationDetails: [
      'Perto da UNIP Marquês e Futura Estação Água Branca (Linha Laranja)',
      'Próximo a Museu da Imaginação e Allianz Parque',
      'Ao lado do SESC Pompeia e Shopping West Plaza'
    ],
    aboutRegion: 'Quem busca imóveis na Zona Norte de São Paulo vai se surpreender com tudo o que a região pode oferecer. Além de excelentes bairros, a localidade também dispõe de facilidade de locomoção, ampla gama de comércios e variedade de lazer.'
  },
  {
    image: 'https://cury.net/storage/images/products/gallery/6986120c801ee.jpeg',
    images: [
      'https://cury.net/storage/images/products/gallery/6986120c801ee.jpeg',
      'https://cury.net/storage/images/products/gallery/69861035186b8.jpeg',
      'https://cury.net/storage/images/products/gallery/6986104f6c378.jpeg',
      'https://cury.net/storage/images/products/gallery/6986107366a6d.jpeg',
      'https://cury.net/storage/images/products/gallery/69861096095d2.jpeg',
      'https://cury.net/storage/images/products/gallery/698610a11e9b8.jpeg',
      'https://cury.net/storage/images/products/gallery/698610ab885fe.jpeg',
      'https://cury.net/storage/images/products/gallery/698610bb82164.jpeg',
      'https://cury.net/storage/images/products/gallery/698610cb046ef.jpeg',
      'https://cury.net/storage/images/products/gallery/698610f036175.jpeg',
      'https://cury.net/storage/images/products/gallery/69861107441aa.jpeg',
      'https://cury.net/storage/images/products/gallery/69861124a1337.jpeg',
      'https://cury.net/storage/images/products/gallery/6986113390e5c.jpeg'
    ],
    video: 'https://www.youtube.com/embed/ofynJG7eQX0?autoplay=1&mute=1&playsinline=1',
    tag: 'Lançamento',
    urgent: false,
    title: 'Marco Freguesia',
    testimonialReelId: 'DYhWLMiSWuG',
    location: 'Freguesia do Ó - Zona Norte',
    region: 'Zona Norte',
    beds: '2',
    cars: '1',
    area: 'Diversas',
    differentials: 'Sala de descanso · Sport Bar · Sauna · Piscina infantil · Praça de Ping Pong · Pet Place',
    price: 'Sob Consulta',
    description: 'Apartamentos à venda de 2 dorms. com opção de terraço e lazer completo. Conheça o Marco Freguesia.',
    locationDetails: [
      'Perto do Hospital Geral Vila Penteado e UPA 21 de Junho',
      'Próximo a futura Estação Freguesia do Ó',
      'Ao lado da Marginal Tietê'
    ],
    aboutRegion: 'Quem busca imóveis na Zona Norte de São Paulo vai se surpreender com tudo o que a região pode oferecer. A Zona Norte está se desenvolvendo anualmente, seu crescimento é rápido e progressivo.'
  },
  {
    image: 'https://cury.net/storage/images_webp/products/gallery/69f215824cbb7.jpeg.webp',
    images: [
      'https://cury.net/storage/images_webp/products/gallery/69f215824cbb7.jpeg.webp',
      'https://cury.net/storage/images/products/gallery/69f2159a91c04.jpeg',
      'https://cury.net/storage/images/products/gallery/69f215db00274.jpeg',
      'https://cury.net/storage/images/products/gallery/69f21614005ae.jpeg',
      'https://cury.net/storage/images/products/gallery/69f21624d8c77.jpeg',
      'https://cury.net/storage/images/products/gallery/69f2163a5b075.jpeg',
      'https://cury.net/storage/images/products/gallery/69f2166556685.jpeg',
      'https://cury.net/storage/images/products/gallery/69f216c88105e.jpeg',
      'https://cury.net/storage/images/products/gallery/69f216dd81fb5.jpeg',
      'https://cury.net/storage/images/products/gallery/69f2170d0d741.jpeg',
      'https://cury.net/storage/images/products/gallery/69f2171cb0f6c.jpeg'
    ],
    video: 'https://www.youtube.com/embed/SDMVoyWwt_s?autoplay=1&mute=1&playsinline=1',
    tag: 'Lançamento',
    urgent: true,
    title: 'Nova Leopoldina - Condomínio Art',
    testimonialReelId: 'DXu9fX7ifqd',
    location: 'Vila Leopoldina - Zona Oeste',
    region: 'Zona Oeste',
    beds: '2',
    cars: '1',
    area: 'Diversas',
    differentials: 'Sport Bar · Piscinas · Churrasqueiras · Fitness · Espaço Beleza · Coworking',
    price: 'Sob Consulta',
    description: 'Apartamentos à venda de 2 dorms com terraço e lazer completo. Conheça o Nova Leopoldina - Condomínio Art com a Cury Construtora!',
    locationDetails: [
      'Perto do CEAGESP',
      'Próximo ao Sesc Leopoldina e Estação CEASA',
      'Fácil acesso a Marginal Tietê e Marginal Pinheiros'
    ],
    aboutRegion: 'A Zona Oeste de São Paulo tem facilidade de locomoção, diversidade de comércios, instituições de ensino, e infinitas opções de lazer e cultura. O estilo de vida com facilidades, qualidade e mobilidade urbana atraem pessoas de todas as idades para morar na Zona Oeste.'
  },
  {
    image: 'https://cury.net/storage/images/products/gallery/69aed8035717d.jpeg',
    images: [
      'https://cury.net/storage/images/products/gallery/69aed8035717d.jpeg',
      'https://cury.net/storage/images/products/gallery/69aed80c5000f.jpeg',
      'https://cury.net/storage/images/products/gallery/69aed8156696c.jpeg',
      'https://cury.net/storage/images/products/gallery/69aed821b5a80.jpeg',
      'https://cury.net/storage/images/products/gallery/69aed8374b4f1.jpeg',
      'https://cury.net/storage/images/products/gallery/69aed843b64e9.jpeg',
      'https://cury.net/storage/images/products/gallery/69aed85997119.jpeg',
      'https://cury.net/storage/images/products/gallery/69aed86684271.jpeg',
      'https://cury.net/storage/images/products/gallery/69aed87456d1c.jpeg',
      'https://cury.net/storage/images/products/gallery/69aed882668b7.jpeg',
      'https://cury.net/storage/images_webp/products/gallery/69aed8954df1e.jpeg.webp',
      'https://cury.net/storage/images/products/gallery/69aed8a187e5c.jpeg',
      'https://cury.net/storage/images/products/gallery/69aed8ad315f8.jpeg',
      'https://cury.net/storage/images/products/gallery/69aed8d9f272f.jpeg',
      'https://cury.net/storage/images/products/gallery/69aed8f82ac70.jpeg'
    ],
    video: 'https://www.youtube.com/embed/Vs8aSkXN070?autoplay=1&mute=1&playsinline=1',
    tag: 'Lançamento',
    urgent: true,
    title: 'Cidade Villa Lobos - Condomínio Tenor',
    testimonialReelId: 'DXzvPZwysEY',
    location: 'Jaguaré - Zona Oeste',
    region: 'Zona Oeste',
    beds: '2',
    cars: '1',
    area: 'Diversas',
    differentials: 'Horta e Pomar · Easy Market · Playground · Fitness externo · Piscina Infantil · Piscina Adulto · Redário · Bicicletário · Praça de Convivência · Apoio Churrasqueira · Praça do Lual · Play Baby · Pet Care · Oficina · Lavanderia · Fitness · Espaço Beleza · Delivery · Churrasqueira · Brinquedoteca',
    price: 'Sob Consulta',
    description: 'Apartamentos à venda de 2 dorms. com opção terraço e lazer completo. Conheça o Cidade Villa Lobos - Condomínio Tenor.',
    locationDetails: [
      'Perto da Estação Villa-Lobos - Jaguaré e Parque Villa-Lobos',
      'Próximo ao Pronto Socorro Municipal da Lapa e ao Hospital Universitário USP',
      'Ao lado do Shopping Villa-Lobos e CEAGESP'
    ],
    aboutRegion: 'A Zona Oeste de São Paulo tem facilidade de locomoção, diversidade de comércios, instituições de ensino, e infinitas opções de lazer e cultura. O estilo de vida com facilidades, qualidade e mobilidade urbana atraem pessoas de todas as idades para morar na Zona Oeste.'
  },
  {
    image: 'https://cury.net/storage/images_webp/products/gallery/69989d393741e.jpeg.webp',
    images: [
      'https://cury.net/storage/images_webp/products/gallery/69989d393741e.jpeg.webp',
      'https://cury.net/storage/images/products/gallery/69989d54817e0.jpeg',
      'https://cury.net/storage/images/products/gallery/69989d6c5c2d9.jpeg',
      'https://cury.net/storage/images/products/gallery/69989d82dea25.jpeg',
      'https://cury.net/storage/images/products/gallery/69989d95f0f38.jpeg',
      'https://cury.net/storage/images/products/gallery/69989db94e8b0.jpeg',
      'https://cury.net/storage/images/products/gallery/69989dd575943.jpeg',
      'https://cury.net/storage/images/products/gallery/69989e175a962.jpeg',
      'https://cury.net/storage/images/products/gallery/69989e30e7fd9.jpeg',
      'https://cury.net/storage/images/products/gallery/69989e92d2ace.jpeg',
      'https://cury.net/storage/images/products/gallery/69989f2fb6c34.jpeg',
      'https://cury.net/storage/images/products/gallery/69989f4d5e4e4.jpeg',
      'https://cury.net/storage/images/products/gallery/69989f5951b7a.jpeg',
      'https://cury.net/storage/images/products/gallery/69989f6db5da2.jpeg',
      'https://cury.net/storage/images/products/gallery/69989f857ea02.jpeg',
      'https://cury.net/storage/images/products/gallery/69989fd45ee26.jpeg',
      'https://cury.net/storage/images/products/gallery/69989fe494b3e.jpeg',
      'https://cury.net/storage/images/products/gallery/69989ff1049ac.jpeg',
      'https://cury.net/storage/images/products/gallery/6998a00602c71.jpeg',
      'https://cury.net/storage/images/products/gallery/6998a02ec25c0.jpeg',
      'https://cury.net/storage/images/products/gallery/6998a03c76ee5.jpeg',
      'https://cury.net/storage/images/products/gallery/6998a04e1095e.jpeg'
    ],
    video: 'https://www.youtube.com/embed/s2OXWt7FyZ8?autoplay=1&mute=1&playsinline=1',
    tag: 'Lançamento',
    urgent: true,
    title: 'Barra Funda 900',
    testimonialReelId: 'DXu9Grqif6j',
    location: 'Barra Funda - Zona Oeste',
    region: 'Zona Oeste',
    beds: '2',
    cars: '1',
    area: 'Diversas',
    differentials: 'Piscinas · Fitness · Salão de Festas · Brinquedoteca · Playground',
    price: 'Sob Consulta',
    description: 'Apartamentos à venda de 2 dorms. com opção terraço e lazer completo. Conheça o Barra Funda 900!',
    locationDetails: [
      'Perto da Estação Marechal Deodoro e Allianz Parque',
      'Próximo a Estação Palmeiras | Barra Funda',
      'Ao lado da Av. Pacaembu e Marginal Tietê'
    ],
    aboutRegion: 'A Zona Oeste de São Paulo tem facilidade de locomoção, diversidade de comércios, instituições de ensino, e infinitas opções de lazer e cultura. O estilo de vida com facilidades, qualidade e mobilidade urbana atraem pessoas de todas as idades para morar na Zona Oeste.'
  },
  {
    image: 'https://cury.net/storage/images/products/gallery/695d31db3d6bb.jpeg',
    images: [
      'https://cury.net/storage/images/products/gallery/695d31db3d6bb.jpeg',
      'https://cury.net/storage/images/products/gallery/695d323e7fa5c.jpeg',
      'https://cury.net/storage/images/products/gallery/695d32505f724.jpeg',
      'https://cury.net/storage/images/products/gallery/695d3262a277a.jpeg',
      'https://cury.net/storage/images/products/gallery/695d32737af12.jpeg',
      'https://cury.net/storage/images/products/gallery/695d328467c1f.jpeg',
      'https://cury.net/storage/images/products/gallery/695d3296f399c.jpeg',
      'https://cury.net/storage/images/products/gallery/695d32a5a1a75.jpeg',
      'https://cury.net/storage/images/products/gallery/695d32baa9378.jpeg',
      'https://cury.net/storage/images_webp/products/gallery/695d32ce08146.jpeg.webp',
      'https://cury.net/storage/images/products/gallery/695d32ddbf08e.jpeg',
      'https://cury.net/storage/images/products/gallery/695d32ef736e7.jpeg',
      'https://cury.net/storage/images/products/gallery/695d3301ef90b.jpeg',
      'https://cury.net/storage/images/products/gallery/695d3315f0fca.jpeg'
    ],
    video: 'https://www.youtube.com/embed/iDAgqDKe9mk?autoplay=1&mute=1&playsinline=1',
    tag: 'Lançamento',
    urgent: true,
    title: 'Mérito Lapa',
    testimonialReelId: 'DXkTiUnCaeV',
    location: 'Lapa - Zona Oeste',
    region: 'Zona Oeste',
    beds: '2',
    cars: '1',
    area: 'Diversas',
    differentials: 'Beach Tennis · Piscinas · Pet Place · Churrasqueiras · Pet Care · Espaço Beleza · Lavanderia · Fitness · Sauna · Oficina · Sala de Games · Coworking · Easy Market · Sport Bar · Brinquedoteca · Salão de Festas',
    price: 'Sob Consulta',
    description: 'Apartamentos à venda de 2 dorms. com opção de terraço e lazer completo. Conheça o Mérito Lapa.',
    locationDetails: [
      'Perto da Estação Domingos de Moraes e Estação Lapa',
      'Próximo ao Museu da Imaginação e Tietê Plaza Shopping',
      'Fácil acesso a Marginal Tietê e Ermano Marchetti'
    ],
    aboutRegion: 'A Zona Oeste de São Paulo tem facilidade de locomoção, diversidade de comércios, instituições de ensino, e infinitas opções de lazer e cultura. O estilo de vida com facilidades, qualidade e mobilidade urbana atraem pessoas de todas as idades para morar na Zona Oeste.'
  },
  {
    image: 'https://cury.net/storage/images/products/gallery/695eb0cc90a00.jpeg',
    images: [
      'https://cury.net/storage/images/products/gallery/695eb0cc90a00.jpeg',
      'https://cury.net/storage/images_webp/products/gallery/695eb0a8473d7.jpeg.webp',
      'https://cury.net/storage/images/products/gallery/695eb0b950c1a.jpeg',
      'https://cury.net/storage/images/products/gallery/695eb0cc90a00.jpeg',
      'https://cury.net/storage/images/products/gallery/695eb0ddbc03d.jpeg',
      'https://cury.net/storage/images/products/gallery/695eb0ef678d6.jpeg',
      'https://cury.net/storage/images/products/gallery/695eb17ade967.jpeg',
      'https://cury.net/storage/images/products/gallery/695eb1882f5fe.jpeg',
      'https://cury.net/storage/images/products/gallery/695eb19c5edd1.jpeg',
      'https://cury.net/storage/images/products/gallery/695eb1ad50058.jpeg',
      'https://cury.net/storage/images/products/gallery/695eb1c2aa4b7.jpeg',
      'https://cury.net/storage/images/products/gallery/695eb1d53189f.jpeg',
      'https://cury.net/storage/images/products/gallery/695eb1e52a6a2.jpeg',
      'https://cury.net/storage/images/products/gallery/695eb1fb06de4.jpeg',
      'https://cury.net/storage/images/products/gallery/695eb20a7700c.jpeg'
    ],
    video: 'https://www.youtube.com/embed/5BOBgmXwY8g?autoplay=1&mute=1&playsinline=1',
    tag: 'Lançamento',
    urgent: true,
    title: 'Supreme Vila Romana',
    testimonialReelId: 'DXhnbLlCYyn',
    location: 'Lapa - Zona Oeste',
    region: 'Zona Oeste',
    beds: '1 e 2',
    cars: '1',
    area: 'Diversas',
    differentials: 'Solário · Espaço Yoga · Piscinas · Churrasqueira · Playground · Beach Tennis · Pet Place · Brinquedoteca · Sport Bar · Salão de Festas · Fitness · Gourmet · Lavanderia · Easy Market',
    price: 'Sob Consulta',
    description: 'Apartamentos à venda de 1 e 2 dorms. com opção de suíte, vaga e lazer completo. Conheça o Supreme Vila Romana com a Cury Construtora!',
    locationDetails: [
      'Ao lado da UNIP Pompéia',
      'Próximo ao Allianz Parque',
      'Perto Bourbon Shopping'
    ],
    aboutRegion: 'A Zona Oeste de São Paulo tem facilidade de locomoção, diversidade de comércios, instituições de ensino, e infinitas opções de lazer e cultura. O estilo de vida com facilidades, qualidade e mobilidade urbana atraem pessoas de todas as idades para morar na Zona Oeste.'
  },
  {
    image: 'https://cury.net/storage/images_webp/products/gallery/690906a60521b.jpeg.webp',
    images: [
      'https://cury.net/storage/images_webp/products/gallery/690906a60521b.jpeg.webp',
      'https://cury.net/storage/images/products/gallery/690900b89f8f4.jpeg',
      'https://cury.net/storage/images/products/gallery/690900d71cea0.jpeg',
      'https://cury.net/storage/images/products/gallery/690900f2c57cf.jpeg',
      'https://cury.net/storage/images/products/gallery/6909010e51779.jpeg',
      'https://cury.net/storage/images/products/gallery/6909012a73bb2.jpeg',
      'https://cury.net/storage/images/products/gallery/6909015d8a98f.jpeg',
      'https://cury.net/storage/images/products/gallery/690901a64d5ba.jpeg',
      'https://cury.net/storage/images/products/gallery/690901d113f4d.jpeg'
    ],
    video: 'https://www.youtube.com/embed/G_timsr_yIs?autoplay=1&mute=1&playsinline=1',
    tag: 'Lançamento',
    urgent: true,
    title: 'Atmosfera Jaguaré',
    testimonialReelId: 'DYhWvBnS0Si',
    location: 'Jaguaré - Zona Oeste',
    region: 'Zona Oeste',
    beds: '1 e 2',
    cars: '1',
    area: 'Diversas',
    differentials: 'Piscinas · Playground · Redário · Pet Place · Churrasqueiras · Sport Bar · Salão de Festas · Brinquedoteca · Espaço Beleza · Lavanderia · Easy Market · Fitness · Coworking',
    price: 'Sob Consulta',
    description: 'Apartamentos à venda de 1 e 2 dorms. com opção de terraço e lazer completo. Conheça o Atmosfera Jaguaré.',
    locationDetails: [
      'Perto da UNIP e USP',
      'Próximo a Estação Villa Lobos - Jaguaré e Parque Villa Lobos',
      'Fácil acesso a Av. Jaguaré e Marginal Pinheiros'
    ],
    aboutRegion: 'A Zona Oeste de São Paulo tem facilidade de locomoção, diversidade de comércios, instituições de ensino, e infinitas opções de lazer e cultura. O estilo de vida com facilidades, qualidade e mobilidade urbana atraem pessoas de todas as idades para morar na Zona Oeste.'
  },
  {
    image: 'https://cury.net/storage/images_webp/products/gallery/68e400e154d72.jpeg.webp',
    images: [
      'https://cury.net/storage/images_webp/products/gallery/68e400e154d72.jpeg.webp',
      'https://cury.net/storage/images/products/gallery/68e4010b74caa.jpeg',
      'https://cury.net/storage/images/products/gallery/68e4012403aa2.jpeg',
      'https://cury.net/storage/images/products/gallery/68e4013903aca.jpeg',
      'https://cury.net/storage/images/products/gallery/68e4014db35d2.jpeg',
      'https://cury.net/storage/images/products/gallery/68e4016e8d587.jpeg',
      'https://cury.net/storage/images/products/gallery/68e4018a83957.jpeg',
      'https://cury.net/storage/images/products/gallery/68e4019e1129c.jpeg',
      'https://cury.net/storage/images/products/gallery/68e401b4daa4b.jpeg',
      'https://cury.net/storage/images/products/gallery/68e401c8bf158.jpeg',
      'https://cury.net/storage/images/products/gallery/68e401ec1c40d.jpeg',
      'https://cury.net/storage/images/products/gallery/68e4022403409.jpeg',
      'https://cury.net/storage/images/products/gallery/68e40240aca31.jpeg'
    ],
    video: 'https://www.youtube.com/embed/uOyO7keNZvM?autoplay=1&mute=1&playsinline=1',
    tag: 'Lançamento',
    urgent: true,
    title: 'Barra Funda 930',
    testimonialReelId: 'DYhWLMiSWuG',
    location: 'Barra Funda - Zona Oeste',
    region: 'Zona Oeste',
    beds: '2',
    cars: '1',
    area: 'Diversas',
    differentials: 'Piscinas · Espaço Games · Redário · Espaço Beleza · Brinquedoteca · Churrasqueira · Lavanderia · Pet Care · Sauna · Fitness · Sport Bar · Easy Market · Salão de Festas',
    price: 'Sob Consulta',
    description: 'Apartamentos à venda de 2 dorms. com opção de vaga, terraço e lazer completo. Conheça o Barra Funda 930.',
    locationDetails: [
      'Perto do Theatro São Pedro e Memorial da América Latina',
      'Próximo a Estação Barra Funda',
      'Ao lado da Av. Pacaembu e Marginal Tietê'
    ],
    aboutRegion: 'A Zona Oeste de São Paulo tem facilidade de locomoção, diversidade de comércios, instituições de ensino, e infinitas opções de lazer e cultura. O estilo de vida com facilidades, qualidade e mobilidade urbana atraem pessoas de todas as idades para morar na Zona Oeste.'
  },
  {
    image: 'https://cury.net/storage/images/products/gallery/685b13da62cca.jpeg',
    images: [
      'https://cury.net/storage/images/products/gallery/685b13da62cca.jpeg',
      'https://cury.net/storage/images/products/gallery/685b13eaca89c.jpeg',
      'https://cury.net/storage/images/products/gallery/685b14107f1cc.jpeg',
      'https://cury.net/storage/images_webp/products/gallery/685b13701c621.jpeg.webp',
      'https://cury.net/storage/images/products/gallery/685b137e3fb27.jpeg',
      'https://cury.net/storage/images/products/gallery/685b138636b98.jpeg',
      'https://cury.net/storage/images/products/gallery/685b139660465.jpeg',
      'https://cury.net/storage/images/products/gallery/685b13aaa44b4.jpeg',
      'https://cury.net/storage/images/products/gallery/685b13b4dbf17.jpeg',
      'https://cury.net/storage/images/products/gallery/685b13d1b796b.jpeg'
    ],
    tag: 'Lançamento',
    urgent: true,
    title: 'Singular Butantã',
    testimonialReelId: 'DYV0Ok6Srzv',
    location: 'Butantã - Zona Oeste',
    region: 'Zona Oeste',
    beds: '2',
    cars: '1',
    area: 'Diversas',
    differentials: 'Espaço Beleza · Piscinas · Redário · Churrasqueira · Pet Place · Oficina · Easy Market · Pet Care · Brinquedoteca · Salão de Jogos · Salão de Festas · Fitness · Sport Bar · Lavanderia · Coworking',
    price: 'Sob Consulta',
    description: 'Apartamentos à venda de 2 dorms. com opção de varanda e lazer completo. Conheça o Singular Butantã.',
    locationDetails: [
      'Fácil acesso a Marginal Pinheiros e Av. Escola Politécnica',
      'Próximo a USP',
      'Perto do Hospital Veterinário'
    ],
    aboutRegion: 'A Zona Oeste de São Paulo tem facilidade de locomoção, diversidade de comércios, instituições de ensino, e infinitas opções de lazer e cultura. O estilo de vida com facilidades, qualidade e mobilidade urbana atraem pessoas de todas as idades para morar na Zona Oeste.'
  },
  {
    image: 'https://cury.net/storage/images/products/gallery/69eb902467863.jpeg',
    images: [
      'https://cury.net/storage/images/products/gallery/69eb902467863.jpeg',
      'https://cury.net/storage/images/products/gallery/69eba4d1e0601.jpeg',
      'https://cury.net/storage/images/products/gallery/69eba4e252153.jpeg',
      'https://cury.net/storage/images/products/gallery/69eba4fa38a83.jpeg',
      'https://cury.net/storage/images/products/gallery/69eba50a3f6a8.jpeg',
      'https://cury.net/storage/images/products/gallery/69eba5189051e.jpeg',
      'https://cury.net/storage/images/products/gallery/69eba53ebb652.jpeg',
      'https://cury.net/storage/images/products/gallery/69eba561238bf.jpeg',
      'https://cury.net/storage/images/products/gallery/69eba577726dc.jpeg',
      'https://cury.net/storage/images/products/gallery/69eba591d8323.jpeg',
      'https://cury.net/storage/images/products/gallery/69eba5b1a2aeb.jpeg',
      'https://cury.net/storage/images/products/gallery/69eba5c17ba13.jpeg',
      'https://cury.net/storage/images/products/gallery/69eba5dc1f0c5.jpeg',
      'https://cury.net/storage/images/products/gallery/69eba610b1769.jpeg',
      'https://cury.net/storage/images/products/gallery/69eba64adff20.jpeg',
      'https://cury.net/storage/images/products/gallery/69eba68514dfc.jpeg',
      'https://cury.net/storage/images/products/gallery/69eba6aa0c407.jpeg',
      'https://cury.net/storage/images/products/gallery/69eba724d8c88.jpeg'
    ],
    video: 'https://www.youtube.com/embed/YF0slKrpX1c?autoplay=1&mute=1&playsinline=1',
    tag: 'Lançamento',
    urgent: true,
    title: 'Parque das Nações - Condomínio Granja Julieta',
    testimonialReelId: 'DXu9fX7ifqd',
    location: 'Chácara Santo Antônio - Zona Sul',
    region: 'Zona Sul',
    beds: '1 e 2',
    cars: '1',
    area: 'Diversas',
    differentials: 'Lazer Completo · Opção de Suíte · Terraço',
    price: 'Sob Consulta',
    description: 'Apartamentos à venda de 1 e 2 dorms com opção de suíte, terraço e vaga. Conheça o Parque das Nações - Condomínio Granja Julieta.',
    locationDetails: [
      'Perto da Estação Granja Julieta e Estação Alto da Boa Vista',
      'Próximo a Universidade São Judas',
      'Fácil acesso a Morumbi Shopping e Shopping Parque Da Cidade'
    ],
    aboutRegion: 'A Zona Sul de São Paulo é uma das regiões mais desejadas para morar e não faltam motivos: seus bairros são repletos de uma extensa variedade de serviços, grandes centros comerciais, hospitais, escolas e universidades e oferecem muitas opções de lazer e mobilidade.'
  },
  {
    image: 'https://cury.net/storage/images_webp/products/gallery/698c934a510d9.jpeg.webp',
    images: [
      'https://cury.net/storage/images_webp/products/gallery/698c934a510d9.jpeg.webp',
      'https://cury.net/storage/images/products/gallery/698c93c4b2967.jpeg',
      'https://cury.net/storage/images_webp/products/gallery/69a1e193aaf5d.jpeg.webp',
      'https://cury.net/storage/images/products/gallery/698c9406d57a8.jpeg',
      'https://cury.net/storage/images/products/gallery/698c9414867fe.jpeg',
      'https://cury.net/storage/images/products/gallery/698c94258eebb.jpeg',
      'https://cury.net/storage/images/products/gallery/698c942fc27da.jpeg',
      'https://cury.net/storage/images/products/gallery/698c9439ba13e.jpeg',
      'https://cury.net/storage/images/products/gallery/698c9442ba157.jpeg',
      'https://cury.net/storage/images/products/gallery/698c9450c1af5.jpeg',
      'https://cury.net/storage/images/products/gallery/698c945c47050.jpeg',
      'https://cury.net/storage/images/products/gallery/698c9465865ba.jpeg',
      'https://cury.net/storage/images/products/gallery/698c946f25265.jpeg',
      'https://cury.net/storage/images/products/gallery/698c9479375f8.jpeg',
      'https://cury.net/storage/images/products/gallery/698c948496925.jpeg',
      'https://cury.net/storage/images/products/gallery/698c948faca30.jpeg',
      'https://cury.net/storage/images/products/gallery/698c949aa48f9.jpeg',
      'https://cury.net/storage/images/products/gallery/69a1e1ab55b2a.jpeg'
    ],
    video: 'https://www.youtube.com/embed/FFSHy1sM7AE?autoplay=1&mute=1&playsinline=1',
    tag: 'Lançamento',
    urgent: true,
    title: 'Cidade Parque Guarapiranga',
    testimonialReelId: 'DXzvPZwysEY',
    location: 'Socorro - Zona Sul',
    region: 'Zona Sul',
    beds: '1 e 2',
    cars: '1',
    area: 'Diversas',
    differentials: 'Sky Bar · Sauna · Praça Zen · Piscina Adulto e Infantil · Pet Place · Playground · Miniquadra · Churrasqueira · Lavanderia · Easy Market · Coworking · Brinquedoteca',
    price: 'Sob Consulta',
    description: 'Apartamentos à venda de 1 e 2 dorms. com opção de vaga, terraço e lazer completo. Conheça o Cidade Parque Guarapiranga.',
    locationDetails: [
      'Perto do Transamérica Expo Center e Shopping SP Market',
      'Próximo ao Terminal Guido Caloi e Estação Santo Amaro',
      'Ao lado da Av. Atlântica'
    ],
    aboutRegion: 'A Zona Sul de São Paulo é uma das regiões mais desejadas para morar e não faltam motivos: seus bairros são repletos de uma extensa variedade de serviços, grandes centros comerciais, hospitais, escolas e universidades e oferecem muitas opções de lazer e mobilidade.'
  },
  {
    image: 'https://cury.net/storage/images/products/gallery/698f44c830f7c.jpeg',
    images: [
      'https://cury.net/storage/images/products/gallery/698f44c830f7c.jpeg',
      'https://cury.net/storage/images/products/gallery/698f44d292dfc.jpeg',
      'https://cury.net/storage/images/products/gallery/698f44dd24b27.jpeg',
      'https://cury.net/storage/images/products/gallery/698f44f01afab.jpeg',
      'https://cury.net/storage/images/products/gallery/698f44f99bd51.jpeg',
      'https://cury.net/storage/images/products/gallery/698f453020ab7.jpeg',
      'https://cury.net/storage/images/products/gallery/698f453c74694.jpeg',
      'https://cury.net/storage/images/products/gallery/698f45467a3e0.jpeg',
      'https://cury.net/storage/images/products/gallery/698f4551dc4b2.jpeg',
      'https://cury.net/storage/images/products/gallery/698f456105638.jpeg',
      'https://cury.net/storage/images/products/gallery/698f456b33c10.jpeg',
      'https://cury.net/storage/images_webp/products/gallery/698f448fb630c.jpeg.webp',
      'https://cury.net/storage/images/products/gallery/698f449a288a0.jpeg',
      'https://cury.net/storage/images/products/gallery/698f44a2a31ba.jpeg',
      'https://cury.net/storage/images/products/gallery/698f44adacae1.jpeg',
      'https://cury.net/storage/images/products/gallery/698f44b6b951c.jpeg',
      'https://cury.net/storage/images/products/gallery/698f44bedff43.jpeg'
    ],
    video: 'https://www.youtube.com/embed/eb_7Lpar23Y?autoplay=1&mute=1&playsinline=1',
    tag: 'Lançamento',
    urgent: true,
    title: 'Parque das Nações - Condomínio Laguna',
    testimonialReelId: 'DXu9Grqif6j',
    location: 'Chácara Santo Antônio - Zona Sul',
    region: 'Zona Sul',
    beds: '1 e 2',
    cars: '1',
    area: 'Diversas',
    differentials: 'Horta · Quadra Sintética · Piscina Adulto e Infantil · Playground · Pet Place · Beach Tennis · Lavanderia · Sauna · Salão de Festas · Fitness · Easy Market · Coworking · Churrasqueira',
    price: 'Sob Consulta',
    description: 'Apartamentos à venda de 1 e 2 dormitórios com opção de suíte, terraço, vaga e lazer completo no rooftop.',
    locationDetails: [
      'Perto da Estação Granja Julieta e Estação Alto da Boa Vista',
      'Próximo a Hospital Sancta Maggiore Dubai Morumbi',
      'Fácil acesso a Morumbi Shopping e Shopping Parque Da Cidade'
    ],
    aboutRegion: 'A Zona Sul de São Paulo é uma das regiões mais desejadas para morar e não faltam motivos: seus bairros são repletos de uma extensa variedade de serviços, grandes centros comerciais, hospitais, escolas e universidades e oferecem muitas opções de lazer e mobilidade.'
  },
  {
    image: 'https://cury.net/storage/images/products/gallery/6907fac78163d.jpeg',
    images: [
      'https://cury.net/storage/images/products/gallery/6907fac78163d.jpeg',
      'https://cury.net/storage/images/products/gallery/6907fad5e28e8.jpeg',
      'https://cury.net/storage/images_webp/products/gallery/6907f98d9cbba.jpeg.webp',
      'https://cury.net/storage/images/products/gallery/6907f9d799123.jpeg',
      'https://cury.net/storage/images/products/gallery/6907f9e99d86a.jpeg',
      'https://cury.net/storage/images/products/gallery/6907f9fe3eafc.jpeg',
      'https://cury.net/storage/images/products/gallery/6907fa1f79046.jpeg',
      'https://cury.net/storage/images/products/gallery/6907fa2f3adec.jpeg',
      'https://cury.net/storage/images/products/gallery/6907fa4425d44.jpeg',
      'https://cury.net/storage/images/products/gallery/6907fa54c435a.jpeg',
      'https://cury.net/storage/images/products/gallery/6907fa64e0250.jpeg',
      'https://cury.net/storage/images/products/gallery/6907fa890da6d.jpeg',
      'https://cury.net/storage/images/products/gallery/6907fa9ba37e4.jpeg',
      'https://cury.net/storage/images/products/gallery/6907faae3795d.jpeg'
    ],
    video: 'https://www.youtube.com/embed/4LB8PPB2LDk?autoplay=1&mute=1&playsinline=1',
    tag: 'Lançamento',
    urgent: true,
    title: 'Praça Santo Antônio',
    testimonialReelId: 'DXkTiUnCaeV',
    location: 'Chácara Santo Antônio - Zona Sul',
    region: 'Zona Sul',
    beds: '2',
    cars: '1',
    area: 'Diversas',
    differentials: 'Bar · Churrasqueiras · Cine Open Air · Piscinas · Sport Bar · Pet Place · Coworking · Fitness · Lavanderia · Easy Market · Brinquedoteca · Salão de Festas',
    price: 'Sob Consulta',
    description: 'Apartamentos à venda de 2 dorms. com opção de varanda, suíte, vaga e lazer surpreendete com rooftop. Conheça o Praça Santo Antônio.',
    locationDetails: [
      'Ao lado da Sodimac Santo Amaro e Centro Universitário Ítalo Brasileiro',
      'Próximo a Estação Santo Amaro',
      'Fácil acesso a Av. João Dias e Marginal Pinheiros'
    ],
    aboutRegion: 'A Zona Sul de São Paulo é uma das regiões mais desejadas para morar e não faltam motivos: seus bairros são repletos de uma extensa variedade de serviços, grandes centros comerciais, hospitais, escolas e universidades e oferecem muitas opções de lazer e mobilidade.'
  }
];
