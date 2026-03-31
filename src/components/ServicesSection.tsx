import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    title: "Ін'єкційна косметологія",
    description: "Мезотерапія, біоревіталізація, ботулінотерапія та контурна пластика для молодості вашої шкіри",
    image: "/images/lips.jpg",
    accent: "from-rose-500/30 to-pink-400/20",
  },
  {
    title: "Безін'єкційний догляд",
    description: "Чистки, пілінги, маски та апаратні методики для здорової та сяючої шкіри обличчя",
    image: "/images/cleanFace1.jpg",
    accent: "from-amber-400/25 to-orange-300/20",
  },
  {
    title: "Елос-епіляція",
    description: "Сучасна технологія видалення волосся — безболісно, ефективно та надовго",
    image: "/images/elos-epil.jpg",
    accent: "from-violet-400/25 to-purple-300/20",
  },
  {
    title: "Масаж",
    description: "Класичний, лімфодренажний та антицелюлітний масаж для здоров'я та краси вашого тіла",
    image: "/images/massage.jpg",
    accent: "from-teal-400/25 to-cyan-300/20",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Alternating direction: even cards slide from left, odd from right
  const xInitial = index % 2 === 0 ? -50 : 50;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, x: xInitial, scale: 0.92 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0, scale: 1 }
          : {}
      }
      transition={{
        duration: 0.85,
        delay: index * 0.14,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative overflow-hidden rounded-3xl hover-lift cursor-pointer"
      whileHover={{ y: -8, transition: { duration: 0.35, ease: "easeOut" } }}
    >
      {/* Image with parallax on hover */}
      <div className="aspect-[4/5] overflow-hidden rounded-3xl">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          loading="lazy"
          initial={{ scale: 1.08 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.2, delay: index * 0.14 + 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.07, transition: { duration: 0.6 } }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-transparent rounded-3xl" />

      {/* Colored accent on hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-t ${service.accent} rounded-3xl opacity-0`}
        whileHover={{ opacity: 1, transition: { duration: 0.4 } }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <motion.h3
          className="font-heading text-xl font-semibold text-primary-foreground mb-2 leading-tight"
          initial={{ y: 8, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.14 + 0.3 }}
        >
          {service.title}
        </motion.h3>
        <motion.p
          className="font-body text-sm text-primary-foreground/75 leading-relaxed"
          initial={{ y: 8, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.14 + 0.45 }}
        >
          {service.description}
        </motion.p>

        {/* Hover arrow */}
        <motion.div
          className="mt-3 flex items-center gap-1 text-primary-foreground/60"
          initial={{ x: -8, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <span className="font-body text-xs tracking-widest uppercase">Детальніше</span>
          <span className="text-sm">→</span>
        </motion.div>
      </div>

      {/* Index number badge */}
      <div className="absolute top-4 left-4">
        <motion.span
          className="font-body text-[0.55rem] tracking-[0.35em] uppercase text-primary-foreground/50 glass px-2.5 py-1 rounded-full"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.14 + 0.2 }}
        >
          0{index + 1}
        </motion.span>
      </div>
    </motion.div>
  );
}

// Glowing section divider
function SectionDivider() {
  const { ref, isInView } = useScrollAnimation("slideReveal");
  return (
    <motion.div
      ref={ref}
      className="w-16 h-px bg-gradient-to-r from-primary/60 to-transparent mx-auto mb-5"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "left" }}
    />
  );
}

export default function ServicesSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-80px" });

  // Subtle section background parallax
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-background relative overflow-hidden">
      {/* Ambient background blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/[0.04] blur-3xl pointer-events-none"
        style={{ y: bgY }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-accent/[0.06] blur-3xl pointer-events-none"
        style={{ y: bgY }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          ref={headingRef}
          className="text-center mb-16"
        >
          <motion.span
            className="font-body text-sm font-medium text-primary uppercase tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Що ми пропонуємо
          </motion.span>

          <SectionDivider />

          <motion.h2
            className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3"
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={isHeadingInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            Наші послуги
          </motion.h2>

          <motion.p
            className="font-body text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            Кожна процедура — це індивідуальний підхід та турбота про вашу красу
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-14"
        >
          <Link
            to="/prices"
            className="inline-flex items-center gap-2 glass text-foreground px-8 py-3.5 rounded-2xl font-medium text-sm hover-lift group"
          >
            <span>Дивитися всі ціни</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
