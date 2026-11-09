"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import ConceptMark from "@/components/brand/ConceptMark";
import BookCallButton from "@/components/booking/BookCallButton";
import { site } from "@/lib/site";

const links = [
  { id: "services", label: "Services" },
  { id: "planning", label: "Planning" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
];

export default function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
      if (e.key === "Tab" && menuRef.current) {
        const nodes = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a, button"));
        const f = nodes[0];
        const l = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === f) {
          e.preventDefault();
          l.focus();
        } else if (!e.shiftKey && document.activeElement === l) {
          e.preventDefault();
          f.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
      toggleRef.current?.focus();
    };
  }, [menuOpen]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid ? "border-b border-brass/25 bg-ivory/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[90] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory">
        Skip to content
      </a>
      <nav aria-label="Primary" className="container-x flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Link href="/" aria-label={`${site.shortName} home`} className="relative z-[2] -ml-1 rounded p-1">
          <ConceptMark />
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a href={href(l.id)} className="relative py-2 text-[0.95rem] text-ink-soft transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brass after:transition-transform after:duration-500 hover:text-ink hover:after:scale-x-100">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <BookCallButton className="hidden !min-h-[44px] !px-5 !py-2 !text-[0.92rem] sm:inline-flex" showArrow={false} />
          <button
            ref={toggleRef}
            type="button"
            className="relative z-[2] grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-ink/5 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X aria-hidden strokeWidth={1.5} /> : <Menu aria-hidden strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 top-[var(--nav-h)] z-[1] flex flex-col overflow-y-auto bg-ivory px-6 pt-10 pb-10 lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35 }}
          >
            <ul className="flex flex-col">
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.06 * i + 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-brass/25"
                >
                  <a href={href(l.id)} onClick={() => setMenuOpen(false)} className="display flex items-baseline justify-between py-5 text-[2.6rem]">
                    {l.label}
                    <span className="font-sans text-xs tracking-[0.2em] text-brass-deep">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
              <li className="border-b border-brass/25">
                <Link href="/contact" onClick={() => setMenuOpen(false)} className="display flex items-baseline justify-between py-5 text-[2.6rem]">
                  Contact
                  <span className="font-sans text-xs tracking-[0.2em] text-brass-deep">05</span>
                </Link>
              </li>
            </ul>
            <div className="mt-auto flex flex-col gap-4 pt-10" onClickCapture={() => setMenuOpen(false)}>
              <BookCallButton className="w-full" />
              <a href={site.phoneHref} className="btn-ghost justify-center">
                <Phone aria-hidden size={16} strokeWidth={1.5} /> {site.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
