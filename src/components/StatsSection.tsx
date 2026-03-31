import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { number: 1000, suffix: "+", label: "Щасливих клієнтів", icon: "✦" },
  { number: 60,   suffix: "+", label: "Видів послуг",       icon: "✦" },
  { number: 25,   suffix: "+", label: "Років досвіду",      icon: "✦" },
  { number: 100,  suffix: "+", label: "Сертифікатів",       icon: "✦" },
];

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 gradient-primary relative overflow-hidden">
      {/* Ambient light effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white/[0.05] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-white/[0.04] blur-3xl" />
      </motion.div>

      {/* Decorative lines */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-white/10"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-white/10"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "right" }}
      />

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.75, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-center group relative"
            >
              {/* Icon */}
              <motion.div
                className="text-white/20 text-xs mb-3 tracking-widest"
                animate={isInView ? { rotate: [0, 180] } : {}}
                transition={{ duration: 1.5, delay: i * 0.12 + 0.5 }}
              >
                {stat.icon}
              </motion.div>

              {/* Number */}
              <div
                className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-2 tabular-nums"
                style={{ lineHeight: 1.1 }}
              >
                <AnimatedNumber value={stat.number} suffix={stat.suffix} inView={isInView} />
              </div>

              {/* Divider */}
              <motion.div
                className="h-px bg-white/20 mx-auto my-3"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12 + 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: 32, transformOrigin: "center" }}
              />

              {/* Label */}
              <div className="font-body text-sm text-primary-foreground/75 leading-snug">
                {stat.label}
              </div>

              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
