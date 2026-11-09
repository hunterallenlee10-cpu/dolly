import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { BookingProvider } from "@/components/booking/BookingContext";
import SmoothScroll from "@/components/motion/SmoothScroll";
import MotionProvider from "@/components/motion/MotionProvider";
import Nav from "@/components/sections/Nav";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
  variable: "--font-fraunces",
  display: "swap",
});

// Italic is only used for one accent word per headline, so it is not preloaded.
const frauncesItalic = Fraunces({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
  variable: "--font-fraunces-italic",
  display: "swap",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = "Dolly's Tax & Advisory CPA | Tax Prep & Flat-Fee Planning in Southern Maryland";
const description =
  "Dolly Suarez, CPA, CFP® professional. Individual and small business tax preparation, year-round tax planning, and flat-fee financial planning for Southern Maryland and virtual clients.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  // Spec site: keep out of search until Dolly signs off.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title,
    description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Dolly Suarez, CPA, CFP®, in an arch frame beside the Dolly's Tax & Advisory wordmark" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4EFE7",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: site.name,
  url: site.url,
  image: `${site.url}/og-image.png`,
  description,
  telephone: "+1-571-316-6158",
  email: site.email,
  founder: {
    "@type": "Person",
    name: site.owner,
    jobTitle: "CPA, CFP® professional",
  },
  areaServed: [
    { "@type": "Place", name: "Southern Maryland" },
    { "@type": "State", name: "Maryland" },
    { "@type": "State", name: "Virginia" },
  ],
  sameAs: [site.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${frauncesItalic.variable} ${inter.variable}`}>
      <body className="grain">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionProvider>
          <BookingProvider>
            <SmoothScroll />
            <Nav />
            {children}
          </BookingProvider>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
