import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

export default function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md z-50 glass rounded-2xl p-8 overflow-y-auto max-h-[90vh]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-2xl font-bold text-foreground">Записатись</h3>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary transition-colors text-foreground">
                <X size={20} />
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground text-2xl">✓</span>
                </div>
                <h4 className="font-heading text-xl font-bold text-foreground mb-2">Дякуємо!</h4>
                <p className="font-body text-muted-foreground">Ми зв'яжемось з вами найближчим часом.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-1.5">Ім'я</label>
                  <input
                    required
                    type="text"
                    placeholder="Ваше ім'я"
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body"
                  />
                </div>
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-1.5">Телефон</label>
                  <input
                    required
                    type="tel"
                    placeholder="+380 ..."
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body"
                  />
                </div>
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-1.5">Послуга</label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body"
                  >
                    <option value="">Оберіть послугу</option>
                    <option>Ін'єкційна косметологія</option>
                    <option>Безін'єкційний догляд</option>
                    <option>Масаж</option>
                    <option>Елос-епіляція</option>
                  </select>
                </div>
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-1.5">Повідомлення</label>
                  <textarea
                    rows={3}
                    placeholder="Додаткові побажання..."
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-body resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full gradient-primary text-primary-foreground py-3.5 rounded-2xl font-medium text-base hover:opacity-90 transition-opacity"
                >
                  Надіслати заявку
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
