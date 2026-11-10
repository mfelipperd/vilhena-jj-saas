import React, { Suspense, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Baby, Brain, Check, Instagram, LogIn, Shield, Swords, Trophy, Users } from 'lucide-react';
import ClickSpark from './reactbits/ClickSpark';
import CountUp from './reactbits/CountUp';
import Magnet from './reactbits/Magnet';
import ScrollReveal from './reactbits/ScrollReveal';
import ScrollVelocity from './reactbits/ScrollVelocity';
import ShinyText from './reactbits/ShinyText';
import SpotlightCard from './reactbits/SpotlightCard';
import SplitText from './reactbits/SplitText';

const LightRays = React.lazy(() => import('./reactbits/LightRays'));

const INSTAGRAM_URL = 'https://www.instagram.com/ctvilhenacwb/';
const RED = '#E10600';

/* ------------------------------------------------------------------ */
/*  Parallax helpers                                                   */
/* ------------------------------------------------------------------ */

/** Moves its children vertically at a different speed than the page scroll. */
function Parallax({
  children,
  distance = 80,
  className,
}: {
  children: React.ReactNode;
  /** px of travel across the viewport pass; negative moves against the scroll */
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data (all from docs/PROJETO.md and the academy's public profile)   */
/* ------------------------------------------------------------------ */

const PROGRAMS = [
  { icon: Baby, title: 'Kids', text: 'Coordenação, disciplina e respeito desde cedo, brincando e aprendendo no tatame.' },
  { icon: Swords, title: 'Juvenil', text: 'Fundamentos sólidos, foco e confiança na fase em que o caráter se forma.' },
  { icon: Users, title: 'Adulto', text: 'Condicionamento, técnica e defesa pessoal para quem quer evoluir de verdade.' },
  { icon: Trophy, title: 'Master', text: 'Jiu-jítsu inteligente: mínimo de força, máximo de eficiência, em qualquer idade.' },
];

const BELTS = [
  { name: 'Branca', color: '#F5F5F5', text: 'O começo de tudo. Fundamentos, humildade e a base técnica de toda a jornada.' },
  { name: 'Cinza', color: '#9CA3AF', text: 'Para os pequenos: primeiros passos, brincadeira com regras e disciplina.' },
  { name: 'Amarela', color: '#FACC15', text: 'A criança já entende posições e começa a pensar o jogo.' },
  { name: 'Laranja', color: '#F97316', text: 'Mais técnica, mais constância, mais confiança dentro e fora do tatame.' },
  { name: 'Verde', color: '#22C55E', text: 'Maturidade técnica na categoria infanto-juvenil, pronta para o próximo ciclo.' },
  { name: 'Azul', color: '#2563EB', text: 'Primeira grande conquista adulta: repertório de técnicas e muita resiliência.' },
  { name: 'Roxa', color: '#9333EA', text: 'Jogo próprio e capacidade de ensinar. A fase em que o estilo aparece.' },
  { name: 'Marrom', color: '#7C4A2D', text: 'Refino e consistência. Reta final rumo à excelência.' },
  { name: 'Preta', color: '#18181B', text: 'Não é o fim: é a consequência de anos de treino, técnica e conduta.' },
];

const BENEFITS = [
  { icon: Shield, title: 'Disciplina', text: 'Rotina, foco e responsabilidade que aparecem na escola e em casa.' },
  { icon: Brain, title: 'Hierarquia e respeito', text: 'Aprender a ouvir, esperar a vez e respeitar o colega e o professor.' },
  { icon: Swords, title: 'Coordenação', text: 'Desenvolvimento motor, equilíbrio e consciência corporal.' },
  { icon: Check, title: 'Defesa pessoal', text: 'Técnicas reais, ensinadas com segurança e responsabilidade.' },
];

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

function Header({ onLogin }: { onLogin: () => void }) {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 40));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-[#140808]/95 border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#topo" className="flex items-center gap-3">
          <img src="/logo-vilhena.png" alt="Equipe Vilhena" className="h-10 w-10" />
          <span className="font-display text-lg font-bold tracking-wide">VILHENA</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
          <a className="hover:text-white" href="#programas">Programas</a>
          <a className="hover:text-white" href="#graduacao">Graduação</a>
          <a className="hover:text-white" href="#pais">Para os pais</a>
          <a className="hover:text-white" href="#aula-experimental">Aula experimental</a>
        </nav>
        <Magnet magnetStrength={4} padding={40}>
          <button
            onClick={onLogin}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            <LogIn className="h-4 w-4" /> Área do aluno
          </button>
        </Magnet>
      </div>
    </header>
  );
}

function Hero({ onLogin }: { onLogin: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const smooth = scrollYProgress;

  const watermarkY = useTransform(smooth, [0, 1], [0, 260]);
  const watermarkScale = useTransform(smooth, [0, 1], [1, 1.35]);
  const contentY = useTransform(smooth, [0, 1], [0, -120]);
  const contentOpacity = useTransform(smooth, [0, 0.7], [1, 0]);
  const glowY = useTransform(smooth, [0, 1], [0, 140]);

  return (
    <section ref={ref} id="topo" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Layer 1 — light rays (WebGL) */}
      {!reduce && (
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <LightRays
              raysOrigin="top-center"
              raysColor={RED}
              raysSpeed={0.9}
              lightSpread={0.9}
              rayLength={1.4}
              followMouse={false}
              maxDevicePixelRatio={1}
              pulsating={false}
              cursorShadow={false}
            />
          </Suspense>
        </div>
      )}

      {/* Layer 2 — slow glow */}
      <motion.div
        style={reduce ? undefined : { y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[80vh] w-[80vh] -translate-x-1/2 will-change-transform [background:radial-gradient(closest-side,rgba(225,6,0,0.28),transparent)]"
      />

      {/* Layer 3 — giant watermark that drifts and scales on scroll */}
      <motion.img
        src="/logo-vilhena.png"
        alt=""
        aria-hidden
        style={reduce ? undefined : { y: watermarkY, scale: watermarkScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[min(80vw,640px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] will-change-transform"
      />

      {/* Layer 4 — content */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6"
      >
        <div className="mb-6 flex justify-center">
          <ShinyText
            text="EQUIPE VILHENA · JIU-JÍTSU · MARABÁ, PA"
            color="#d9a3a0"
            shineColor="#ffffff"
            speed={3}
            className="text-xs font-semibold uppercase tracking-[0.35em] sm:text-sm"
          />
        </div>

        <SplitText
          text="FORÇA E HONRA, OSS"
          tag="h1"
          effect="rise"
          splitType="chars"
          delay={45}
          duration={1.1}
          trigger="load"
          className="font-display text-5xl font-extrabold leading-[1.05] text-white sm:text-7xl lg:text-8xl"
        />

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75 sm:text-xl">
          Mínimo de força, máximo de eficiência. Treine jiu-jítsu com técnica, disciplina e uma família que
          caminha junto no tatame.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Magnet magnetStrength={3} padding={60}>
            <a
              href="#aula-experimental"
              className="inline-flex items-center gap-2 rounded-full bg-[#E10600] px-8 py-4 font-semibold text-white shadow-[0_0_40px_-5px_#E10600] transition hover:bg-[#B80500]"
            >
              Quero uma aula experimental <ArrowRight className="h-5 w-5" />
            </a>
          </Magnet>
          <Magnet magnetStrength={3} padding={60}>
            <button
              onClick={onLogin}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 font-semibold text-white hover:bg-white/10"
            >
              Já sou aluno
            </button>
          </Magnet>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50">
        <motion.div
          animate={reduce ? undefined : { y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="h-10 w-6 rounded-full border border-white/30 p-1"
        >
          <div className="mx-auto h-2 w-1 rounded-full bg-white/70" />
        </motion.div>
      </div>
    </section>
  );
}

function Ticker() {
  return (
    <section aria-hidden className="relative border-y border-white/10 bg-[#E10600] py-5 text-[#140808]">
      <ScrollVelocity
        texts={['JIU-JÍTSU • DISCIPLINA • HONRA • RESPEITO •', 'EQUIPE VILHENA • FORÇA E HONRA, OSS •']}
        velocity={60}
        numCopies={6}
        fontSize="clamp(1.5rem, 4vw, 3rem)"
        fontWeight={800}
        color="#140808"
        className="font-display"
        pauseOnHover={false}
        skewWithVelocity={0}
      />
    </section>
  );
}

function Manifesto() {
  return (
    <section className="relative mx-auto max-w-5xl px-4 py-32 sm:px-6">
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-[#E10600]">Nossa filosofia</p>
      <ScrollReveal
        baseOpacity={0.12}
        enableBlur
        baseRotation={2}
        blurStrength={6}
        containerClassName="!my-0"
        textClassName="font-display !text-3xl sm:!text-5xl !leading-tight text-white"
      >
        A graduação se constrói com tempo de treino, técnica e conduta. Aqui o respeito vem antes da faixa, e a
        evolução de cada aluno é celebrada como conquista da equipe inteira.
      </ScrollReveal>
    </section>
  );
}

function Stats() {
  const items = [
    { to: 15, suffix: '', label: 'unidades na rede Vilhena' },
    { to: 9, suffix: '', label: 'faixas, da branca à preta' },
    { to: 5, suffix: '', label: 'dias de treino por semana' },
    { to: 4, suffix: '', label: 'categorias: kids a master' },
  ];
  return (
    <section className="relative overflow-hidden py-24">
      <Parallax distance={60} className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-20 h-[28rem] w-[28rem] [background:radial-gradient(closest-side,rgba(225,6,0,0.22),transparent)]" />
        <div className="absolute -bottom-20 -right-24 h-[28rem] w-[28rem] [background:radial-gradient(closest-side,rgba(139,0,0,0.32),transparent)]" />
      </Parallax>
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 sm:px-6 lg:grid-cols-4">
        {items.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-6xl font-extrabold text-white sm:text-7xl">
              <CountUp to={s.to} duration={2} />
              {s.suffix}
            </div>
            <div className="mt-2 text-sm uppercase tracking-widest text-white/60">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section id="programas" className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <div className="mb-14 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#E10600]">Programas</p>
        <h2 className="font-display text-4xl font-bold sm:text-5xl">Um tatame para cada fase da vida</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PROGRAMS.map((p, i) => (
          <Parallax key={p.title} distance={i % 2 === 0 ? 30 : -30}>
            <SpotlightCard
              spotlightColor="rgba(225, 6, 0, 0.35)"
              flare={false}
              className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#E10600]/15 text-[#ff5a52]">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-bold">{p.title}</h3>
              <p className="mt-3 text-white/65">{p.text}</p>
            </SpotlightCard>
          </Parallax>
        ))}
      </div>
    </section>
  );
}

/** Sticky section: the belt changes as the visitor scrolls through it. */
function BeltJourney() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [index, setIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIndex(Math.min(BELTS.length - 1, Math.max(0, Math.floor(v * BELTS.length))));
  });
  const belt = BELTS[index];
  const fill: MotionValue<number> = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const barWidth = useTransform(fill, [0, 1], ['0%', '100%']);

  return (
    <section ref={ref} id="graduacao" className="relative" style={{ height: `${BELTS.length * 45}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 transition-colors duration-700"
          style={{ background: `radial-gradient(60% 50% at 70% 50%, ${belt.color}33, transparent 70%)` }}
        />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#E10600]">Graduação</p>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">Cada faixa é uma história</h2>
            <p className="mt-4 max-w-md text-white/65">
              Role para acompanhar a jornada. Frequência, técnica e conduta definem quando chega a hora do próximo
              grau.
            </p>
            <div className="mt-10 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-[#E10600]" style={{ width: barWidth }} />
            </div>
            <div className="mt-3 flex max-w-md justify-between text-xs text-white/40">
              <span>Branca</span>
              <span>Preta</span>
            </div>
          </div>

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div
              key={belt.name}
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              {/* The belt itself */}
              <div className="relative mx-auto h-16 w-full max-w-md overflow-hidden rounded-md shadow-2xl lg:mx-0" style={{ background: belt.color }}>
                <div className="absolute right-6 top-0 flex h-full w-20 items-center justify-center gap-1.5 bg-black">
                  {[0, 1, 2, 3].map((n) => (
                    <span key={n} className="h-10 w-1.5 rounded-sm bg-white/90" />
                  ))}
                </div>
              </div>
              <h3 className="mt-8 font-display text-5xl font-extrabold" style={{ color: belt.name === 'Preta' ? '#fff' : belt.color }}>
                Faixa {belt.name}
              </h3>
              <p className="mt-3 max-w-md text-lg text-white/70">{belt.text}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Parents() {
  return (
    <section id="pais" className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 grid items-end gap-6 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#E10600]">Para os pais</p>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">Muito mais que luta</h2>
          </div>
          <p className="text-white/65">
            O jiu-jítsu forma o caráter. Veja o que seu filho leva do tatame para a vida.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div key={b.title} className="group bg-[#140808] p-8 transition-colors hover:bg-[#1d0e0e] sm:p-10">
              <b.icon className="mb-5 h-8 w-8 text-[#E10600] transition-transform group-hover:scale-110" />
              <h3 className="font-display text-2xl font-bold">{b.title}</h3>
              <p className="mt-2 text-white/65">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrialCta() {
  const [sent, setSent] = useState(false);
  return (
    <section id="aula-experimental" className="relative overflow-hidden py-28">
      <Parallax distance={90} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 [background:radial-gradient(closest-side,rgba(225,6,0,0.28),transparent)]" />
      </Parallax>
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <SplitText
          text="Sua primeira aula é por nossa conta"
          tag="h2"
          effect="blur"
          splitType="words"
          delay={80}
          className="font-display text-4xl font-bold sm:text-6xl"
        />
        <p className="mx-auto mt-5 max-w-xl text-white/70">
          Deixe seu contato e a equipe fala com você para agendar uma aula experimental.
        </p>

        {sent ? (
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-[#1F9D55]/40 bg-[#1F9D55]/10 p-6 text-[#7ee2a8]">
            <Check className="mx-auto mb-2 h-8 w-8" />
            Recebemos seu contato! (demonstração: na versão final isso cai direto no painel do professor)
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mx-auto mt-10 grid max-w-xl gap-4 text-left sm:grid-cols-2"
          >
            <input required placeholder="Seu nome" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder-white/40 outline-none focus:border-[#E10600]" />
            <input required type="tel" placeholder="WhatsApp" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder-white/40 outline-none focus:border-[#E10600]" />
            <div className="sm:col-span-2">
              <Magnet magnetStrength={5} padding={50} wrapperClassName="w-full" innerClassName="w-full">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#E10600] px-6 py-4 font-semibold text-white shadow-[0_0_40px_-8px_#E10600] hover:bg-[#B80500]"
                >
                  Agendar aula experimental
                </button>
              </Magnet>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-white/50 sm:flex-row sm:px-6">
        <div className="flex items-center gap-3">
          <img src="/logo-vilhena.png" alt="" className="h-8 w-8" />
          <span>Equipe Vilhena Jiu-Jitsu · Marabá, PA</span>
        </div>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
          <Instagram className="h-4 w-4" /> @ctvilhenacwb
        </a>
      </div>
    </footer>
  );
}

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const goLogin = () => navigate('/login');

  // The marketing site is dark by design. The app's light theme remaps utilities such as
  // `text-white`, so pin the dark theme while this page is mounted and restore it on exit.
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.getAttribute('data-theme');
    root.setAttribute('data-theme', 'dark');
    return () => {
      if (previous) root.setAttribute('data-theme', previous);
    };
  }, []);

  return (
    <ClickSpark sparkColor={RED} sparkCount={10} sparkSize={12} sparkRadius={26} duration={500}>
      <div className="min-h-screen overflow-x-clip bg-[#140808] font-sans text-white antialiased">
        <Header onLogin={goLogin} />
        <main>
          <Hero onLogin={goLogin} />
          <Ticker />
          <Manifesto />
          <Stats />
          <Programs />
          <BeltJourney />
          <Parents />
          <TrialCta />
        </main>
        <Footer />
      </div>
    </ClickSpark>
  );
};

export default LandingPage;
