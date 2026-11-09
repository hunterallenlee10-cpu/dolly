import { Briefcase, CalendarRange, Compass, House, type LucideIcon } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import Eucalyptus from "@/components/art/Eucalyptus";

type Service = {
  icon: LucideIcon;
  title: string;
  promise: string;
  bullets: string[];
};

const small: Service[] = [
  {
    icon: House,
    title: "Individual & family tax preparation",
    promise: "Accurate returns, explained in plain language.",
    bullets: ["Federal and state returns", "A clear walkthrough of what you owe and why", "Ideas to carry into next year"],
  },
  {
    icon: Briefcase,
    title: "Small business tax preparation",
    promise: "Business taxes, handled with your whole picture in mind.",
    bullets: ["Business tax returns", "Guidance on quarterly estimated payments", "How business choices affect your personal taxes"],
  },
  {
    icon: CalendarRange,
    title: "Proactive tax planning",
    promise: "Planning all year, not just in April.",
    bullets: ["Mid-year check-ins", "Estimated payment planning", "Year-end moves before December 31"],
  },
];

const planningItems = [
  "Cash flow planning",
  "Tax planning",
  "Retirement planning",
  "TSP decisions",
  "Roth conversion strategies",
  "Coordination with estate planning",
];

function Price() {
  return (
    <p className="mt-auto flex flex-wrap items-center gap-2 border-t border-ink/10 pt-5 text-[0.85rem] text-muted">
      Pricing shared on your intro call <span className="placeholder">[Confirm pricing]</span>
    </p>
  );
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section bg-stone">
      <div className="container-x">
        <div className="mb-14 grid gap-6 lg:mb-20 lg:grid-cols-2 lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">Services</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="services-title" className="display h2 max-w-[14ch]">
                Four ways I can <em>help</em>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="lede lg:ml-auto lg:max-w-[44ch]">
              Four services, one approach: clear explanations, no jargon, and a plan that connects this year&rsquo;s return to the years ahead.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {small.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} as="article" className="card flex h-full flex-col p-7 lg:p-8">
              <ServiceHeader icon={s.icon} title={s.title} />
              <p className="mt-3 text-ink-soft">{s.promise}</p>
              <ul className="mt-6 mb-8 space-y-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[0.97rem]">
                    <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-brass" />
                    {b}
                  </li>
                ))}
              </ul>
              <Price />
            </Reveal>
          ))}

          {/* The larger planning card */}
          <Reveal as="article" delay={0.1} className="card relative flex flex-col overflow-hidden p-7 md:col-span-2 lg:col-span-3 lg:p-12">
            <Eucalyptus className="pointer-events-none absolute -right-6 -bottom-24 hidden w-[230px] opacity-70 lg:block" />
            <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
              <div>
                <ServiceHeader icon={Compass} title="Flat-fee financial planning" large />
                <p className="mt-4 max-w-[42ch] text-ink-soft">
                  Strategy for individuals and families, for a flat fee. Not a percentage of your assets, and no products to buy.
                </p>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-sage/60 bg-sage/10 px-4 py-2 text-[0.85rem] text-sage-deep">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sage" />
                  Your investments stay exactly where they are
                </p>
              </div>
              <ul className="grid content-start gap-x-8 sm:grid-cols-2 lg:pr-24">
                {planningItems.map((item, i) => (
                  <li key={item} className="flex items-baseline gap-4 border-b border-ink/10 py-4">
                    <span className="display text-[0.95rem] text-brass-deep">0{i + 1}</span>
                    <span className="text-[1.02rem]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <Price />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServiceHeader({ icon: Icon, title, large = false }: { icon: LucideIcon; title: string; large?: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      <span aria-hidden className="arch grid h-14 w-12 place-items-center border border-brass/60 pt-1 text-brass-deep">
        <Icon size={20} strokeWidth={1.4} />
      </span>
      <h3 className={`display ${large ? "text-[clamp(1.8rem,1.4rem+1.4vw,2.6rem)]" : "text-[1.6rem] leading-[1.12]"}`}>{title}</h3>
    </div>
  );
}
