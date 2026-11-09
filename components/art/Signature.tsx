"use client";

import { motion, useReducedMotion } from "motion/react";

// Hand-drawn style "Dolly" sign-off, drawn as one stroke when it scrolls into view.
const path =
  "M26 16 C 24 32, 22 48, 20 64 M14 20 C 40 6, 74 16, 72 40 C 70 62, 42 72, 14 64 " +
  "M92 50 C 82 49, 79 64, 89 64 C 99 64, 101 50, 91 50 C 96 52, 98 56, 100 56 " +
  "C 108 52, 114 30, 116 14 C 117 6, 110 8, 110 20 C 109 36, 108 56, 114 64 C 118 68, 124 60, 126 52 " +
  "C 130 36, 134 18, 134 12 C 134 6, 128 8, 128 20 C 127 38, 126 56, 132 64 C 136 68, 142 60, 146 52 " +
  "C 148 60, 150 66, 156 64 C 162 62, 164 54, 164 50 C 164 62, 164 76, 156 84 C 150 90, 142 86, 146 78 C 152 70, 176 62, 204 52";

export default function Signature({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 220 96" className={className} role="img" aria-label="Signed, Dolly">
      <motion.path
        d={path}
        fill="none"
        stroke="#7A5C2E"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 2.2, ease: [0.45, 0, 0.2, 1] }}
      />
    </svg>
  );
}
