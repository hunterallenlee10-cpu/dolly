"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import BookCallButton from "@/components/booking/BookCallButton";
import Eucalyptus from "@/components/art/Eucalyptus";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  // Staggered fade-up for the text column. Reduced motion: final state, no animation.
  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease },
        };

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-[calc(var(--nav-h)+28px)] pb-16 lg:min-h-[100svh] lg:pt-[calc(var(--nav-h)+40px)] lg:pb-24">
      {/* Warm wash on the right, echoing the stone wall in her desk photo */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[44%] bg-gradient-to-l from-stone to-transparent lg:block" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        {/* Text */}
        <div className="relative z-[2] max-w-[640px]">
          <motion.p className="eyebrow mb-6 flex flex-wrap items-center gap-x-3 gap-y-1" {...rise(0)}>
            <span>CPA</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-brass" />
            <span>CFP®</span>
            <span aria-hidden className="hidden h-1 w-1 rounded-full bg-brass sm:block" />
            <span className="basis-full sm:basis-auto">Southern Maryland &amp; virtual</span>
          </motion.p>

          <h1 id="hero-title" className="display text-[clamp(3.4rem,2rem+6.4vw,7.4rem)] leading-[0.95]">
            <motion.span className="block" {...rise(1)}>
              Taxes,
            </motion.span>
            <motion.span className="block" {...rise(2)}>
              finally <em>clear</em>.
            </motion.span>
          </h1>

          <motion.p className="lede mt-7 max-w-[34ch] md:max-w-[40ch]" {...rise(3)}>
            Tax preparation and financial planning, working together, so every return fits your bigger picture.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3" {...rise(4)}>
            <BookCallButton />
            <a href={site.phoneHref} className="btn-ghost text-[0.98rem]">
              or call {site.phoneDisplay}
            </a>
          </motion.div>
        </div>

        {/* Portrait in the arch */}
        <div className="relative mx-auto w-full max-w-[460px] lg:mr-0 lg:max-w-[520px]">
          <motion.div
            aria-hidden
            className="absolute -top-10 -left-16 w-[46%] opacity-90 sm:-left-24 lg:-top-14 lg:-left-28"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease }}
          >
            <Eucalyptus className="h-auto w-full" />
          </motion.div>

          {/* Outer hairline arch */}
          <motion.div
            aria-hidden
            className="arch absolute -inset-3 border border-brass/50 sm:-inset-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease }}
          />

          <motion.div
            className="arch relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#E9E1D3] via-stone to-[#DCD1BE]"
            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0% round 999px 999px 8px 8px)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 999px 999px 8px 8px)" }}
            transition={{ duration: 0.9, ease }}
          >
            {/* Soft stone texture from her cover photo */}
            <Image src="/images/desk-texture.jpg" alt="" fill sizes="520px" className="object-cover opacity-30 mix-blend-multiply" />
            <motion.div
              className="absolute inset-x-[-14%] bottom-0 top-[6%]"
              initial={reduce ? false : { scale: 1.06, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 1.3, ease }}
            >
              <Image
                src="/images/dolly-cutout.webp"
                alt="Dolly Suarez, CPA, CFP®, smiling in a tan blazer and pearl necklace"
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 600px, 90vw"
                className="object-cover object-top"
              />
            </motion.div>
          </motion.div>

          {/* Credential chip */}
          <motion.div
            className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-brass/40 bg-ivory/95 px-4 py-2.5 shadow-[0_18px_40px_-24px_rgba(30,38,34,0.55)] backdrop-blur sm:-left-6 sm:translate-x-0 lg:-left-10"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease }}
          >
            <ShieldCheck aria-hidden size={18} strokeWidth={1.5} className="text-brass-deep" />
            <span className="text-[0.85rem] font-medium whitespace-nowrap text-ink">Licensed CPA in MD &amp; VA</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
