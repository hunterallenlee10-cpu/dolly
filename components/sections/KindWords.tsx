import { Compass, Eye, Sparkles, type LucideIcon } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/lib/site";

// No client reviews are shown: Dolly has none public yet, and we never invent them.
// These promises come from her own bio and posts. Add real reviews here when clients share them.
const promises: { icon: LucideIcon; title: string; quote: string; source: string; verbatim?: boolean }[] = [
  {
    icon: Eye,
    title: "Clarity and confidence",
    quote: "Helping individuals and small business owners navigate taxes with clarity and confidence.",
    source: "From Dolly's bio",
    verbatim: true,
  },
  {
    icon: Compass,
    title: "A well-rounded approach",
    quote: "Tax preparation and financial planning, together, so you understand how taxes fit your whole financial picture.",
    source: "How Dolly works",
  },
  {
    icon: Sparkles,
    title: "Transparent pricing",
    quote: "Taxes made clear and approachable, with transparent pricing.",
    source: "Dolly's approach",
  },
];

export default function KindWords() {
  return (
    <section id="expect" aria-labelledby="expect-title" className="section bg-stone">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">What to expect</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="expect-title" className="display h2">
                Clarity, <em>every</em> step.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="lede lg:max-w-[40ch]">Three things you can count on, whether we meet in Southern Maryland or on a video call.</p>
          </Reveal>
        </div>

        <ul className="grid gap-5 md:grid-cols-3">
          {promises.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.08} className="card relative flex flex-col p-8 lg:p-10">
              <span aria-hidden className="arch mb-8 grid h-14 w-12 place-items-center border border-brass/60 pt-1 text-brass-deep">
                <p.icon size={20} strokeWidth={1.4} />
              </span>
              <h3 className="text-[0.8rem] font-semibold tracking-[0.16em] text-brass-deep uppercase">{p.title}</h3>
              {p.verbatim ? (
                <blockquote className="display mt-4 flex-1 text-[1.4rem] leading-snug text-ink">&ldquo;{p.quote}&rdquo;</blockquote>
              ) : (
                <p className="display mt-4 flex-1 text-[1.4rem] leading-snug text-ink">{p.quote}</p>
              )}
              <p className="mt-8 border-t border-ink/10 pt-5 text-sm text-muted">{p.source}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-12 text-center text-[0.95rem] text-ink-soft">
            Worked with Dolly?{" "}
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="btn-ghost inline-flex">
              Share your experience on Facebook<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
