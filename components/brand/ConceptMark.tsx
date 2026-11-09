// CONCEPT MARK: designed by Lee Enterprises Unlimited for this spec preview.
// Not an approved logo. A serif "D" set inside a thin brushed-brass arch, plus wordmark.

type Props = {
  variant?: "full" | "monogram";
  tone?: "ink" | "ivory";
  className?: string;
};

export function Monogram({ tone = "ink", className = "" }: { tone?: "ink" | "ivory"; className?: string }) {
  const letter = tone === "ink" ? "#1E2622" : "#F4EFE7";
  return (
    <svg viewBox="0 0 48 56" className={className} aria-hidden focusable="false">
      <path d="M5 54 V24 A19 19 0 0 1 43 24 V54" fill="none" stroke="#A8834A" strokeWidth="1.25" />
      <path d="M2 54 H46" stroke="#A8834A" strokeWidth="1.25" />
      <text
        x="24"
        y="45"
        textAnchor="middle"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fontSize="28"
        fontWeight="400"
        fill={letter}
        style={{ fontVariationSettings: '"SOFT" 60, "opsz" 72' }}
      >
        D
      </text>
    </svg>
  );
}

export default function ConceptMark({ variant = "full", tone = "ink", className = "" }: Props) {
  if (variant === "monogram") return <Monogram tone={tone} className={className} />;
  const text = tone === "ink" ? "text-ink" : "text-ivory";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Monogram tone={tone} className="h-11 w-auto shrink-0" />
      <span className={`flex flex-col leading-none ${text}`}>
        <span className="display text-[1.15rem] tracking-[-0.01em] whitespace-nowrap md:text-[1.25rem]">Dolly&rsquo;s Tax &amp; Advisory</span>
        <span className={`mt-1.5 text-[0.62rem] font-semibold tracking-[0.32em] uppercase ${tone === "ink" ? "text-brass-deep" : "text-brass-light"}`}>
          CPA, LLC
        </span>
      </span>
    </span>
  );
}
