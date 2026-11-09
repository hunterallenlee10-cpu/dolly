import { Handshake, Scale, Target, type LucideIcon } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import BookCallButton from "@/components/booking/BookCallButton";

const pillars: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Target,
    title: "Strategy, not product",
    body: "Planning is about decisions: cash flow, taxes, retirement, TSP and Roth choices. There is nothing to buy.",
  },
  {
    icon: Scale,
    title: "No asset-based fees",
    body: "You pay a flat fee for the planning itself, not a percentage of what you have saved.",
  },
  {
    icon: Handshake,
    title: "Works with your advisor, or without one",
    body: "Manage your own investments or keep your current advisor. When needed, I coordinate with them directly.",
  },
];

export default function FlatFee() {
  return (
    <section id="planning" aria-labelledby="planning-title" className="on-dark section relative overflow-hidden bg-ink text-ivory">
      {/* Arch echo */}
      <svg aria-hidden viewBox="0 0 800 800" className="pointer-events-none absolute -top-40 left-1/2 w-[1100px] max-w-none -translate-x-1/2 opacity-[0.16] [mask-image:linear-gradient(to_bottom,black_45%,transparent_75%)]">
        <path d="M120 800 V400 A280 280 0 0 1 680 400 V800" fill="none" stroke="#C4A26E" />
        <path d="M170 800 V410 A230 230 0 0 1 630 410 V800" fill="none" stroke="#C4A26E" />
      </svg>

      <div className="container-x relative">
        <div className="mx-auto max-w-[920px] text-center">
          <Reveal>
            <p className="eyebrow mb-6">Flat-fee financial planning</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="planning-title" className="display text-[clamp(2.6rem,1.4rem+5vw,5.6rem)] [&_em]:!text-brass-light">
              Flat fee. Your investments stay <em>put</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-[52ch] text-[1.1rem] leading-relaxed text-ivory/80">
              My planning is strategy-focused and offered for a flat fee, not based on assets. It works whether you manage your own investments or already have an advisor.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-brass/25 bg-brass/25 md:grid-cols-3 lg:mt-24">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="flex flex-col gap-4 bg-ink p-8 lg:p-10">
              <p.icon aria-hidden size={26} strokeWidth={1.2} className="text-brass-light" />
              <h3 className="display text-[1.55rem] leading-tight">{p.title}</h3>
              <p className="text-[0.98rem] leading-relaxed text-ivory/75">{p.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-center gap-8 text-center">
            <p className="display max-w-[30ch] text-[clamp(1.35rem,1.1rem+0.9vw,1.85rem)] text-ivory">
              Dolly doesn&rsquo;t manage assets or recommend specific securities.
            </p>
            <BookCallButton preset={{ service: "Financial planning" }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
