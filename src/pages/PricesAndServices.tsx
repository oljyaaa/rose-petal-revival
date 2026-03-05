import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, Plus, Sparkles, Zap, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Service {
  id: number;
  name: string;
  price: string;
  priceNumeric: number;
}

interface Category {
  id: number;
  name: string;
  services: Service[];
}

// ─── TAB CONFIG ───────────────────────────────────────────────────────────────

const TAB_CONFIG = [
  {
    label: "ІН'ЄКЦІЙНІ ПРОЦЕДУРИ",
    icon: Sparkles,
    categoryIds: [12, 13, 14, 15, 16, 17, 19],
    featured: false,
  },
  {
    label: "ЛАЗЕР / SMAS",
    icon: Zap,
    categoryIds: [8, 9, 10, 11, 23, 24],
    featured: true, // gradient card
  },
  {
    label: "RF / ПІГМЕНТАЦІЯ / ІНШЕ",
    icon: Layers,
    categoryIds: [1, 2, 3, 4, 5, 6, 7, 18, 20, 21, 22, 25, 26, 27, 28, 29],
    featured: false,
  },
];

const API_URL = "https://thebeauty-room.com/priceapi.php";

// ─── ACCORDION ROW ────────────────────────────────────────────────────────────

const CategoryAccordion = ({
  category,
  featured,
}: {
  category: Category;
  featured: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const { addItem, toggleCart } = useCart();
  const { toast } = useToast();

  const handleAdd = (svc: Service, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      serviceId: svc.id,
      cat: category.name,
      name: svc.name,
      price: svc.priceNumeric,
      priceLabel: svc.price,
    });
    toast({ title: "Додано до кошика", description: svc.name });
    toggleCart();
  };

  return (
    <div className={`border-b last:border-b-0 ${featured ? "border-primary-foreground/20" : "border-border"}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 text-left group"
      >
        <span className={`font-body text-sm font-medium transition-colors leading-snug pr-3 ${
          featured
            ? "text-primary-foreground group-hover:text-primary-foreground/80"
            : "text-foreground group-hover:text-primary"
        }`}>
          {category.name}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          } ${featured ? "text-primary-foreground/60" : "text-muted-foreground"}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`mb-3 rounded-xl overflow-hidden divide-y ${
              featured
                ? "bg-primary-foreground/10 divide-primary-foreground/10"
                : "bg-secondary/40 divide-border/50"
            }`}>
              {category.services.map((svc) => (
                <div
                  key={svc.id}
                  className={`flex items-center justify-between gap-2 py-2.5 px-3 transition-colors ${
                    featured ? "hover:bg-primary-foreground/10" : "hover:bg-secondary/70"
                  }`}
                >
                  <span className={`font-body text-xs leading-snug flex-1 min-w-0 ${
                    featured ? "text-primary-foreground/90" : "text-muted-foreground"
                  }`}>
                    {svc.name}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`font-body text-xs font-semibold whitespace-nowrap ${
                      featured ? "text-primary-foreground" : "text-primary"
                    }`}>
                      {svc.price}
                    </span>
                    <button
                      onClick={(e) => handleAdd(svc, e)}
                      title="Додати до кошика"
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shrink-0 ${
                        featured
                          ? "bg-primary-foreground/20 hover:bg-primary-foreground/40 text-primary-foreground"
                          : "bg-primary/15 hover:bg-primary hover:text-primary-foreground text-primary"
                      }`}
                    >
                      <Plus size={13} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── TAB CARD ─────────────────────────────────────────────────────────────────

const TabCard = ({
  tab,
  index,
  categories,
  loading,
}: {
  tab: typeof TAB_CONFIG[0];
  index: number;
  categories: Category[];
  loading: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = tab.icon;

  const tabCategories = categories.filter((cat) =>
    tab.categoryIds.includes(cat.id)
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className={`rounded-2xl p-6 md:p-8 transition-all duration-300 hover-glow ${
        tab.featured
          ? "gradient-primary text-primary-foreground shadow-lg"
          : "glass"
      }`}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2.5 rounded-xl ${tab.featured ? "bg-primary-foreground/20" : "bg-primary/10"}`}>
          <Icon className={`w-5 h-5 ${tab.featured ? "text-primary-foreground" : "text-primary"}`} />
        </div>
        <h3 className={`font-heading text-lg md:text-xl font-bold leading-tight ${
          tab.featured ? "text-primary-foreground" : "text-foreground"
        }`}>
          {tab.label}
        </h3>
      </div>

      {/* Loading */}
      {loading && (
        <div className={`text-xs text-center py-8 animate-pulse ${
          tab.featured ? "text-primary-foreground/60" : "text-muted-foreground"
        }`}>
          Завантаження...
        </div>
      )}

      {/* Categories accordion */}
      {!loading && tabCategories.length > 0 && (
        <div>
          {tabCategories.map((cat) => (
            <CategoryAccordion
              key={cat.id}
              category={cat}
              featured={tab.featured}
            />
          ))}
        </div>
      )}

      {!loading && tabCategories.length === 0 && (
        <div className={`text-xs text-center py-8 ${
          tab.featured ? "text-primary-foreground/60" : "text-muted-foreground"
        }`}>
          Немає послуг
        </div>
      )}
    </motion.div>
  );
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────

const PricesAndServices = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-80px" });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Array<{ id: number; name: string; services: Array<{ id: number; name: string; price: string }> }>) => {
        setAllCategories(
          data.map((cat) => ({
            id: cat.id,
            name: cat.name,
            services: cat.services.map((svc) => {
              const match = svc.price.replace(/\s/g, "").match(/^(\d+)/);
              return {
                id: svc.id,
                name: svc.name,
                price: svc.price,
                priceNumeric: match ? parseInt(match[1], 10) : 0,
              };
            }),
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
            <span className="font-body text-sm font-medium text-primary uppercase tracking-widest">
              Прозорі ціни
            </span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mt-3 mb-4">
              Ціни та послуги
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Натисніть <span className="text-primary font-semibold">+</span> біля послуги, щоб додати до кошика та записатись. Консультація — безкоштовно.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Grid — 3 картки як раніше */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {TAB_CONFIG.map((tab, i) => (
              <TabCard
                key={tab.label}
                tab={tab}
                index={i}
                categories={allCategories}
                loading={loading}
              />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center font-body text-sm text-muted-foreground mt-12 max-w-lg mx-auto"
          >
            * Остаточна вартість визначається після консультації з фахівцем. Можливі індивідуальні програми та знижки на курс процедур.
          </motion.p>
        </div>
      </section>

      <Footer />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </main>
  );
};

export default PricesAndServices;
