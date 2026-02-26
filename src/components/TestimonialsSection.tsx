import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Олена К.",
    text: "Неймовірний сервіс! Після масажу відчуваю себе новою людиною. Дуже дякую майстрам Beauty & Room!",
    rating: 5,
  },
  {
    name: "Марія С.",
    text: "Робила елос-епіляцію — результат перевершив очікування. Професійний підхід та затишна атмосфера.",
    rating: 5,
  },
  {
    name: "Анна Т.",
    text: "Найкращий косметологічний салон у місті! Процедури на найвищому рівні. Рекомендую всім!",
    rating: 5,
  },
  {
    name: "Катерина Д.",
    text: "Ходжу сюди вже рік — шкіра стала набагато кращою. Дівчата завжди привітні та уважні.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm font-medium text-primary uppercase tracking-widest">Відгуки</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3">Що кажуть клієнти</h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-8 md:p-12 text-center relative">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>

            <motion.p
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="font-body text-lg text-foreground/80 italic leading-relaxed mb-6"
            >
              "{testimonials[current].text}"
            </motion.p>

            <motion.p
              key={`name-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-heading text-lg font-semibold text-foreground"
            >
              {testimonials[current].name}
            </motion.p>

            <div className="flex justify-center gap-3 mt-8">
              <button onClick={prev} className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-accent transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button onClick={next} className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-accent transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
