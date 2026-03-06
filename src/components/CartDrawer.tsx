import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, Send, Plus, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

// ── Змінити імена майстрів тут ──────────────────────────────
<<<<<<< HEAD
const MASTERS = ["Будь-який майстер", "Ольга", "Катерина", "Євгенія", "Юлія", "Анна"];

const API_URL = "https://thebeauty-room.com/appointmentapi.php";

const CartDrawer = () => {
  const { items, removeItem, clearCart, isOpen, closeCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [itemsExpanded, setItemsExpanded] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", message: "", master: "Будь-який майстер",
  });

  const totalPrice = items.reduce((sum, i) => sum + i.price, 0);
  const hasMany = items.length > 1;
  const visibleItems = hasMany && !itemsExpanded ? [items[0]] : items;
  const extraCount = items.length - 1;
  const extraLabel =
    extraCount === 1 ? "1 процедуру" :
    extraCount < 5  ? `${extraCount} процедури` :
                      `${extraCount} процедур`;

  const handleAddMore = () => { closeCart(); navigate("/prices"); };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: "Заповніть ім'я та телефон", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, phone: form.phone, email: form.email,
          message: form.message,
          master: form.master !== "Будь-який майстер" ? form.master : "",
          cart: items.map((i) => ({ cat: i.cat, name: i.name, price: i.price })),
        }),
      });
      if (!res.ok) throw new Error("Помилка сервера");
      toast({ title: "Записано!", description: "Ми зв'яжемося з вами найближчим часом." });
      clearCart(); closeCart(); setShowForm(false); setItemsExpanded(false);
      setForm({ name: "", phone: "", email: "", message: "", master: "Будь-який майстер" });
    } catch {
      toast({ title: "Помилка", description: "Спробуйте пізніше", variant: "destructive" });
    } finally { setSubmitting(false); }
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-20 h-[calc(100vh-5rem)] w-full max-w-md bg-background border-l border-border z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-primary" />
                <span className="font-medium text-sm">Кошик</span>
                {items.length > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {items.length}
                  </span>
                )}
              </div>
              <button onClick={closeCart} className="p-1.5 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            {/* Scrollable */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {/* Empty */}
              {items.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 gap-3 px-6 text-muted-foreground">
                  <ShoppingBag size={40} className="opacity-20" />
                  <p className="text-sm">Кошик порожній</p>
                  <p className="text-xs text-center">Перейдіть на сторінку цін та додайте послуги</p>
                  <button onClick={handleAddMore} className="mt-2 px-6 py-2.5 rounded-2xl border border-primary/40 text-primary text-sm font-medium hover:bg-primary/5 transition-all">
                    Перейти до прайсу
                  </button>
                </div>
              )}

              {items.length > 0 && (
                <div className="px-6 pt-5 pb-4 space-y-2">
                  {/* Items */}
                  <AnimatePresence initial={false}>
                    {visibleItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.18 }}
                        className="flex items-start justify-between gap-3 bg-secondary/40 rounded-xl px-4 py-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium leading-snug">{item.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.cat}</p>
                          <p className="text-xs font-semibold text-primary mt-1">{item.priceLabel}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors mt-0.5 p-1 rounded hover:bg-destructive/10">
                          <Trash2 size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Expand toggle */}
                  {hasMany && (
                    <button
                      onClick={() => setItemsExpanded((v) => !v)}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ChevronDown size={14} className={`transition-transform duration-300 ${itemsExpanded ? "rotate-180" : ""}`} />
                      {itemsExpanded ? "Сховати" : `Показати ще ${extraLabel}`}
                    </button>
                  )}

                  {/* Total */}
                  {totalPrice > 0 && (
                    <div className="flex justify-between text-sm font-medium border-t border-border pt-3 mt-1">
                      <span className="text-muted-foreground">Орієнтовна сума:</span>
                      <span className="text-primary font-bold">{totalPrice} грн</span>
                    </div>
                  )}

                  {/* Form collapsible */}
                  <AnimatePresence initial={false}>
                    {showForm && (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pb-1 space-y-3 border-t border-border mt-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Дані для запису</p>
                            <button type="button" onClick={() => setShowForm(false)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">Сховати</button>
                          </div>
                          <input type="text" placeholder="Ваше ім'я *" value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                          <input type="tel" placeholder="Телефон *" value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                          <input type="email" placeholder="Email" value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                          <select value={form.master} onChange={(e) => setForm({ ...form, master: e.target.value })}
                            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                            {MASTERS.map((m) => <option key={m} value={m}>{m}</option>)}
                          </select>
                          <textarea placeholder="Повідомлення (необов'язково)" value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            rows={3} className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Fixed bottom buttons */}
            {items.length > 0 && (
              <div className="px-6 py-4 border-t border-border space-y-2.5 shrink-0 bg-background">
                <button
                  onClick={() => showForm ? handleSubmit() : setShowForm(true)}
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={15} />
                  {submitting ? "Відправляємо..." : showForm ? "Підтвердити запис" : "Записатись"}
                </button>
                <button
                  onClick={handleAddMore}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-primary/30 text-primary text-sm font-medium hover:bg-primary/5 transition-all"
                >
                  <span className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shadow-[0_0_10px_3px_rgba(219,112,147,0.4)]">
                    <Plus size={12} className="text-primary" />
                  </span>
                  Додати процедури
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;
