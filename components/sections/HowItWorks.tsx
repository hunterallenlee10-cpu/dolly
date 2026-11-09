"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/motion/Reveal";

const steps = [
  {
    title: "Intro call",
    body: "We talk through your situation and what you need. Plain language, no pressure.",
  },
  {
    title: "Organize & file",
    body: "Document gathering made simple, and clear explanations of everything on your return.",
    placeholder: "[Confirm her portal]",
    placeholderNote: "Secure document upload",
  },
  {
    title: "Plan ahead",
    body: "Year-round guidance, so next year starts with a plan instead of a scramble.",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const draw = useTransform(scrollYProgress, (v) => (reduce ? 1 : v));

  return (
    <section id="how" aria-labelledby="how-title" className="section bg-stone">
      <div className="container-x">
        <div className="mb-14 max-w-[720px] lg:mb-20">
          <Reveal>
            <p className="eyebrow mb-5">How it works</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="how-title" className="display h2">
              Three steps. <em>No</em> guesswork.
            </h2>
          </Reveal>
        </div>

        <ol ref={ref} className="relative grid gap-12 lg:grid-cols-3 lg:gap-10">
          {/* Rail: vertical on mobile, horizontal on desktop. Drawn as you scroll. */}
          <span aria-hidden className="absolute top-2 bottom-2 left-[23px] w-px bg-ink/10 lg:top-[23px] lg:right-[16%] lg:bottom-auto lg:left-[24px] lg:h-px lg:w-auto" />
          <motion.span
            aria-hidden
            style={{ scaleY: draw }}
            className="absolute top-2 bottom-2 left-[23px] w-px origin-top bg-brass lg:hidden"
          />
          <motion.span
            aria-hidden
            style={{ scaleX: draw }}
            className="absolute top-[23px] right-[16%] left-[24px] hidden h-px origin-left bg-brass lg:block"
          />

          {steps.map((s, i) => (
            <li key={s.title} className="relative pl-20 lg:pt-20 lg:pl-0">
              <span className="display absolute top-0 left-0 grid h-12 w-12 place-items-center rounded-full border border-brass bg-ivory text-[1.15rem] text-brass-deep">
                {i + 1}
              </span>
              <Reveal delay={i * 0.1}>
                <h3 className="display text-[1.9rem] leading-tight">{s.title}</h3>
                <p className="mt-3 max-w-[34ch] text-ink-soft">{s.body}</p>
                {s.placeholder && (
                  <p className="mt-4 flex flex-wrap items-center gap-2 text-[0.88rem] text-muted">
                    {s.placeholderNote} <span className="placeholder">{s.placeholder}</span>
                  </p>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
