import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";

// ── Анімований фон героя (без фото) ───────────────────────────────────────────
// Bokeh кольори задаються через CSS-класи для підтримки теми
const BOKEH = [
  { w: 420, h: 420, top: "-8%",  left: "-5%",  colorVar: "bokeh-1",  dur: 22, dx: 40, dy: 28 },
  { w: 560, h: 560, top: "30%",  left: "60%",  colorVar: "bokeh-2",  dur: 28, dx: -35, dy: 30 },
  { w: 320, h: 320, top: "55%",  left: "5%",   colorVar: "bokeh-3",  dur: 18, dx: 25, dy: -20 },
  { w: 260, h: 260, top: "10%",  left: "70%",  colorVar: "bokeh-4",  dur: 24, dx: -20, dy: 18 },
  { w: 180, h: 180, top: "70%",  left: "45%",  colorVar: "bokeh-5",  dur: 16, dx: 18, dy: -25 },
];

// Пелюстки для фону
const HERO_PETALS = [
  { x: "12%",  y: "18%",  size: 28, rotate: 20,  dur: 14, delay: 0    },
  { x: "82%",  y: "12%",  size: 20, rotate: -35, dur: 18, delay: 2    },
  { x: "65%",  y: "70%",  size: 24, rotate: 130, dur: 12, delay: 1    },
  { x: "28%",  y: "75%",  size: 18, rotate: -70, dur: 20, delay: 3    },
  { x: "90%",  y: "50%",  size: 22, rotate: 60,  dur: 16, delay: 1.5  },
  { x: "5%",   y: "55%",  size: 16, rotate: 200, dur: 22, delay: 0.5  },
  { x: "50%",  y: "5%",   size: 20, rotate: -10, dur: 15, delay: 2.5  },
  { x: "40%",  y: "85%",  size: 14, rotate: 155, dur: 19, delay: 4    },
];

function HeroBg({ parallaxY, parallaxScale }: { parallaxY: ReturnType<typeof useTransform>; parallaxScale: ReturnType<typeof useTransform> }) {
  return (
    <motion.div
      style={{ y: parallaxY, scale: parallaxScale }}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      {/* Base gradient — адаптується до теми через CSS-клас */}
      <div className="absolute inset-0 hero-base-gradient" />

      {/* Subtle dot-mesh pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(350 35% 40%) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Animated bokeh orbs */}
      {BOKEH.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl pointer-events-none hero-${b.colorVar}`}
          style={{
            width: b.w,
            height: b.h,
            top: b.top,
            left: b.left,
          }}
          animate={{
            x: [0, b.dx, 0],
            y: [0, b.dy, 0],
          }}
          transition={{
            duration: b.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.8,
          }}
        />
      ))}

      {/* Floating petal silhouettes */}
      {HERO_PETALS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size * 1.55,
          }}
          animate={{
            y: [-12, 12, -12],
            rotate: [p.rotate - 6, p.rotate + 6, p.rotate - 6],
            opacity: [0.12, 0.28, 0.12],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Petal shape via clip */}
          <div
            className="w-full h-full"
            style={{
              background: "hsl(350 55% 70% / 0.6)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              transform: `rotate(${p.rotate}deg)`,
            }}
          />
        </motion.div>
      ))}

      {/* Shimmer diagonal line accents */}
      {[15, 38, 62, 85].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: `${pos}%`,
            width: 1,
            background:
              "linear-gradient(to bottom, transparent 0%, hsl(350 40% 65% / 0.12) 40%, hsl(15 45% 70% / 0.08) 60%, transparent 100%)",
          }}
          animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.95, 1.05, 0.95] }}
          transition={{
            duration: 8 + i * 2,
            delay: i * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glossy top highlight — адаптується до теми */}
      <div className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none hero-top-highlight" />
    </motion.div>
  );
}

// ── Конфіг частинок ───────────────────────────────────────────────────────────
const PARTICLES = [
  { x: "8%",  y: "6%",  size: 3, dur: 7,  delay: 0   },
  { x: "88%", y: "4%",  size: 2, dur: 9,  delay: 1   },
  { x: "22%", y: "14%", size: 4, dur: 6,  delay: 2   },
  { x: "70%", y: "18%", size: 2, dur: 8,  delay: 0.5 },
  { x: "45%", y: "28%", size: 3, dur: 10, delay: 1.5 },
  { x: "92%", y: "32%", size: 2, dur: 7,  delay: 3   },
  { x: "12%", y: "40%", size: 5, dur: 8,  delay: 0.8 },
  { x: "78%", y: "45%", size: 3, dur: 6,  delay: 2.2 },
  { x: "35%", y: "55%", size: 2, dur: 9,  delay: 1.2 },
  { x: "60%", y: "60%", size: 4, dur: 7,  delay: 0.3 },
  { x: "5%",  y: "68%", size: 3, dur: 11, delay: 1.8 },
  { x: "95%", y: "72%", size: 2, dur: 8,  delay: 0.6 },
  { x: "50%", y: "78%", size: 3, dur: 6,  delay: 2.8 },
  { x: "28%", y: "85%", size: 4, dur: 9,  delay: 1.1 },
  { x: "82%", y: "90%", size: 2, dur: 7,  delay: 3.5 },
];

// ── Плаваючі частинки + атмосферні кола ──────────────────────────────────────
function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Дрібні точки */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/20"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          animate={{
            y: [-14, 14, -14],
            x: [-7, 7, -7],
            opacity: [0.12, 0.45, 0.12],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* Великі розмиті orbs */}
      <motion.div
        className="absolute rounded-full bg-primary/[0.04] blur-3xl"
        style={{ width: 500, height: 500, top: "5%", left: "-12%" }}
        animate={{ x: [0, 35, 0], y: [0, -25, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full bg-accent/[0.06] blur-3xl"
        style={{ width: 600, height: 600, top: "38%", right: "-18%" }}
        animate={{ x: [0, -30, 0], y: [0, 35, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="absolute rounded-full bg-primary/[0.03] blur-3xl"
        style={{ width: 400, height: 400, bottom: "8%", left: "25%" }}
        animate={{ x: [0, 22, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 8 }}
      />
    </div>
  );
}

// ── Бігучий рядок з послугами (marquee) ──────────────────────────────────────
const MARQUEE_ITEMS = [
  "Ботокс", "·", "Філери", "·", "Біоревіталізація", "·",
  "Елос-епіляція", "·", "RF-ліфтинг", "·", "Масаж обличчя", "·",
  "Мікрострумова терапія", "·", "Пілінги", "·", "Мезотерапія", "·",
];

function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="w-full overflow-hidden py-5 border-y border-primary/10 relative z-10">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`font-body text-[0.62rem] tracking-[0.32em] uppercase ${
              item === "·" ? "text-primary/30" : "text-muted-foreground/60"
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Статистика ────────────────────────────────────────────────────────────────
const STATS = [
  { number: "500+", label: "задоволених клієнтів" },
  { number: "8",    label: "років досвіду" },
  { number: "20+",  label: "видів процедур" },
];

function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref} className="relative z-10 px-6 sm:px-16 lg:px-32 py-16 lg:py-20">
      <div className="grid grid-cols-3 gap-6 sm:gap-12">
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center gap-2"
          >
            <span
              className="font-heading font-light text-foreground"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.6rem)", lineHeight: 1 }}
            >
              {s.number}
            </span>
            <div className="w-5 h-px bg-primary/35 my-1" />
            <span className="font-body text-muted-foreground text-[0.7rem] sm:text-xs tracking-wide">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Reveal: текст виїжджає знизу вгору ───────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <div ref={ref} style={{ overflow: "hidden", display: "block" }}>
      <motion.div
        initial={{ y: "105%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ── Лінія що розтягується ─────────────────────────────────────────────────────
function ExpandLine() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <div ref={ref} className="w-full overflow-hidden relative z-10">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-px bg-primary/20 w-full"
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

// ── Глава з послугою ──────────────────────────────────────────────────────────
function Chapter({
  number, title, body, align = "left",
}: {
  number: string; title: string; body: string; align?: "left" | "right";
}) {
  const isRight = align === "right";
  return (
    <div className={`relative z-10 flex flex-col ${isRight ? "items-end text-right" : "items-start text-left"} gap-5 px-6 sm:px-16 lg:px-32 py-16 lg:py-24`}>
      <Reveal delay={0}>
        <span className="font-body text-[0.58rem] tracking-[0.42em] uppercase text-primary/50">
          {number}
        </span>
      </Reveal>
      <ExpandLine />
      <Reveal delay={0.12}>
        <h2
          className="font-heading font-light text-foreground leading-[1.04] tracking-tight"
          style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
        >
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.3}>
        <p
          className="font-body text-muted-foreground leading-relaxed max-w-sm"
          style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)" }}
        >
          {body}
        </p>
      </Reveal>
    </div>
  );
}

// ── Декоративний роздільник між главами ───────────────────────────────────────
function Ornament() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center justify-center gap-3 py-2 relative z-10"
    >
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/25" />
      <div className="w-1 h-1 rounded-full bg-primary/30" />
      <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
      <div className="w-1 h-1 rounded-full bg-primary/30" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/25" />
    </motion.div>
  );
}

// ── Головний компонент ────────────────────────────────────────────────────────
export default function HeroSection({ onBooking }: { onBooking: () => void }) {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y       = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <>
      {/* ══════════════════════════════
          1. OPENING HERO (оригінал)
          ══════════════════════════════ */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated cosmetics background */}
        <HeroBg parallaxY={y} parallaxScale={scale} />

        {/* Radial glow overlay on top of hero bg */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, hsl(350 50% 70% / 0.13) 0%, transparent 65%)",
          }}
        />

        <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/80">
              Косметологія · Масаж · Елос-епіляція
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight"
          >
            Beauty <span className="text-gradient">&amp;</span> Room
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 px-2"
          >
            Професійна косметологія у Бердичеві. Ін'єкційні та безін'єкційні
            процедури для обличчя, масаж та елос-епіляція.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center px-4"
          >
            <button
              onClick={onBooking}
              className="gradient-primary text-primary-foreground px-8 py-4 rounded-2xl font-medium text-base hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20 hover-lift"
            >
              Записатись на прийом
            </button>
            <button
              onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
              className="glass text-foreground px-8 py-4 rounded-2xl font-medium text-base hover-lift"
            >
              Наші послуги
            </button>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1.2 }}
            className="mt-16 flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-px h-10 bg-gradient-to-b from-primary/70 to-transparent" />
              <div className="w-1 h-1 rounded-full bg-primary/50" />
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* ══════════════════════════════════════
          2. LUXURY SCROLL — з анімаціями
          ══════════════════════════════════════ */}
      <div className="relative bg-background overflow-hidden">

        {/* Фонові частинки — є весь час */}
        <FloatingParticles />

        {/* ── Вступний рядок ── */}
        <div className="relative z-10 px-6 sm:px-16 lg:px-32 pt-24 pb-4">
          <Reveal>
            <p className="font-body text-[0.62rem] tracking-[0.42em] uppercase text-primary/45">
              Beauty &amp; Room — Бердичів
            </p>
          </Reveal>
        </div>

        {/* ── Велике гасло ── */}
        <div className="relative z-10 px-6 sm:px-16 lg:px-32 pb-16">
          <div style={{ overflow: "hidden" }}>
            <Reveal delay={0}>
              <p className="font-heading font-light text-foreground leading-[0.93] tracking-tight"
                style={{ fontSize: "clamp(3.2rem, 8.5vw, 8.5rem)" }}>
                Догляд,
              </p>
            </Reveal>
          </div>
          <div style={{ overflow: "hidden" }}>
            <Reveal delay={0.13}>
              <p className="font-heading font-light text-gradient leading-[0.93] tracking-tight pl-[8vw]"
                style={{ fontSize: "clamp(3.2rem, 8.5vw, 8.5rem)" }}>
                який
              </p>
            </Reveal>
          </div>
          <div style={{ overflow: "hidden" }}>
            <Reveal delay={0.26}>
              <p className="font-heading font-light text-foreground leading-[0.93] tracking-tight pl-[16vw]"
                style={{ fontSize: "clamp(3.2rem, 8.5vw, 8.5rem)" }}>
                відчувається.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ── Бігучий рядок ── */}
        <Marquee />

        {/* ── Статистика ── */}
        <StatsRow />

        <ExpandLine />

        {/* ── Глави ── */}
        <Chapter
          number="— 01"
          title="Ін'єкційна косметологія"
          body="Ботокс, філери, біоревіталізація. Природний результат без надмірності — ваше обличчя, тільки відпочиле."
          align="left"
        />

        <Ornament />
        <ExpandLine />

        <Chapter
          number="— 02"
          title="Апаратні процедури"
          body="Елос-епіляція, мікрострумова терапія, RF-ліфтинг. Технології, що працюють на клітинному рівні."
          align="right"
        />

        <Ornament />
        <ExpandLine />

        <Chapter
          number="— 03"
          title="Масаж обличчя та тіла"
          body="Скульптурний, лімфодренажний, релаксаційний. Руки майстра — найкращий інструмент."
          align="left"
        />

        <Ornament />
        <ExpandLine />

        <Chapter
          number="— 04"
          title="Індивідуальний підхід"
          body="Кожен клієнт — унікальний. Ми не продаємо пакети, ми підбираємо рішення особисто для вас."
          align="right"
        />

        <ExpandLine />

        {/* ── Фінальне CTA ── */}
        <div className="relative z-10 flex flex-col items-center text-center gap-7 px-6 py-28 lg:py-36">
          <Ornament />

          <Reveal delay={0}>
            <p className="font-body text-[0.6rem] tracking-[0.45em] uppercase text-primary/45">
              Почніть сьогодні
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              className="font-heading font-light text-foreground leading-tight tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
            >
              Ваша шкіра<br />заслуговує на краще
            </h2>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="font-body text-muted-foreground max-w-sm leading-relaxed"
              style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.02rem)" }}>
              Перша консультація — безкоштовно.<br />
              Підберемо процедури індивідуально.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onBooking}
                className="gradient-primary text-primary-foreground px-10 py-4 rounded-2xl font-medium text-base hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20 hover-lift"
              >
                Записатись на прийом
              </button>
              <button
                onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
                className="glass text-foreground px-10 py-4 rounded-2xl font-medium text-base hover-lift"
              >
                Переглянути послуги
              </button>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </div>
    </>
  );
}