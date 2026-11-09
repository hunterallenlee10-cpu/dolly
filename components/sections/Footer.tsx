import Link from "next/link";
import ConceptMark from "@/components/brand/ConceptMark";
import { site } from "@/lib/site";

export default function Footer({ onHome = true }: { onHome?: boolean }) {
  const a = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-ink text-ivory">
      <div className="container-x grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-24">
        <div className="max-w-[340px]">
          <ConceptMark tone="ivory" />
          <p className="mt-6 text-[0.95rem] leading-relaxed text-ivory/70">{site.bio}</p>
          <p className="mt-4 text-[0.75rem] tracking-wide text-ivory/60">Logo shown is a concept mark for this preview.</p>
        </div>

        <div>
          <h2 className="eyebrow mb-5">Contact</h2>
          <ul className="space-y-3 text-[0.95rem]">
            <li>
              <a href={site.phoneHref} className="inline-flex min-h-[44px] items-center text-ivory hover:text-brass-light">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="inline-flex min-h-[44px] items-center text-ivory hover:text-brass-light">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center text-ivory hover:text-brass-light">
                Facebook<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-5">Explore</h2>
          <ul className="space-y-1 text-[0.95rem]">
            {[
              ["Services", a("services")],
              ["Planning", a("planning")],
              ["About", a("about")],
              ["FAQ", a("faq")],
            ].map(([label, href]) => (
              <li key={label}>
                <a href={href} className="inline-flex min-h-[44px] items-center text-ivory/85 hover:text-brass-light">
                  {label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/contact" className="inline-flex min-h-[44px] items-center text-ivory/85 hover:text-brass-light">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-5">Where I work</h2>
          <ul className="space-y-3 text-[0.95rem] text-ivory/85">
            <li>Serving Southern Maryland and clients virtually</li>
            <li>Licensed CPA in Maryland and Virginia</li>
            <li>Dolly Suarez, CPA, CFP®</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brass/25">
        <div className="container-x flex flex-col gap-4 py-8 text-[0.8rem] leading-relaxed text-ivory/60 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <p className="max-w-[70ch]">
            This website is for general information only and is not tax, legal or investment advice. Reading it does not create a client relationship.
          </p>
          <div className="flex flex-col gap-1 lg:items-end lg:text-right">
            <p>&copy; {year} {site.name}</p>
            <p className="text-brass-light">Concept preview by Lee Enterprises Unlimited.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
