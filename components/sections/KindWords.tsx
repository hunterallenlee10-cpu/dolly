import { Quote } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

// SAMPLE CONTENT ONLY. Dolly has no public reviews yet. Replace each card with a real client review (with permission).
const samples = [
  {
    quote: "Sample review text goes here. A short, specific sentence about how Dolly made taxes feel clear.",
    who: "Client name",
    meta: "Individual tax preparation",
  },
  {
    quote: "Sample review text goes here. A business owner describing year-round planning in their own words.",
    who: "Client name",
    meta: "Small business taxes",
  },
  {
    quote: "Sample review text goes here. A federal employee on working through TSP and Roth decisions.",
    who: "Client name",
    meta: "Flat-fee financial planning",
  },
];

export default function KindWords() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section bg-stone">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">Kind words</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="reviews-title" className="display h2">
                In their <em>words</em>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[46ch] text-[0.95rem] text-muted">
              These are layout samples, not real reviews. Real client reviews will replace them once Dolly&rsquo;s clients share them.
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-5 md:grid-cols-3">
          {samples.map((s, i) => (
            <Reveal as="li" key={i} delay={i * 0.08} className="card relative flex flex-col p-8">
              <span className="mb-6 inline-flex w-fit items-center rounded-full border border-dashed border-brass-deep px-3 py-1 text-[0.72rem] font-semibold tracking-[0.08em] text-brass-deep uppercase">
                Sample review. Replace with a real client review.
              </span>
              <Quote aria-hidden size={28} strokeWidth={1} className="mb-4 text-brass" />
              <blockquote className="display flex-1 text-[1.35rem] leading-snug text-ink/70">{s.quote}</blockquote>
              <div className="mt-8 border-t border-ink/10 pt-5">
                <p className="font-medium text-ink">{s.who}</p>
                <p className="text-sm text-muted">{s.meta}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a href="#reviews" aria-disabled="true" title="Placeholder: link to Dolly's Google Business Profile" className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-ink/25 px-6 text-[0.95rem] font-medium hover:border-brass">
              Leave a Google review
            </a>
            <span className="placeholder">[Confirm Google Business Profile link]</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
