"use client";

import { m as motion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

// The site's one "everything else" motion: a quiet 12px fade-up when scrolled into view.
// Reduced motion: globals.css forces [data-reveal] to its final state, so nothing waits on JS.
export default function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const M = motion[as];
  return (
    <M
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}
