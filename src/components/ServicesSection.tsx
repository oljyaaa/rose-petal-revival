import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Доглядові процедури",
    description: "Професійний догляд за шкірою обличчя з використанням преміальної косметики",
    image: "/images/service-skincare.jpg",
  },
  {
    title: "Масаж",
    description: "Розслаблюючий та лікувальний масаж для відновлення вашого тіла та духу",
    image: "/images/service-relax.jpg",
  },
  {
    title: "Елос-епіляція",
    description: "Сучасна технологія видалення волосся — безболісно та ефективно",
    image: "/images/service-epilation.jpg",
  },
  {
    title: "Корегування фігури",
    description: "Апаратні та ручні методики для ідеального силуету вашого тіла",
    image: "/images/service-nails.jpg",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative overflow-hidden rounded-2xl hover-lift"
    >
      <div className="aspect-[4/5] overflow-hidden rounded-2xl">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent rounded-2xl" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-heading text-xl font-semibold text-primary-foreground mb-2">{service.title}</h3>
        <p className="font-body text-sm text-primary-foreground/80 leading-relaxed">{service.description}</p>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm font-medium text-primary uppercase tracking-widest">Що ми пропонуємо</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3">Наші послуги</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
