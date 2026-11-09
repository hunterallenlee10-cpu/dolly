import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import BookCallButton from "@/components/booking/BookCallButton";
import Eucalyptus from "@/components/art/Eucalyptus";
import { site } from "@/lib/site";

// Entrance motion is pure CSS (see .hero-* in globals.css) so the hero paints
// without waiting for JavaScript. Reduced motion shows the final state instantly.
const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-[calc(var(--nav-h)+28px)] pb-16 lg:min-h-[100svh] lg:pt-[calc(var(--nav-h)+40px)] lg:pb-24">
      {/* Warm wash on the right, echoing the stone wall in her desk photo */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[44%] bg-gradient-to-l from-stone to-transparent lg:block" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        {/* Text */}
        <div className="relative z-[2] max-w-[640px]">
          <p className="hero-rise eyebrow mb-6 flex flex-wrap items-center gap-x-3 gap-y-1" style={d(0.15)}>
            <span>CPA</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-brass" />
            <span>CFP®</span>
            <span aria-hidden className="hidden h-1 w-1 rounded-full bg-brass sm:block" />
            <span className="basis-full sm:basis-auto">Southern Maryland &amp; virtual</span>
          </p>

          <h1 id="hero-title" className="display text-[clamp(3.4rem,2rem+6.4vw,7.4rem)] leading-[0.95]">
            <span className="hero-rise block" style={d(0.27)}>
              Taxes,
            </span>
            <span className="hero-rise block" style={d(0.39)}>
              finally <em>clear</em>.
            </span>
          </h1>

          <p className="hero-rise lede mt-7 max-w-[34ch] md:max-w-[40ch]" style={d(0.51)}>
            Tax preparation and financial planning, working together, so every return fits your bigger picture.
          </p>

          <div className="hero-rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-3" style={d(0.63)}>
            <BookCallButton />
            <a href={site.phoneHref} className="btn-ghost text-[0.98rem]">
              or call {site.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Portrait in the arch */}
        <div className="relative mx-auto w-full max-w-[460px] lg:mr-0 lg:max-w-[520px]">
          <div aria-hidden className="hero-fade absolute -top-10 -left-16 w-[46%] sm:-left-24 lg:-top-14 lg:-left-28" style={d(0.5)}>
            <Eucalyptus className="h-auto w-full opacity-90" />
          </div>

          {/* Outer hairline arch */}
          <div aria-hidden className="hero-fade arch absolute -inset-3 border border-brass/50 sm:-inset-4" style={d(0.7)} />

          <div className="hero-arch arch relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#E9E1D3] via-stone to-[#DCD1BE]">
            {/* Soft stone texture from her cover photo */}
            <Image src="/images/desk-texture.jpg" alt="" fill sizes="520px" className="object-cover opacity-30 mix-blend-multiply" />
            <div className="hero-settle absolute inset-x-[-14%] top-[6%] bottom-0">
              <Image
                src="/images/dolly-cutout.webp"
                alt="Dolly Suarez, CPA, CFP®, smiling in a tan blazer and pearl necklace"
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 600px, 115vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Credential chip */}
          <div
            className="hero-rise absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-brass/40 bg-ivory/95 px-4 py-2.5 shadow-[0_18px_40px_-24px_rgba(30,38,34,0.55)] backdrop-blur sm:-left-6 sm:translate-x-0 lg:-left-10"
            style={d(1)}
          >
            <ShieldCheck aria-hidden size={18} strokeWidth={1.5} className="text-brass-deep" />
            <span className="text-[0.85rem] font-medium whitespace-nowrap text-ink">Licensed CPA in MD &amp; VA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
