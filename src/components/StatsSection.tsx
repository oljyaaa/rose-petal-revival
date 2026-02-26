import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { number: "1000+", label: "Щасливих клієнтів" },
  { number: "60+", label: "Видів послуг" },
  { number: "25+", label: "Років досвіду" },
  { number: "100+", label: "Сертифікатів" },
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 gradient-primary">
      <div ref={ref} className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                {stat.number}
              </div>
              <div className="font-body text-sm text-primary-foreground/80">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
