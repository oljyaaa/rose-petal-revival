import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Shield, Heart, MapPin, Phone, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

const values = [
  {
    icon: Award,
    title: "Професіоналізм",
    description: "Всі наші спеціалісти мають медичну освіту та регулярно підвищують кваліфікацію на міжнародних конференціях.",
  },
  {
    icon: Shield,
    title: "Безпека",
    description: "Використовуємо виключно сертифіковані препарати та обладнання. Дотримуємося всіх стандартів стерильності.",
  },
  {
    icon: Heart,
    title: "Індивідуальний підхід",
    description: "Кожен клієнт отримує персональну програму догляду, складену з урахуванням особливостей шкіри та побажань.",
  },
];

const About = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-80px" });
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });

  return (
    <main className="min-h-screen bg-background">
      <Navbar onBooking={() => setBookingOpen(true)} />

      {/* Hero */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-sm font-medium text-primary uppercase tracking-widest">Про нас</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mt-3 mb-4">Beauty & Room</h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Косметологічний салон у місті Бердичів — ваш простір краси, здоров'я та гармонії
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="/images/hero-bg.jpg"
                  alt="Інтер'єр салону Beauty & Room"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-body text-sm font-medium text-primary uppercase tracking-widest">Наша історія</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                Простір, де краса зустрічає науку
              </h2>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                <p>
                  Beauty & Room — це сучасний косметологічний салон, заснований з метою надавати професійні послуги
                  найвищого рівня у затишній та комфортній атмосфері.
                </p>
                <p>
                  Ми спеціалізуємося на трьох ключових напрямках: косметологічні процедури для обличчя (ін'єкційні та безін'єкційні),
                  професійний масаж та елос-епіляція.
                </p>
                <p>
                  Наша команда — це досвідчені фахівці з медичною освітою, які постійно вдосконалюють свої навички
                  та працюють виключно з сертифікованими препаратами.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div
            ref={valuesRef}
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="font-body text-sm font-medium text-primary uppercase tracking-widest">Чому ми</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">Наші цінності</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="glass rounded-2xl p-6 text-center hover-lift"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />

      <TestimonialsSection />

      {/* Contact Info */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">Як нас знайти</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="glass rounded-2xl p-6 hover-lift">
                <MapPin className="w-6 h-6 text-primary mx-auto mb-3" />
                <a 
  href="https://maps.google.com/?q=м.+Бердичів,+вул.+Європейська,+71" 
  target="_blank" 
  rel="noopener noreferrer"
  className="group block cursor-pointer"
>
  <p className="font-body text-sm text-foreground font-medium group-hover:text-primary transition-colors">
    м. Бердичів
  </p>
  <p className="font-body text-xs text-muted-foreground mt-1 group-hover:text-primary/70 transition-colors">
    Житомирська область
  </p>
</a>
              </div>
              <div className="glass rounded-2xl p-6 hover-lift">
                <Phone className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="font-body text-sm text-foreground font-medium">+38 (098) 641-14-12</p>
                <p className="font-body text-xs text-muted-foreground mt-1">Щодня 9:00 – 18:00</p>
              </div>
              <div className="glass rounded-2xl p-6 hover-lift">
                <Clock className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="font-body text-sm text-foreground font-medium">Пн – Сб</p>
                <p className="font-body text-xs text-muted-foreground mt-1">9:00 – 18:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </main>
  );
};

export default About;
