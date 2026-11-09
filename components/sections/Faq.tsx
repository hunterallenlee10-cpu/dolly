"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Do you work virtually or only locally?",
    a: "Both. I work with clients locally in Southern Maryland and virtually.",
  },
  {
    q: "Is an extension an extension to pay?",
    a: "No. Filing an extension gives you more time to file, not more time to pay. Taxes not paid by April 15 can bring penalties and interest, so it matters to estimate and pay what you owe by the deadline.",
  },
  {
    q: "What does flat-fee planning mean?",
    a: "You pay a flat fee for the planning itself. It isn't based on your assets, and there are no products to buy. The focus is strategy: cash flow, taxes, retirement, TSP decisions, Roth conversions and estate coordination.",
  },
  {
    q: "Do I have to move my investments?",
    a: "No. I don't manage assets or recommend specific securities, so your investments stay exactly where they are.",
  },
  {
    q: "Can you work with my current advisor?",
    a: "Yes. When needed, I work with your current advisor or coordinate with an investment professional. Planning also works if you manage your investments yourself.",
  },
  {
    q: "What should I bring to my first meeting?",
    a: (
      <>
        For the intro call, just your questions. If we work together, I&rsquo;ll send a checklist, which typically includes last year&rsquo;s return and this year&rsquo;s tax forms.
      </>
    ),
  },
  {
    q: "Which states are you licensed in?",
    a: "I'm a CPA licensed in both Maryland and Virginia. I've been licensed in Virginia since 2019, and my Maryland license was issued in November 2025.",
  },
  {
    q: "How much does it cost?",
    a: (
      <>
        Pricing is transparent and depends on what you need. You&rsquo;ll know exactly what to expect after your intro call.
      </>
    ),
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-5">FAQ</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="faq-title" className="display h2">
              Good <em>questions</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede mt-6">Don&rsquo;t see yours? Ask it on your intro call.</p>
          </Reveal>
        </div>

        <ul className="border-t border-ink/15">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const btn = `${uid}-q${i}`;
            const panel = `${uid}-a${i}`;
            return (
              <li key={f.q} className="border-b border-ink/15">
                <h3>
                  <button
                    id={btn}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex min-h-[64px] w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="display text-[clamp(1.2rem,1.05rem+0.5vw,1.45rem)] leading-snug transition-colors group-hover:text-brass-deep">{f.q}</span>
                    <span
                      aria-hidden
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                        isOpen ? "rotate-45 border-brass bg-brass/15" : "border-ink/20"
                      }`}
                    >
                      <Plus size={16} strokeWidth={1.5} />
                    </span>
                  </button>
                </h3>
                <div
                  id={panel}
                  role="region"
                  aria-labelledby={btn}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[60ch] pr-12 pb-6 text-ink-soft">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
