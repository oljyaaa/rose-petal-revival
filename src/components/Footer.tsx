import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Heart, Instagram, Phone, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer id="footer" className="bg-card border-t border-border">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Beauty <span className="text-gradient">&</span> Room
            </h3>
            <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
              Професійний косметологічний салон у місті Бердичів. Косметологія, масаж та елос-епіляція.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/dr.cosmetolog_olga_svetla/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a href="tel:+380000000000" className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-accent transition-colors">
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-4">Навігація</h4>
            <ul className="space-y-2.5 font-body text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Головна</Link></li>
              <li><Link to="/masters" className="text-muted-foreground hover:text-foreground transition-colors">Наші майстри</Link></li>
              <li><Link to="/prices" className="text-muted-foreground hover:text-foreground transition-colors">Ціни та послуги</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">Про нас</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-4">Контакти</h4>
            <ul className="space-y-3 font-body text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-primary flex-shrink-0" />
                м. Бердичів, Житомирська область
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary flex-shrink-0" />
                +38 (0XX) XXX-XX-XX
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary flex-shrink-0" />
                info@beautyroom.ua
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-4">Розсилка</h4>
            <p className="font-body text-sm text-muted-foreground mb-4">
              Підпишіться на наші новини та отримуйте спеціальні пропозиції.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body text-sm"
              />
              <button
                type="submit"
                className="gradient-primary text-primary-foreground px-5 py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity flex-shrink-0"
              >
                {subscribed ? "✓" : "→"}
              </button>
            </form>
            {subscribed && (
              <p className="font-body text-xs text-primary mt-2">Дякуємо за підписку!</p>
            )}
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="font-body text-sm text-muted-foreground flex items-center justify-center gap-1">
            Зроблено з <Heart size={14} className="text-primary fill-primary" /> Beauty & Room © 2025
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
