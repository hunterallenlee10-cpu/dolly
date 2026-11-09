"use client";

import { useState } from "react";
import { AnimatePresence, m as motion, useReducedMotion } from "motion/react";
import { RotateCcw } from "lucide-react";
import BookCallButton from "@/components/booking/BookCallButton";
import type { AudienceOption, ServiceOption } from "@/lib/site";

const questions = [
  "Do you own a business?",
  "Do you want help beyond filing your return?",
  "Are you weighing TSP, Roth, or retirement decisions?",
];

type Rec = { title: string; why: string; service: ServiceOption; audience?: AudienceOption };

function recommend([biz, beyond, retire]: boolean[]): Rec {
  const audience: AudienceOption | undefined = biz ? "Business owner" : undefined;
  if (retire)
    return {
      title: "Flat-fee financial planning",
      why: "TSP, Roth and retirement choices are planning decisions with tax consequences. A flat-fee plan looks at them together, and your investments stay where they are.",
      service: "Financial planning",
      audience: audience ?? "Individual or family",
    };
  if (beyond)
    return {
      title: biz ? "Tax planning, plus business tax prep" : "Proactive tax planning",
      why: "You want more than a filed return. Year-round planning means check-ins, estimates that fit your year, and moves made before December 31.",
      service: "Tax planning",
      audience,
    };
  if (biz)
    return {
      title: "Small business tax preparation",
      why: "Business returns handled carefully, with clear guidance on estimated payments and how the business affects your personal taxes.",
      service: "Small business taxes",
      audience,
    };
  return {
    title: "Individual & family tax preparation",
    why: "An accurate return, explained in plain language, with ideas to carry into next year.",
    service: "Tax preparation",
    audience: "Individual or family",
  };
}

export default function FitCheck() {
  const reduce = useReducedMotion();
  const [answers, setAnswers] = useState<boolean[]>([]);
  const step = answers.length;
  const done = step === questions.length;
  const rec = done ? recommend(answers) : null;

  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section id="fit" aria-labelledby="fit-title" className="section">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="eyebrow mb-5">Fit check</p>
          <h2 id="fit-title" className="display h2">
            Which service <em>fits</em> you?
          </h2>
          <p className="lede mt-6">Three quick questions. No email required, nothing is saved.</p>
        </div>

        <div className="card relative min-h-[360px] overflow-hidden p-7 hover:!border-ink/12 hover:!shadow-none sm:p-10">
          {/* Step dots */}
          <div className="mb-8 flex items-center gap-2" aria-hidden>
            {questions.map((_, i) => (
              <span key={i} className={`h-1 rounded-full transition-all duration-500 ${i < step ? "w-8 bg-brass" : i === step ? "w-8 bg-brass/40" : "w-4 bg-ink/15"}`} />
            ))}
          </div>

          <div aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              {!done ? (
                <motion.div key={step} {...anim}>
                  <p className="mb-3 text-xs font-medium tracking-[0.16em] text-muted uppercase">
                    Question {step + 1} of {questions.length}
                  </p>
                  <h3 className="display text-[clamp(1.7rem,1.3rem+1.4vw,2.4rem)] leading-tight">{questions[step]}</h3>
                  <div className="mt-10 grid grid-cols-2 gap-3 sm:max-w-sm">
                    {["Yes", "No"].map((label) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setAnswers((a) => [...a, label === "Yes"])}
                        className="min-h-[56px] rounded-md border border-ink/20 bg-white/50 text-[1.05rem] font-medium transition-colors duration-300 hover:border-brass hover:bg-brass/10"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button type="button" onClick={() => setAnswers((a) => a.slice(0, -1))} className="mt-6 min-h-[44px] text-sm text-muted underline underline-offset-4 hover:text-ink">
                      Back
                    </button>
                  )}
                </motion.div>
              ) : (
                rec && (
                  <motion.div key="rec" {...anim}>
                    <p className="eyebrow mb-3">My suggestion</p>
                    <h3 className="display text-[clamp(1.9rem,1.4rem+1.6vw,2.8rem)] leading-tight">{rec.title}</h3>
                    <p className="mt-4 max-w-[52ch] text-ink-soft">{rec.why}</p>
                    <p className="mt-3 text-sm text-muted">Not quite right? We&rsquo;ll sort it out on the call.</p>
                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <BookCallButton preset={{ service: rec.service, audience: rec.audience }} />
                      <button type="button" onClick={() => setAnswers([])} className="inline-flex min-h-[44px] items-center gap-2 text-sm text-muted hover:text-ink">
                        <RotateCcw aria-hidden size={14} /> Start over
                      </button>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
