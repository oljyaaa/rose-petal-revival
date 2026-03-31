import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Petal SVG shape
function Petal({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 40 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M20 58C20 58 2 44 2 24C2 12.954 10.059 4 20 4C29.941 4 38 12.954 38 24C38 44 20 58 20 58Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
    </svg>
  );
}

const PETALS = [
  { top: "18%", left: "22%", size: 36, rotate: -30, delay: 0.0 },
  { top: "14%", left: "44%", size: 28, rotate: 10,  delay: 0.1 },
  { top: "20%", left: "64%", size: 32, rotate: 45,  delay: 0.2 },
  { top: "38%", left: "76%", size: 24, rotate: 80,  delay: 0.3 },
  { top: "58%", left: "70%", size: 30, rotate: 120, delay: 0.2 },
  { top: "68%", left: "50%", size: 26, rotate: 160, delay: 0.1 },
  { top: "62%", left: "28%", size: 34, rotate: 200, delay: 0.0 },
  { top: "42%", left: "16%", size: 22, rotate: 240, delay: 0.15 },
];

export default function PageLoader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 600);
    const t2 = setTimeout(() => setPhase("out"), 1600);
    const t3 = setTimeout(() => onDone(), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== "out" ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "hsl(var(--background))" }}
        >
          {/* Rotating petals ring */}
          <motion.div
            className="absolute"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: [0, 15] }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: 220, height: 220 }}
          >
            {PETALS.map((p, i) => (
              <motion.div
                key={i}
                className="absolute text-primary"
                style={{
                  top: p.top,
                  left: p.left,
                  width: p.size,
                  height: p.size * 1.5,
                  transform: `rotate(${p.rotate}deg)`,
                }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: [0, 1, 1], scale: [0.4, 1.1, 1] }}
                transition={{ duration: 0.5, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
              >
                <Petal />
              </motion.div>
            ))}
          </motion.div>

          {/* Center glow */}
          <motion.div
            className="absolute rounded-full bg-primary/20 blur-2xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ width: 120, height: 120 }}
          />

          {/* Brand name */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="font-heading text-foreground font-light tracking-[0.22em] uppercase"
              style={{ fontSize: "clamp(1.1rem, 3vw, 1.6rem)", letterSpacing: "0.25em" }}
            >
              Beauty
            </p>
            <div className="flex items-center justify-center gap-2 my-1">
              <div className="h-px w-8 bg-primary/40" />
              <div className="w-1 h-1 rounded-full bg-primary/60" />
              <div className="h-px w-8 bg-primary/40" />
            </div>
            <p
              className="font-heading text-primary font-light tracking-[0.3em] uppercase"
              style={{ fontSize: "clamp(0.7rem, 1.5vw, 0.95rem)" }}
            >
              Room
            </p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 h-px bg-primary/20 rounded-full overflow-hidden"
            style={{ width: 120 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
