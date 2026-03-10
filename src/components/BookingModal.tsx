import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Zap, Heart, Shield, Send } from "lucide-react";
import { useState } from "react";

// ── Майстри ──────────────────────────────────────────────────
const MASTERS = ["Будь-який майстер", "Ольга", "Катерина", "Анна", "Євгенія", "Юлія"];

// ── API ───────────────────────────────────────────────────────
const API_URL = "https://thebeauty-room.com/appointmentapi.php";

// ── Переваги салону — ліва колонка ────────────────────────────
const features = [
  {
    icon: Sparkles,
    title: "Ін'єкційна косметологія",
    desc: "Біоревіталізація, ботокс, філери",
  },
  {
    icon: Zap,
    title: "Лазер та апаратні процедури",
    desc: "SMAS-ліфтинг, ELOS-епіляція, RF",
  },
  {
    icon: Heart,
    title: "Масаж та догляд",
    desc: "Класичний, лікувальний, антистрес",
  },
  {
    icon: Shield,
    title: "Сертифіковані препарати",
    desc: "Тільки перевірені виробники",
  },
];

export default function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", service: "", master: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    form.name,
          phone:   form.phone,
          email:   form.email,
          service: form.service,
          message: form.message,
          master:  form.master !== "Будь-який майстер" ? form.master : "",
          cart:    [],
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", phone: "", email: "", service: "", master: "", message: "" });
        onClose();
      }, 2500);
    } catch {
      alert("Помилка. Спробуйте пізніше.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
          />

          {/* Modal — landscape like Steam */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative z-10 w-full max-w-4xl glass rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* ── LEFT PANEL ── */}
            <div className="gradient-primary text-primary-foreground p-8 md:w-2/5 flex flex-col justify-between shrink-0">
              <div>
                <p className="font-body text-xs font-medium uppercase tracking-widest opacity-70 mb-2">
                  Beauty & Room
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
                  Записатись на процедуру
                </h2>
                <p className="font-body text-sm opacity-80 mb-8 leading-relaxed">
                  Залиште заявку — ми зв'яжемося з вами для підтвердження зручного часу.
                </p>

                <div className="space-y-4">
                  {features.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-primary-foreground/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={15} />
                      </div>
                      <div>
                        <p className="font-body text-sm font-semibold">{title}</p>
                        <p className="font-body text-xs opacity-70">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="font-body text-xs opacity-50 mt-8 hidden md:block">
                Консультація — безкоштовно
              </p>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="flex-1 p-8 overflow-y-auto">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors text-foreground z-10"
              >
                <X size={18} />
              </button>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-foreground text-2xl">✓</span>
                  </div>
                  <h4 className="font-heading text-xl font-bold text-foreground mb-2">Дякуємо!</h4>
                  <p className="font-body text-muted-foreground text-sm">
                    Ми зв'яжемось з вами найближчим часом.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-5">
                    Ваші дані
                  </h3>

                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-xs font-medium text-foreground mb-1.5">
                        Ім'я <span className="text-primary">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Ваше ім'я"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-body text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs font-medium text-foreground mb-1.5">
                        Телефон <span className="text-primary">*</span>
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+380 ..."
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-body text-sm"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-body text-xs font-medium text-foreground mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-body text-sm"
                    />
                  </div>

                  {/* Service + Master */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-xs font-medium text-foreground mb-1.5">
                        Послуга
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-body text-sm"
                      >
                        <option value="">Оберіть послугу</option>
                        <option>Ін'єкційна косметологія</option>
                        <option>Безін'єкційний догляд</option>
                        <option>Масаж</option>
                        <option>Елос-епіляція</option>
                        <option>SMAS-ліфтинг</option>
                        <option>RF-ліфтинг</option>
                        <option>Лазерні процедури</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-body text-xs font-medium text-foreground mb-1.5">
                        Майстер
                      </label>
                      <select
                        value={form.master}
                        onChange={(e) => setForm({ ...form, master: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-body text-sm"
                      >
                        {MASTERS.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-body text-xs font-medium text-foreground mb-1.5">
                      Повідомлення
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Додаткові побажання..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-body text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full gradient-primary text-primary-foreground py-3.5 rounded-2xl font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                    {submitting ? "Відправляємо..." : "Надіслати заявку"}
                  </button>

                  <p className="font-body text-xs text-muted-foreground text-center">
                    Консультація безкоштовна. Підтвердження — протягом години.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
