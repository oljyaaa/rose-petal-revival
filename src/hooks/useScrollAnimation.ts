import { useRef } from "react";
import { useInView, Variants } from "framer-motion";

export type AnimationPreset =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "scaleUp"
  | "scaleIn"
  | "slideReveal"
  | "blur"
  | "rotateIn";

const presets: Record<AnimationPreset, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 48 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
    }),
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
    }),
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: (i: number = 0) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
    }),
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: (i: number = 0) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
    }),
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i: number = 0) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.6 },
    visible: (i: number = 0) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] },
    }),
  },
  slideReveal: {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: (i: number = 0) => ({
      clipPath: "inset(0 0% 0 0)",
      transition: { duration: 1.1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
    }),
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(16px)", y: 20 },
    visible: (i: number = 0) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.85, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
    }),
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -8, scale: 0.9 },
    visible: (i: number = 0) => ({
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.75, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] },
    }),
  },
};

export function useScrollAnimation(
  preset: AnimationPreset = "fadeUp",
  options?: { once?: boolean; margin?: string }
) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: options?.margin ?? "-80px",
  });

  return {
    ref,
    isInView,
    variants: presets[preset],
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
  };
}
