import { Link } from "react-router-dom";
import { Instagram, MapPin, Phone, Clock, Facebook } from "lucide-react";

const Footer = () => (
  <footer className="bg-secondary border-t border-border">
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="font-heading text-2xl font-bold mb-3 text-foreground">
            Beauty Room<span className="text-primary">.</span>
          </h3>
          <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-xs mb-5">
            Ваш простір краси та релаксу. Професійна косметологія та турбота про здоров'я вашої шкіри.
          </p>
          <div className="flex gap-3">
            <a
              href="https://instagram.com/dr.cosmetolog_olga_svetla"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover-lift transition-all"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.facebook.com/ol.ga.svetlaa.2025?locale=uk_UA"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover-lift transition-all"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4 text-foreground">Навігація</h4>
          <ul className="space-y-2 text-sm font-body text-muted-foreground">
            {[
              { to: "/", label: "Головна" },
              { to: "/prices", label: "Ціни" },
              { to: "/reviews", label: "Відгуки" },
              { to: "/about", label: "Про нас" },
            ].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
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
        </div>

        {/* Working Hours */}
        <div>
          <h4 className="font-heading text-lg font-semibold mb-4 text-foreground">Графік роботи</h4>
          <ul className="space-y-2 text-sm font-body text-muted-foreground">
            {[
              { day: "Пн – Пт", time: "9:00 – 19:00" },
              { day: "Субота", time: "10:00 – 14:00" },
              { day: "Неділя", time: "За домовленістю" },
            ].map((h) => (
              <li key={h.day} className="flex items-center gap-3">
                <Clock size={16} className="shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground font-medium">{h.day}</strong> — {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-border text-center text-sm font-body text-muted-foreground">
        © {new Date().getFullYear()} Beauty Room. Всі права захищені.
      </div>
    </div>
  </footer>
);

export default Footer;