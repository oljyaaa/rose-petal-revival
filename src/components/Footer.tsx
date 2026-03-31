import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Instagram, MapPin, Phone, Clock, Facebook } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING_EASE = [0.34, 1.56, 0.64, 1] as const;

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const colVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.12, ease: EASE },
    }),
  };

  return (
    <footer
      ref={ref}
      className="bg-secondary border-t border-border relative overflow-hidden"
    >
      {/* Ambient top glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-primary/[0.03] blur-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.2 }}
      />

      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div
            custom={0}
            variants={colVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="font-heading text-2xl font-bold mb-3 text-foreground">
              Beauty Room<span className="text-primary">.</span>
            </h3>
            <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-xs mb-5">
              Ваш простір краси та релаксу. Професійна косметологія та турбота про здоров'я вашої шкіри.
            </p>
            <div className="flex gap-3">
              {[
                {
                  href: "https://instagram.com/dr.cosmetolog_olga_svetla",
                  icon: <Instagram size={18} />,
                  label: "Instagram",
                },
                {
                  href: "https://www.facebook.com/ol.ga.svetlaa.2025?locale=uk_UA",
                  icon: <Facebook size={18} />,
                  label: "Facebook",
                },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: SPRING_EASE }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            custom={1}
            variants={colVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h4 className="font-heading text-lg font-semibold mb-4 text-foreground">Навігація</h4>
            <ul className="space-y-2 text-sm font-body text-muted-foreground">
              {[
                { to: "/",         label: "Головна" },
                { to: "/prices",   label: "Ціни" },
                { to: "/reviews",  label: "Відгуки" },
                { to: "/about",    label: "Про нас" },
              ].map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
                >
                  <Link
                    to={link.to}
                    className="hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    <motion.span
                      className="inline-block w-3 h-px bg-primary/40 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.2 }}
                    />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contacts */}
          <motion.div
            custom={2}
            variants={colVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h4 className="font-heading text-lg font-semibold mb-4 text-foreground">Контакти</h4>
            <ul className="space-y-3 text-sm font-body text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                <a
                  href="https://maps.google.com/?q=м.+Бердичів,+вул.+Європейська,+71"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors text-left"
                >
                  м. Бердичів<br />вул. Європейська, 71
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-primary" />
                <a href="tel:+380986411412" className="hover:text-primary transition-colors">
                  (+380) 98-641-14-12
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Working Hours */}
          <motion.div
            custom={3}
            variants={colVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h4 className="font-heading text-lg font-semibold mb-4 text-foreground">Графік роботи</h4>
            <ul className="space-y-2 text-sm font-body text-muted-foreground">
              {[
                { day: "Пн – Пт", time: "9:00 – 19:00" },
                { day: "Субота",  time: "10:00 – 14:00" },
                { day: "Неділя",  time: "За домовленістю" },
              ].map((h, i) => (
                <motion.li
                  key={h.day}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                >
                  <Clock size={16} className="shrink-0 text-primary" />
                  <span>
                    <strong className="text-foreground font-medium">{h.day}</strong> — {h.time}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-12 pt-6 border-t border-border text-center text-sm font-body text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          © {new Date().getFullYear()} Beauty Room. Всі права захищені.
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;