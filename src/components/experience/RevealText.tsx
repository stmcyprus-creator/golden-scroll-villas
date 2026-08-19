import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Word-by-word reveal — as if the text is being written by light.
 * Each line animates on its own, never all at once.
 */
export function RevealText({
  text,
  className = "",
  delay = 0,
  stagger = 0.09,
  duration = 1.6,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: "0.55em", filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: "0em", filter: "blur(0px)" }}
            viewport={{ once, margin: "-12%" }}
            transition={{ duration, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** A single element that floats in, slowly. */
export function Rise({
  children,
  delay = 0,
  y = 28,
  duration = 1.5,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
