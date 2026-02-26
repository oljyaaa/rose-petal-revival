import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Sparkles, Heart, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

const categories = [
  {
    name: "Ін'єкційна косметологія",
    icon: Sparkles,
    items: [
      { service: "Мезотерапія обличчя", price: "від 1 200 ₴" },
      { service: "Біоревіталізація", price: "від 2 500 ₴" },
      { service: "Ботулінотерапія", price: "від 2 000 ₴" },
      { service: "Контурна пластика", price: "від 3 500 ₴" },
      { service: "Плазмоліфтинг", price: "від 1 800 ₴" },
    ],
  },
  {
    name: "Безін'єкційний догляд",
    icon: Heart,
    items: [
      { service: "Чистка обличчя (комбінована)", price: "від 800 ₴" },
      { service: "Хімічний пілінг", price: "від 600 ₴" },
      { service: "Мікродермабразія", price: "від 900 ₴" },
      { service: "Альгінатна маска", price: "від 400 ₴" },
      { service: "LED-терапія", price: "від 500 ₴" },
    ],
  },
  {
    name: "Масаж",
    icon: Heart,
    featured: true,
    items: [
      { service: "Класичний масаж (спина)", price: "від 500 ₴" },
      { service: "Масаж усього тіла", price: "від 900 ₴" },
      { service: "Антицелюлітний масаж", price: "від 700 ₴" },
      { service: "Лімфодренажний масаж", price: "від 800 ₴" },
      { service: "Масаж обличчя та шиї", price: "від 400 ₴" },
    ],
  },
  {
    name: "Елос-епіляція",
    icon: Zap,
    items: [
      { service: "Зона бікіні", price: "від 500 ₴" },
      { service: "Ноги повністю", price: "від 1 500 ₴" },
      { service: "Руки повністю", price: "від 600 ₴" },
      { service: "Обличчя", price: "від 300 ₴" },
      { service: "Зона пахв", price: "від 250 ₴" },
    ],
  },
];

function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = category.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className={`rounded-2xl p-6 md:p-8 transition-all duration-300 hover-glow ${
        category.featured
          ? "gradient-primary text-primary-foreground shadow-lg"
          : "glass"
      }`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2.5 rounded-xl ${category.featured ? "bg-primary-foreground/20" : "bg-primary/10"}`}>
          <Icon className={`w-5 h-5 ${category.featured ? "text-primary-foreground" : "text-primary"}`} />
        </div>
        <h3 className={`font-heading text-xl md:text-2xl font-bold ${category.featured ? "" : "text-foreground"}`}>
          {category.name}
        </h3>
      </div>

      <ul className="space-y-3.5">
        {category.items.map((item) => (
          <li key={item.service} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Check className={`w-4 h-4 flex-shrink-0 ${category.featured ? "text-primary-foreground/80" : "text-primary"}`} />
              <span className={`font-body text-sm ${category.featured ? "" : "text-foreground"}`}>
                {item.service}
              </span>
            </div>
            <span className={`font-body text-sm font-semibold whitespace-nowrap ${category.featured ? "text-primary-foreground/90" : "text-primary"}`}>
              {item.price}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

const PricesAndServices = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-80px" });

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
            <span className="font-body text-sm font-medium text-primary uppercase tracking-widest">Прозорі ціни</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mt-3 mb-4">Ціни та послуги</h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Повний перелік наших процедур з актуальними цінами. Консультація — безкоштовно.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.name} category={cat} index={i} />
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
