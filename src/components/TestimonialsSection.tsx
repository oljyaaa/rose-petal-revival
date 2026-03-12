import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, PenLine, X, Send } from "lucide-react";

const API_URL = "https://thebeauty-room.com/commentsapi.php";

interface Testimonial {
  id: number;
  name: string;
  service: string;
  description: string;
  rating: number;
  created_at: string;
}

// ── Зірки для вибору рейтингу ─────────────────────────────────
const StarRating = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={28}
            className={`transition-colors duration-150 ${
              star <= (hovered || value)
                ? "fill-primary text-primary"
                : "fill-transparent text-muted-foreground/40"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

// ── Форма додавання відгуку ───────────────────────────────────
const AddReviewModal = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [form, setForm] = useState({ name: "", email: "", service: "", description: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Помилка");
      onSuccess();
      onClose();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Помилка. Спробуйте пізніше.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="glass rounded-2xl p-8 w-full max-w-md shadow-2xl pointer-events-auto relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors text-foreground"
          >
            <X size={18} />
          </button>

          <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Залишити відгук</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-body text-xs font-medium text-foreground mb-2">
                Ваша оцінка
              </label>
              <StarRating value={rating} onChange={setRating} />
            </div>

            <div>
              <label className="block font-body text-xs font-medium text-foreground mb-1.5">
                Ім'я <span className="text-primary">*</span>
              </label>
              <input
                required type="text" placeholder="Ваше ім'я"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-body text-sm"
              />
            </div>

            <div>
              <label className="block font-body text-xs font-medium text-foreground mb-1.5">
                Email <span className="text-primary">*</span>
              </label>
              <input
                required type="email" placeholder="your@email.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-body text-sm"
              />
            </div>

            <div>
              <label className="block font-body text-xs font-medium text-foreground mb-1.5">Послуга</label>
              <input
                type="text" placeholder="Яку послугу отримали?"
                value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-body text-sm"
              />
            </div>

            <div>
              <label className="block font-body text-xs font-medium text-foreground mb-1.5">
                Відгук <span className="text-primary">*</span>
              </label>
              <textarea
                required rows={4} placeholder="Поділіться враженнями..."
                value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-body text-sm resize-none"
              />
            </div>

            <button
              type="submit" disabled={submitting}
              className="w-full gradient-primary text-primary-foreground py-3 rounded-2xl font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Send size={15} />
              {submitting ? "Відправляємо..." : "Надіслати відгук"}
            </button>

            <p className="text-xs text-muted-foreground text-center font-body">
              Відгук з'явиться після модерації
            </p>
          </form>
        </div>
      </motion.div>
    </>
  );
};

// ── Головний компонент ────────────────────────────────────────
export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const loadTestimonials = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then((data: Testimonial[]) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const prev = () => setCurrent(c => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === testimonials.length - 1 ? 0 : c + 1));

  const handleSuccess = () => {
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
    loadTestimonials();
  };

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

        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="max-w-md mx-auto mb-6 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 text-center"
            >
              <p className="font-body text-sm text-primary font-medium">
                ✓ Дякуємо! Відгук додано.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-2xl mx-auto">
          {loading && (
            <div className="glass rounded-2xl p-12 text-center">
              <p className="font-body text-muted-foreground animate-pulse">Завантаження відгуків...</p>
            </div>
          )}

          {!loading && testimonials.length === 0 && (
            <div className="glass rounded-2xl p-12 text-center">
              <p className="font-body text-muted-foreground">Ще немає відгуків. Будьте першим!</p>
            </div>
          )}

          {!loading && testimonials.length > 0 && (
            <div className="glass rounded-2xl p-8 md:p-12 text-center relative">

              {/* Зірки з реального рейтингу */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < (testimonials[current].rating ?? 5)
                        ? "fill-primary text-primary"
                        : "fill-transparent text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="font-body text-lg text-foreground/80 italic leading-relaxed mb-4"
                >
                  "{testimonials[current].description}"
                </motion.p>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div key={`meta-${current}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="font-heading text-lg font-semibold text-foreground">
                    {testimonials[current].name}
                  </p>
                  {testimonials[current].service && (
                    <p className="font-body text-sm text-primary mt-1">
                      {testimonials[current].service}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

              {testimonials.length > 1 && (
                <>
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
                        key={i} onClick={() => setCurrent(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-6" : "bg-muted-foreground/30 w-2"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8"
          >
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-primary/40 text-primary font-body font-medium text-sm hover:bg-primary/5 transition-all"
            >
              <PenLine size={16} />
              Залишити відгук
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <AddReviewModal
            onClose={() => setModalOpen(false)}
            onSuccess={handleSuccess}
          />
        )}
      </AnimatePresence>
    </section>
  );
}