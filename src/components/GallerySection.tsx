import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const galleryItems = [
  { before: "/images/Face1.jpg", after: "/images/face2.jpg", label: "Догляд за шкірою" },
  { before: "/images/lips1.jpg", after: "/images/lips2.jpg", label: "Губи" },
  { before: "/images/cleanFace1.jpg", after: "/images/Clean2.jpg", label: "Обличчя" },
];

function BeforeAfterCard({ item, index }: { item: typeof galleryItems[0]; index: number }) {
  const [sliderPos, setSliderPos] = useState(50);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="space-y-3"
    >
      <div
        ref={containerRef}
        className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-col-resize select-none"
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        <img src={item.after} alt="Після" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
          <img src={item.before} alt="До" className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: `${100 / (sliderPos / 100)}%` }} loading="lazy" />
        </div>
        <div className="absolute top-0 bottom-0" style={{ left: `${sliderPos}%` }}>
          <div className="w-0.5 h-full bg-primary-foreground/80" />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full glass flex items-center justify-center">
            <span className="text-foreground text-xs font-bold">↔</span>
          </div>
        </div>
        <div className="absolute top-3 left-3 glass px-3 py-1 rounded-full text-xs font-medium text-foreground">До</div>
        <div className="absolute top-3 right-3 glass px-3 py-1 rounded-full text-xs font-medium text-foreground">Після</div>
      </div>
      <p className="font-heading text-center text-foreground font-medium">{item.label}</p>
    </motion.div>
  );
}

export default function GallerySection() {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm font-medium text-primary uppercase tracking-widest">Результати</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3">До & Після</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {galleryItems.map((item, i) => (
            <BeforeAfterCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
