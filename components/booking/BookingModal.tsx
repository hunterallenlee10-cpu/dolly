"use client";

import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import BookingForm from "./BookingForm";
import type { BookingPreset } from "./BookingContext";
import ConceptMark from "@/components/brand/ConceptMark";

type Props = { isOpen: boolean; onClose: () => void; preset: BookingPreset };

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

export default function BookingModal({ isOpen, onClose, preset }: Props) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;
    restoreRef.current = document.activeElement as HTMLElement;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    // Focus the first choice once the panel is painted.
    const t = window.setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>("input, button:not([data-close])");
      first?.focus();
    }, 60);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null || n.getClientRects().length > 0,
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      lenis?.start();
      restoreRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4 }}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex max-h-[94dvh] w-full max-w-[640px] flex-col overflow-hidden rounded-t-[28px] bg-ivory shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] sm:rounded-[10px]"
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: reduce ? 0 : 0.6, ease }}
          >
            {/* Arch header */}
            <div className="relative h-24 shrink-0 overflow-hidden bg-stone sm:h-28">
              <svg aria-hidden viewBox="0 0 640 112" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
                <path d="M200 112 V80 A120 120 0 0 1 440 80 V112" fill="none" stroke="#A8834A" strokeOpacity=".5" />
                <path d="M228 112 V84 A92 92 0 0 1 412 84 V112" fill="none" stroke="#A8834A" strokeOpacity=".25" />
              </svg>
              <div className="absolute inset-x-0 bottom-3 flex justify-center">
                <ConceptMark variant="monogram" className="h-12 w-12" />
              </div>
              <button
                type="button"
                data-close
                onClick={onClose}
                className="absolute top-3 right-3 grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-ink/5"
                aria-label="Close booking form"
              >
                <X aria-hidden size={20} strokeWidth={1.5} />
              </button>
            </div>
            <div className="overflow-y-auto overscroll-contain px-6 pt-7 pb-6 sm:px-10 sm:pb-8" data-lenis-prevent>
              <p className="eyebrow mb-3">Book an intro call</p>
              <BookingForm preset={preset} titleId={titleId} onDone={onClose} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
