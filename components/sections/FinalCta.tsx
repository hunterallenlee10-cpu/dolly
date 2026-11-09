import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import BookCallButton from "@/components/booking/BookCallButton";
import { site } from "@/lib/site";

export default function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-stone py-24 lg:py-40">
      {/* Her desk cover photo, softened into a backdrop */}
      <Image src="/images/desk-texture.jpg" alt="" fill sizes="100vw" className="object-cover object-center opacity-35" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-stone/70 via-stone/40 to-stone/80" />
      <svg aria-hidden viewBox="0 0 600 600" className="pointer-events-none absolute top-10 left-1/2 w-[760px] max-w-none -translate-x-1/2 opacity-60 [mask-image:linear-gradient(to_bottom,black_40%,transparent_85%)]">
        <path d="M60 600 V300 A240 240 0 0 1 540 300 V600" fill="none" stroke="#A8834A" strokeOpacity=".5" />
      </svg>

      <div className="container-x relative text-center">
        <Reveal>
          <p className="eyebrow mb-6">Let&rsquo;s talk</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="cta-title" className="display mx-auto max-w-[17ch] text-[clamp(2.5rem,1.4rem+4.6vw,5.4rem)]">
            Let&rsquo;s make this the year your taxes make <em>sense</em>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center gap-8">
            <BookCallButton />
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-8">
              <a href={site.phoneHref} className="btn-ghost">
                <Phone aria-hidden size={16} strokeWidth={1.5} /> {site.phoneDisplay}
              </a>
              <a href={site.emailHref} className="btn-ghost">
                <Mail aria-hidden size={16} strokeWidth={1.5} /> {site.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
