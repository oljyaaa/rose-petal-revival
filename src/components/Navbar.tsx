import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Головна", href: "#hero" },
  { label: "Послуги", href: "#services" },
  { label: "Ціни", href: "#pricing" },
  { label: "Відгуки", href: "#testimonials" },
  { label: "Галерея", href: "#gallery" },
  { label: "Контакти", href: "#footer" },
];

export default function Navbar({ onBooking }: { onBooking: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#hero" className="font-heading text-2xl font-bold text-foreground tracking-wide">
          Beauty <span className="text-gradient">&</span> Room
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="relative font-body text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
          >
            <AnimatePresence mode="wait">
              {dark ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <Sun size={18} />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <Moon size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <button
            onClick={onBooking}
            className="gradient-primary text-primary-foreground px-6 py-2.5 rounded-2xl font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Записатись
          </button>
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center gap-3">
          <button onClick={() => setDark(!dark)} className="p-2 rounded-full bg-secondary text-secondary-foreground">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-foreground">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left font-body text-foreground/80 hover:text-foreground py-2 px-3 rounded-xl hover:bg-accent/50 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { setMobileOpen(false); onBooking(); }}
                className="gradient-primary text-primary-foreground px-6 py-3 rounded-2xl font-medium text-sm mt-2"
              >
                Записатись
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
