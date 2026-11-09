import Reveal from "@/components/motion/Reveal";

// Four verified facts only. Nothing invented.
const facts = [
  { big: "2019", small: "CPA since" },
  { big: "MD & VA", small: "Licensed in both states" },
  { big: "CFP®", small: "CFP® professional" },
  { big: "Flat fee", small: "Planning, not % of assets" },
];

export default function CredentialStrip() {
  return (
    <section aria-label="Credentials" className="relative border-y border-brass/25 bg-stone">
      <ul className="container-x grid grid-cols-2 lg:grid-cols-4">
        {facts.map((f, i) => (
          <Reveal
            as="li"
            key={f.big}
            delay={i * 0.08}
            className={`flex flex-col items-start gap-1 py-8 lg:items-center lg:py-10 lg:text-center ${i % 2 === 1 ? "border-l border-brass/25 pl-6 lg:pl-0" : ""} ${i > 1 ? "border-t border-brass/25 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
          >
            <span className="display text-[clamp(1.7rem,1.2rem+1.6vw,2.5rem)] text-brass-deep">{f.big}</span>
            <span className="text-[0.85rem] tracking-[0.04em] text-ink-soft">{f.small}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
