import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import BookingForm from "@/components/booking/BookingForm";
import Footer from "@/components/sections/Footer";
import Eucalyptus from "@/components/art/Eucalyptus";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Dolly's Tax & Advisory CPA",
  description: "Book an intro call with Dolly Suarez, CPA, CFP® professional. Serving Southern Maryland and clients virtually.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <main id="main" className="relative overflow-hidden">
        <Eucalyptus className="pointer-events-none absolute top-24 -right-16 hidden w-[260px] opacity-70 lg:block" />
        <section aria-labelledby="contact-title" className="pt-[calc(var(--nav-h)+48px)] pb-20 lg:pt-[calc(var(--nav-h)+96px)] lg:pb-32">
          <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="eyebrow mb-5">Contact</p>
              <h1 id="contact-title" className="display text-[clamp(3rem,1.8rem+5vw,6rem)] leading-[0.98]">
                Let&rsquo;s <em>talk</em>.
              </h1>
              <p className="lede mt-6">
                Tell me a little about what you need, and I&rsquo;ll reach out within one business day. Prefer to call or email? That works too.
              </p>

              <ul className="mt-12 space-y-1 border-t border-brass/30">
                <li className="border-b border-brass/30">
                  <a href={site.phoneHref} className="flex min-h-[64px] items-center gap-4 py-4 hover:text-brass-deep">
                    <Phone aria-hidden size={20} strokeWidth={1.4} className="text-brass-deep" />
                    <span>
                      <span className="block text-xs tracking-[0.16em] text-muted uppercase">Phone</span>
                      <span className="text-[1.1rem]">{site.phoneDisplay}</span>
                    </span>
                  </a>
                </li>
                <li className="border-b border-brass/30">
                  <a href={site.emailHref} className="flex min-h-[64px] items-center gap-4 py-4 hover:text-brass-deep">
                    <Mail aria-hidden size={20} strokeWidth={1.4} className="text-brass-deep" />
                    <span>
                      <span className="block text-xs tracking-[0.16em] text-muted uppercase">Email</span>
                      <span className="text-[1.1rem]">{site.email}</span>
                    </span>
                  </a>
                </li>
                <li className="border-b border-brass/30">
                  <div className="flex min-h-[64px] items-center gap-4 py-4">
                    <MapPin aria-hidden size={20} strokeWidth={1.4} className="text-brass-deep" />
                    <span>
                      <span className="block text-xs tracking-[0.16em] text-muted uppercase">Service area</span>
                      <span className="text-[1.1rem]">Southern Maryland and virtual</span>
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card self-start p-6 hover:!border-ink/12 hover:!shadow-none sm:p-10">
              <p className="eyebrow mb-3">Book an intro call</p>
              <BookingForm variant="inline" />
            </div>
          </div>
        </section>
      </main>
      <Footer onHome={false} />
    </>
  );
}
