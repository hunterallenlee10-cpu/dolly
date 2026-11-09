"use client";

import { useRef } from "react";
import { m as motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Reveal from "@/components/motion/Reveal";

const R = 128;

export default function TwoDisciplines() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "center 0.5"] });

  return (
    <section id="story" aria-labelledby="story-title" className="section relative overflow-hidden">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="max-w-[560px]">
          <Reveal>
            <p className="eyebrow mb-5">My approach</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="story-title" className="display h2">
              Two disciplines. One clear <em>picture</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-ink-soft">
              <p>
                I spent several years preparing tax returns, then moved into wealth management.
              </p>
              <p>
                My firm brings tax preparation and financial planning together for a more well-rounded approach. You don&rsquo;t just file. You understand where you stand, and how your taxes fit into everything else.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 flex items-center gap-3 text-sm font-medium tracking-wide text-ink">
              <span aria-hidden className="h-px w-10 bg-brass" />
              Dolly Suarez, CPA, CFP®
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mx-auto w-full max-w-[640px]">
          <Venn progress={scrollYProgress} reduce={!!reduce} />
        </div>
      </div>
    </section>
  );
}

function Venn({ progress, reduce }: { progress: MotionValue<number>; reduce: boolean }) {
  // Circles travel from apart (gap) to overlapping. Reduced motion: merged state, no movement.
  const p = useTransform(progress, (v) => (reduce ? 1 : v));
  const cxA = useTransform(p, [0, 1], [148, 250]);
  const cxB = useTransform(p, [0, 1], [452, 350]);
  const lensOpacity = useTransform(p, [0.55, 1], [0, 1]);
  const captionOpacity = useTransform(p, [0.75, 1], [0, 1]);
  const captionY = useTransform(p, [0.75, 1], [8, 0]);
  const labelA = useTransform(cxA, (v) => v - 30);
  const labelB = useTransform(cxB, (v) => v + 30);

  return (
    <figure className="relative">
      <svg viewBox="0 30 600 390" className="h-auto w-full overflow-visible" role="img" aria-labelledby="venn-title">
        <title id="venn-title">Tax preparation and financial planning overlap to form your whole financial picture.</title>
        <defs>
          <clipPath id="clipB">
            <motion.circle cx={cxB} cy={200} r={R} />
          </clipPath>
          <radialGradient id="lensFill" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#C4A26E" stopOpacity=".55" />
            <stop offset="100%" stopColor="#8A9A86" stopOpacity=".45" />
          </radialGradient>
        </defs>

        {/* soft fills */}
        <motion.circle cx={cxA} cy={200} r={R} fill="#A8834A" fillOpacity=".06" />
        <motion.circle cx={cxB} cy={200} r={R} fill="#8A9A86" fillOpacity=".08" />

        {/* overlap lens */}
        <motion.circle cx={cxA} cy={200} r={R} fill="url(#lensFill)" clipPath="url(#clipB)" style={{ opacity: lensOpacity }} />

        {/* thin line circles */}
        <motion.circle cx={cxA} cy={200} r={R} fill="none" stroke="#A8834A" strokeWidth="1.25" />
        <motion.circle cx={cxB} cy={200} r={R} fill="none" stroke="#5F6F5B" strokeWidth="1.25" />
        <motion.circle cx={cxA} cy={200} r={R + 10} fill="none" stroke="#A8834A" strokeOpacity=".25" />
        <motion.circle cx={cxB} cy={200} r={R + 10} fill="none" stroke="#5F6F5B" strokeOpacity=".25" />

        {/* labels */}
        <motion.text x={labelA} y={378} textAnchor="middle" className="display" fontSize="26" fill="#7A5C2E" style={{ fontStyle: "italic" }}>
          Tax
        </motion.text>
        <motion.text x={labelA} y={404} textAnchor="middle" fontSize="14" letterSpacing="2.5" fill="#55605A" fontFamily="var(--font-inter)">
          PREPARATION
        </motion.text>
        <motion.text x={labelB} y={378} textAnchor="middle" className="display" fontSize="26" fill="#4E5D4A" style={{ fontStyle: "italic" }}>
          Financial
        </motion.text>
        <motion.text x={labelB} y={404} textAnchor="middle" fontSize="14" letterSpacing="2.5" fill="#55605A" fontFamily="var(--font-inter)">
          PLANNING
        </motion.text>
      </svg>

      <motion.figcaption
        className="pointer-events-none mt-6 text-center"
        style={{ opacity: captionOpacity, y: captionY }}
      >
        <span className="display block text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)]">
          Your whole financial <em>picture</em>.
        </span>
      </motion.figcaption>
    </figure>
  );
}
