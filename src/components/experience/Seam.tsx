import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE, TIMING, useCinematics } from "./orchestrator";

/**
 * A cinematic cut between two scenes.
 * A thread of light carries the eye down while a single whispered line
 * hands the story from one chapter to the next — no block ever "ends".
 * All timings come from the Transition Orchestrator.
 */
export function Seam({
  line,
  id,
}: {
  /** The connective whisper. Keep it to a few words. */
  line?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled, lowPower } = useCinematics();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const draw = useTransform(scrollYProgress, [0.05, 0.5], [0, 1]);
  const release = useTransform(scrollYProgress, [0.5, 0.95], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.42, 0.62, 0.82], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["18px", "-18px"]);
  const glow = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0, 0.55, 0]);

  return (
    <div
      ref={ref}
      id={id}
      aria-hidden={!line}
      className="pointer-events-none relative flex h-[46svh] w-full items-center justify-center overflow-hidden md:h-[56svh]"
    >
      {/* Warm breath of light that bleeds across the cut */}
      <motion.div
        style={{ opacity: enabled ? glow : 0.35 }}
        className={`absolute left-1/2 top-1/2 h-[34rem] w-[62rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] ${
          lowPower ? "blur-[80px]" : "blur-[150px]"
        }`}
      />

      {/* Thread arriving from the previous scene */}
      <motion.div
        style={{ scaleY: enabled ? draw : 1 }}
        className="absolute top-0 left-1/2 h-[38%] w-px origin-top -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/25 to-primary/45"
      />

      {line ? (
        <motion.p
          style={{ opacity: enabled ? textOpacity : 1, y: enabled ? textY : 0 }}
          className="relative z-10 max-w-xl px-6 text-center font-display text-xl leading-relaxed tracking-[-0.01em] text-foreground/55 italic md:text-2xl"
        >
          {line}
        </motion.p>
      ) : null}

      {/* Thread leaving into the next scene */}
      <motion.div
        style={{ scaleY: enabled ? release : 1 }}
        className="absolute bottom-0 left-1/2 h-[38%] w-px origin-bottom -translate-x-1/2 bg-gradient-to-t from-transparent via-primary/25 to-primary/45"
      />
    </div>
  );
}

/** A fine hairline of light that dissolves the edge between two scenes. */
export function Horizon({ flip = false }: { flip?: boolean }) {
  return (
    <motion.div
      aria-hidden
      initial={{ scaleX: 0.2, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: TIMING.seam, ease: EASE }}
      className={`hairline mx-auto max-w-[1600px] ${flip ? "rotate-180" : ""}`}
    />
  );
}
