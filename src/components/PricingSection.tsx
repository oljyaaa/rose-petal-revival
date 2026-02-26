import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Косметологія",
    items: [
      { service: "Чистка обличчя", price: "від 800 ₴" },
      { service: "Пілінг", price: "від 600 ₴" },
      { service: "Мезотерапія", price: "від 1200 ₴" },
      { service: "Біоревіталізація", price: "від 2500 ₴" },
    ],
  },
  {
    name: "Масаж",
    featured: true,
    items: [
      { service: "Класичний масаж", price: "від 500 ₴" },
      { service: "Антицелюлітний", price: "від 700 ₴" },
      { service: "Лімфодренажний", price: "від 800 ₴" },
      { service: "Масаж обличчя", price: "від 400 ₴" },
    ],
  },
  {
    name: "Елос-епіляція",
    items: [
      { service: "Зона бікіні", price: "від 500 ₴" },
      { service: "Ноги повністю", price: "від 1500 ₴" },
      { service: "Руки", price: "від 600 ₴" },
      { service: "Обличчя", price: "від 300 ₴" },
    ],
  },
];

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm font-medium text-primary uppercase tracking-widest">Прозорі ціни</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3">Ціни та послуги</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`rounded-2xl p-8 transition-all duration-300 hover-glow ${
                plan.featured
                  ? "gradient-primary text-primary-foreground scale-105 shadow-lg"
                  : "glass"
              }`}
            >
              <h3 className={`font-heading text-2xl font-bold mb-6 ${plan.featured ? "" : "text-foreground"}`}>
                {plan.name}
              </h3>
              <ul className="space-y-4">
                {plan.items.map((item) => (
                  <li key={item.service} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.featured ? "text-primary-foreground/80" : "text-primary"}`} />
                    <div className="flex-1">
                      <div className={`font-body text-sm font-medium ${plan.featured ? "" : "text-foreground"}`}>
                        {item.service}
                      </div>
                      <div className={`font-body text-xs mt-0.5 ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {item.price}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
