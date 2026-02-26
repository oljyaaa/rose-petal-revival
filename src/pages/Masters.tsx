import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Award, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

const masters = [
  {
    name: "Ольга",
    role: "Лікар-косметолог",
    experience: "15 років досвіду",
    specialties: ["Ін'єкційна косметологія", "Біоревіталізація", "Мезотерапія"],
    description: "Сертифікований лікар-косметолог з багаторічним досвідом роботи. Спеціалізується на ін'єкційних та апаратних методиках омолодження.",
    image: "/images/1.jpg",
    instagram: "https://www.instagram.com/dr.cosmetolog_olga_svetla/",
  },
  {
    name: "Анна",
    role: "Масажист",
    experience: "10 років досвіду",
    specialties: ["Лікувальний масаж", "Лімфодренажний масаж", "Масаж обличчя"],
    description: "Професійний масажист з медичною освітою. Працює з класичними та сучасними техніками масажу.",
    image: "/images/4.jpg",
    instagram: "https://www.instagram.com/anna_garmonia_tila?igsh=emFyaXY4Z2U0N3Rs",
  },
  {
    name: "Катерина",
    role: "Спеціаліст з епіляції, косметолог",
    experience: "6 років досвіду",
    specialties: ["Елос-епіляція", "Електроепіляція", "Доглядові процедури"],
    description: "Сертифікований спеціаліст з апаратної та ручної депіляції. Використовує найсучасніше обладнання.",
    image: "/images/2.jpg",
    instagram: "https://www.instagram.com/katerink_1997/",
  },
  {
    name: "Юлія",
    role: "Косметолог",
    experience: "2 років досвіду",
    specialties: ["Чистка обличчя", "Пілінги", "Догляд за шкірою"],
    description: "Досвідчений косметолог-естетист, спеціалізується на безін'єкційних процедурах догляду за шкірою обличчя.",
    image: "/images/5.jpg",
    instagram: "https://www.instagram.com/yuliia.cosmetolog2023/",
  },
  {
    name: "Євгенія",
    role: "Косметолог",
    experience: "2 років досвіду",
    specialties: ["Чистка обличчя", "Пілінги", "Догляд за шкірою"],
    description: "Досвідчений косметолог-естетист, спеціалізується на безін'єкційних процедурах догляду за шкірою обличчя.",
    image: "/images/3.jpg",
    instagram: "https://thebeauty-room.com/BeautyRoomSite/specialists.html#",
  },
];

function MasterCard({ master, index }: { master: typeof masters[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="glass rounded-2xl overflow-hidden hover-lift group"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={master.image}
          alt={master.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-foreground mb-1">{master.name}</h3>
        <p className="font-body text-sm text-primary font-medium mb-3">{master.role}</p>

        <div className="flex items-center gap-2 mb-3">
          <Clock size={14} className="text-muted-foreground" />
          <span className="font-body text-xs text-muted-foreground">{master.experience}</span>
        </div>

        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{master.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {master.specialties.map((s) => (
            <span key={s} className="font-body text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={master.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
          >
            <Instagram size={16} />
          </a>
          <div className="flex items-center gap-1 text-primary">
            <Award size={14} />
            <span className="font-body text-xs font-medium">Сертифікований</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Masters = () => {
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
            <span className="font-body text-sm font-medium text-primary uppercase tracking-widest">Наша команда</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mt-3 mb-4">Наші майстри</h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Професійні косметологи та масажисти з багаторічним досвідом та сертифікатами міжнародного зразка
            </p>
          </motion.div>
        </div>
      </section>

      {/* Masters Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {masters.map((master, i) => (
              <MasterCard key={master.name} master={master} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Оберіть свого майстра
          </h2>
          <p className="font-body text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Запишіться на консультацію до будь-якого нашого спеціаліста
          </p>
          <button
            onClick={() => setBookingOpen(true)}
            className="bg-background text-foreground px-8 py-4 rounded-2xl font-medium text-base hover:opacity-90 transition-all hover-lift"
          >
            Записатись на прийом
          </button>
        </div>
      </section>

      <Footer />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </main>
  );
};

export default Masters;
