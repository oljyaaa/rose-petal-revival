import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const galleryItems = [
  { before: "/images/Face1.jpg",     after: "/images/face2.jpg",    label: "Догляд за шкірою" },
  { before: "/images/lips1.jpg",     after: "/images/lips2.jpg",    label: "Губи" },
  { before: "/images/cleanFace1.jpg",after: "/images/Clean2.jpg",   label: "Обличчя" },
];

function BeforeAfterCard({ item, index }: { item: typeof galleryItems[0]; index: number }) {
  const [sliderPos, setSliderPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  // Each card enters from alternating diagonal
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: 70,
      x: index === 0 ? -40 : index === 2 ? 40 : 0,
      scale: 0.88,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.95,
        delay: index * 0.18,
        ease: EASE,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="space-y-3 group"
    >
      <div
        ref={containerRef}
        className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-col-resize select-none shadow-xl"
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        {/* After image */}
        <motion.img
          src={item.after}
          alt="Після"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          initial={{ scale: 1.08 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.4, delay: index * 0.18 + 0.1 }}
        />

        {/* Before image clipped */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
          <img
            src={item.before}
            alt="До"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ minWidth: `${100 / (sliderPos / 100)}%` }}
            loading="lazy"
          />
        </div>

        {/* Slider control */}
        <div className="absolute top-0 bottom-0" style={{ left: `${sliderPos}%` }}>
          <motion.div
            className="w-0.5 h-full bg-white/70"
            animate={{ boxShadow: ["0 0 8px rgba(255,255,255,0.4)", "0 0 16px rgba(255,255,255,0.7)", "0 0 8px rgba(255,255,255,0.4)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full glass flex items-center justify-center"
            whileHover={{ scale: 1.15 }}
            animate={{ boxShadow: ["0 0 0px rgba(var(--primary),.3)", "0 0 12px rgba(var(--primary),.5)", "0 0 0px rgba(var(--primary),.3)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-foreground text-xs font-bold">↔</span>
          </motion.div>
        </div>

        {/* Labels */}
        <motion.div
          className="absolute top-3 left-3 glass px-3 py-1 rounded-full text-xs font-medium text-foreground"
          initial={{ opacity: 0, x: -12 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.18 + 0.5 }}
        >
          До
        </motion.div>
        <motion.div
          className="absolute top-3 right-3 glass px-3 py-1 rounded-full text-xs font-medium text-foreground"
          initial={{ opacity: 0, x: 12 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.18 + 0.5 }}
        >
          Після
        </motion.div>

        {/* Hover shine overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
          transition={{ duration: 0.4 }}
        />
      </div>

      <motion.p
        className="font-heading text-center text-foreground font-medium"
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.18 + 0.65 }}
      >
        {item.label}
      </motion.p>
    </motion.div>
  );
}

export default function GallerySection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "-80px" });

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={sectionRef} id="gallery" className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Parallax ambient bg */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/[0.06] blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={headingRef}
          className="text-center mb-16"
        >
          <motion.span
            className="font-body text-sm font-medium text-primary uppercase tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Результати
          </motion.span>

          {/* Animated separator */}
          <motion.div
            className="flex items-center justify-center gap-3 my-4"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary/40" />
          </motion.div>

          <motion.h2
            className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2"
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            До &amp; Після
          </motion.h2>

          <motion.p
            className="font-body text-muted-foreground mt-4 max-w-md mx-auto text-sm leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.28 }}
          >
            Перетягніть повзунок щоб побачити результат
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {galleryItems.map((item, i) => (
            <BeforeAfterCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
