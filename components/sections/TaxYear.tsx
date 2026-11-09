"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Info } from "lucide-react";

type Milestone = {
  date: string;
  sub?: string;
  title: string;
  body: string;
  dolly: string;
  note?: string;
  highlight?: boolean;
};

const milestones: Milestone[] = [
  {
    date: "January",
    title: "Forms start arriving",
    body: "W-2s, 1099s and other tax forms begin landing in your mailbox and inbox.",
    dolly: "I send a simple checklist of what to gather.",
  },
  {
    date: "April 15",
    title: "Filing deadline + Q1 estimated payment",
    body: "Returns are due, and so is the first quarterly estimated payment for the new year.",
    dolly: "I file your return, or file an extension and estimate what you owe.",
    note: "An extension gives you more time to file. It is not more time to pay. Taxes not paid by April 15 can bring penalties and interest.",
    highlight: true,
  },
  {
    date: "June 15",
    title: "Q2 estimated payment",
    body: "The second estimate is due, and the year is far enough along to see where it's heading.",
    dolly: "Mid-year planning check-in: we adjust estimates and withholding.",
  },
  {
    date: "September 15",
    title: "Q3 estimated payment",
    body: "Third estimate due. A good moment to compare the plan with real numbers.",
    dolly: "I review your estimates against how the year is actually going.",
  },
  {
    date: "October 15",
    title: "Extended filing deadline",
    body: "If you filed an extension in April, your return is due now.",
    dolly: "Extended returns are finished and filed.",
  },
  {
    date: "December",
    title: "Year-end moves",
    body: "The last window for moves that count for this tax year.",
    dolly: "Year-end planning: Roth conversions, retirement contributions, timing deductions.",
    highlight: true,
  },
  {
    date: "January 15",
    sub: "next year",
    title: "Q4 estimated payment",
    body: "The final estimate for the year you just planned.",
    dolly: "And the next year starts with a head start, not a scramble.",
  },
];

function useIsDesktop() {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setIs(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return is;
}

export default function TaxYear() {
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  const pinned = desktop && !reduce;

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [distance, setDistance] = useState(0);
  const [vh, setVh] = useState(0);

  useEffect(() => {
    if (!pinned) return;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
      setVh(window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const smoothX = useSpring(x, { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="tax-year"
      aria-labelledby="taxyear-title"
      className="relative bg-stone"
      style={pinned && distance ? { height: distance + vh } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden" : "section"}>
        {/* Intro */}
        <div className="container-x mb-10 lg:mb-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow mb-5">Year-round, not just April</p>
              <h2 id="taxyear-title" className="display h2">
                The tax year, <em>mapped</em>.
              </h2>
            </div>
            <p className="lede lg:max-w-[40ch]">
              Taxes don&rsquo;t happen on one day. Here&rsquo;s a typical client year, and what I&rsquo;m doing at each point.
            </p>
          </div>
        </div>

        <div
          className={pinned ? "" : "lg:overflow-x-auto lg:[scroll-snap-type:x_mandatory] lg:pb-6"}
          tabIndex={!pinned && desktop ? 0 : undefined}
          role={!pinned && desktop ? "region" : undefined}
          aria-label={!pinned && desktop ? "Tax year timeline, scroll horizontally" : undefined}
        >
          <motion.ol
            ref={trackRef}
            style={pinned ? { x: smoothX } : undefined}
            className="relative flex w-full flex-col gap-0 px-5 md:px-10 lg:w-max lg:flex-row lg:gap-6 lg:pr-[10vw] lg:pl-[max(40px,calc((100vw-1280px)/2+40px))]"
          >
            {/* Brass rail */}
            <span aria-hidden className="absolute top-0 bottom-0 left-[27px] w-px bg-brass/40 md:left-[47px] lg:top-[34px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
            {milestones.map((m, i) => (
              <li key={m.date + i} className="relative pb-10 pl-10 lg:w-[360px] lg:shrink-0 lg:pb-0 lg:pl-0 lg:[scroll-snap-align:start] xl:w-[380px]">
                <span
                  aria-hidden
                  className={`absolute top-[6px] left-[2px] h-[15px] w-[15px] rounded-full border lg:top-[27px] lg:left-0 ${
                    m.highlight ? "border-brass bg-brass" : "border-brass bg-stone"
                  }`}
                />
                <div className="lg:pt-16">
                  <p className="display text-[clamp(2rem,1.6rem+1.6vw,2.9rem)] leading-none text-ink">
                    {m.date}
                    {m.sub && <span className="ml-2 align-middle font-sans text-xs tracking-[0.18em] text-muted uppercase">{m.sub}</span>}
                  </p>
                  <h3 className="mt-3 text-[1.05rem] font-semibold text-ink">{m.title}</h3>
                  <p className="mt-2 text-[0.97rem] text-ink-soft">{m.body}</p>
                  <div className="mt-5 rounded-md border border-brass/40 bg-ivory/70 p-4">
                    <p className="eyebrow mb-1.5 !text-[0.66rem]">What I do</p>
                    <p className="text-[0.95rem] text-ink">{m.dolly}</p>
                  </div>
                  {m.note && (
                    <p className="mt-4 flex gap-2.5 text-[0.88rem] leading-snug text-ink-soft">
                      <Info aria-hidden size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-brass-deep" />
                      {m.note}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </motion.ol>
        </div>

        <div className="container-x mt-10 flex flex-col gap-5 lg:mt-12 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-[70ch] text-[0.82rem] text-muted">
            Typical federal dates for individuals. When a deadline falls on a weekend or legal holiday, it moves to the next business day.
          </p>
          {pinned && (
            <div aria-hidden className="h-px w-full max-w-[280px] overflow-hidden bg-ink/15">
              <motion.div className="h-full origin-left bg-brass" style={{ scaleX: bar }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
