import { Briefcase, Flag, LineChart, Users, type LucideIcon } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

type Audience = { icon: LucideIcon; title: string; body: string; tags?: string[]; featured?: boolean };

const audiences: Audience[] = [
  {
    icon: Users,
    title: "Individuals & families",
    body: "Filing, planning, and the questions in between, explained clearly.",
  },
  {
    icon: Briefcase,
    title: "Small business owners",
    body: "Business and personal taxes that work together, not against each other.",
  },
  {
    icon: Flag,
    title: "Federal employees & military families",
    body: "Southern Maryland has a large federal and military community. I help with the decisions that come with it.",
    tags: ["TSP decisions", "Roth conversions", "Retirement timing"],
    featured: true,
  },
  {
    icon: LineChart,
    title: "DIY investors & people with an advisor",
    body: "Keep your investments where they are. Get a plan that fits around them.",
  },
];

export default function WhoIHelp() {
  return (
    <section id="who" aria-labelledby="who-title" className="section">
      <div className="container-x">
        <div className="mb-14 max-w-[720px] lg:mb-20">
          <Reveal>
            <p className="eyebrow mb-5">Who I help</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="who-title" className="display h2">
              Built around <em>your</em> situation.
            </h2>
          </Reveal>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <Reveal
              as="li"
              key={a.title}
              delay={i * 0.08}
              className={`card relative flex flex-col overflow-hidden p-7 ${a.featured ? "border-brass/60 bg-stone" : ""}`}
            >
              <span className="display mb-10 text-[0.95rem] text-brass-deep">0{i + 1}</span>
              <a.icon aria-hidden size={26} strokeWidth={1.2} className="mb-5 text-brass-deep" />
              <h3 className="display text-[1.5rem] leading-[1.12]">{a.title}</h3>
              <p className="mt-3 text-[0.97rem] text-ink-soft">{a.body}</p>
              {a.tags && (
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Focus areas">
                  {a.tags.map((t) => (
                    <li key={t} className="rounded-full border border-brass/50 px-3 py-1 text-[0.8rem] text-ink">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
