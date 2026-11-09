import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Signature from "@/components/art/Signature";
import Eucalyptus from "@/components/art/Eucalyptus";

export default function MeetDolly() {
  return (
    <section id="about" aria-labelledby="about-title" className="section relative overflow-hidden">
      <div className="container-x grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
        {/* Portrait + framed certificate */}
        <Reveal className="relative mx-auto w-full max-w-[460px] pb-20 sm:pb-24 lg:mx-0">
          <Eucalyptus className="pointer-events-none absolute -top-12 -right-10 w-[38%] opacity-80" />
          <div className="arch relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#E6DCCB] via-stone-deep to-[#D6C9B3]">
            <Image src="/images/desk-texture.jpg" alt="" fill sizes="460px" className="object-cover opacity-40 mix-blend-multiply" />
            <div className="absolute inset-x-[-34%] top-[2%] bottom-[-22%]">
              <Image
                src="/images/dolly-cutout.webp"
                alt="Portrait of Dolly Suarez, CPA, CFP®"
                fill
                sizes="(min-width: 1024px) 640px, 120vw"
                className="object-cover object-top"
              />
            </div>
          </div>
          <div aria-hidden className="arch absolute inset-x-[-14px] top-[-14px] bottom-[66px] border border-brass/45 sm:bottom-[82px]" />

          {/* Her Maryland CPA certificate, framed on the wall. License number blurred. Never larger than 360px. */}
          <figure className="absolute right-[-6px] bottom-0 w-[54%] max-w-[300px] rotate-[3deg] sm:right-[-36px]">
            <div className="bg-[#2b2a26] p-[7px] shadow-[0_28px_50px_-22px_rgba(30,38,34,0.7),0_2px_4px_rgba(0,0,0,0.2)]">
              <div className="bg-[#f7f2e8] p-[8px]">
                <Image
                  src="/images/certificate.jpg"
                  alt="Dolly Suarez's State of Maryland Certified Public Accountant license certificate, issued November 2025 (license number blurred)"
                  width={560}
                  height={508}
                  sizes="300px"
                  className="h-auto w-full"
                />
              </div>
            </div>
            <figcaption className="mt-3 text-right text-[0.75rem] tracking-wide text-muted">Maryland CPA license, 2025</figcaption>
          </figure>
        </Reveal>

        {/* Note */}
        <div className="max-w-[600px]">
          <Reveal>
            <p className="eyebrow mb-5">Meet Dolly</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="about-title" className="display h2">
              Hi, I&rsquo;m <em>Dolly</em>.
            </h2>
          </Reveal>
          {/* DRAFT FOR DOLLY'S APPROVAL: first-person note written from her own Facebook posts and local press. */}
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-[1.06rem] leading-relaxed text-ink-soft">
              <p>
                I&rsquo;m a CPA licensed in Maryland and Virginia, and a CFP® professional. I spent several years preparing tax returns before moving into wealth management, and I started my firm to bring the two together.
              </p>
              <p>
                My goal is to help you go beyond just filing. I want you to understand your situation, and how your taxes fit into your overall financial picture.
              </p>
              <p>I work with individuals, families and small business owners in Southern Maryland and virtually.</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex items-end gap-6">
              <Signature className="h-auto w-[190px]" />
            </div>
            <p className="mt-2 text-sm font-medium tracking-wide text-ink">Dolly Suarez, CPA, CFP®</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
