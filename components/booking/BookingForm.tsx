"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Mail, Phone } from "lucide-react";
import {
  audienceOptions,
  contactMethods,
  serviceOptions,
  site,
  type AudienceOption,
  type ServiceOption,
} from "@/lib/site";
import type { BookingPreset } from "./BookingContext";

type Props = {
  preset?: BookingPreset;
  variant?: "modal" | "inline";
  titleId?: string;
  onDone?: () => void;
};

const STEP_TITLES = ["What do you need help with?", "A bit about you", "How can Dolly reach you?"];

export default function BookingForm({ preset = {}, variant = "modal", titleId, onDone }: Props) {
  const reduce = useReducedMotion();
  const uid = useId();
  const [step, setStep] = useState(0);
  const [service, setService] = useState<ServiceOption | undefined>(preset.service);
  const [audience, setAudience] = useState<AudienceOption | undefined>(preset.audience);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<(typeof contactMethods)[number]>("Email");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Move focus to the new step heading so screen readers announce it.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const done = step === 3;
  const progress = done ? 100 : ((step + 1) / 4) * 100;

  function next() {
    if (step === 0 && !service) return setErrors({ service: "Choose one option to continue." });
    if (step === 1 && !audience) return setErrors({ audience: "Choose one option to continue." });
    setErrors({});
    setStep((s) => s + 1);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (step < 2) return next();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please add your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Please add a valid email.";
    if ((method === "Phone" || method === "Text") && phone.replace(/\D/g, "").length < 10)
      errs.phone = "Please add a phone number so Dolly can call or text.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const payload = { service, audience, name, email, phone, preferredContact: method, note, submittedAt: new Date().toISOString() };
    // TODO: connect to form service (e.g. Formspree, Resend, or an n8n webhook). Front-end only for the concept.
    console.log("[Intro call request]", payload);
    setStep(3);
  }

  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, x: 16 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -16 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      };

  const fieldBase =
    "w-full rounded-md border border-ink/20 bg-white/70 px-4 py-3 text-[1rem] text-ink placeholder:text-muted/70 transition-colors focus:border-brass focus:outline-none focus-visible:outline-2 focus-visible:outline-brass";

  return (
    <form onSubmit={submit} noValidate className="flex h-full flex-col">
      {/* Progress */}
      <div className="mb-7">
        <div className="mb-2 flex items-center justify-between text-xs font-medium tracking-[0.14em] text-muted uppercase">
          <span>{done ? "All set" : `Step ${step + 1} of 3`}</span>
          <span aria-hidden>{Math.round(progress)}%</span>
        </div>
        <div
          className="h-[3px] w-full overflow-hidden rounded-full bg-ink/10"
          role="progressbar"
          aria-label="Booking progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <div className="h-full rounded-full bg-brass transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div aria-live="polite" className="relative flex-1">
        <AnimatePresence mode="wait" initial={false}>
          {step === 0 && (
            <motion.fieldset key="s0" {...motionProps}>
              <legend className="contents">
                <h2 ref={headingRef} tabIndex={-1} id={titleId} className="display mb-6 text-[1.9rem] outline-none md:text-[2.2rem]">
                  {STEP_TITLES[0]}
                </h2>
              </legend>
              <ChoiceGrid name={`${uid}-service`} options={serviceOptions} value={service} onChange={(v) => { setService(v); setErrors({}); }} />
              {errors.service && <p className="mt-3 text-sm text-[#8a3a2a]" role="alert">{errors.service}</p>}
            </motion.fieldset>
          )}

          {step === 1 && (
            <motion.fieldset key="s1" {...motionProps}>
              <legend className="contents">
                <h2 ref={headingRef} tabIndex={-1} id={titleId} className="display mb-6 text-[1.9rem] outline-none md:text-[2.2rem]">
                  {STEP_TITLES[1]}
                </h2>
              </legend>
              <ChoiceGrid name={`${uid}-audience`} options={audienceOptions} value={audience} onChange={(v) => { setAudience(v); setErrors({}); }} />
              {errors.audience && <p className="mt-3 text-sm text-[#8a3a2a]" role="alert">{errors.audience}</p>}
            </motion.fieldset>
          )}

          {step === 2 && (
            <motion.div key="s2" {...motionProps}>
              <h2 ref={headingRef} tabIndex={-1} id={titleId} className="display mb-6 text-[1.9rem] outline-none md:text-[2.2rem]">
                {STEP_TITLES[2]}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" id={`${uid}-name`} error={errors.name}>
                  <input id={`${uid}-name`} className={fieldBase} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-err` : undefined} required />
                </Field>
                <Field label="Email" id={`${uid}-email`} error={errors.email}>
                  <input id={`${uid}-email`} type="email" inputMode="email" className={fieldBase} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uid}-email-err` : undefined} required />
                </Field>
                <Field label="Phone" id={`${uid}-phone`} error={errors.phone} hint={method === "Email" ? "Optional" : undefined}>
                  <input id={`${uid}-phone`} type="tel" inputMode="tel" className={fieldBase} autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${uid}-phone-err` : undefined} />
                </Field>
                <fieldset>
                  <legend className="mb-2 block text-sm font-medium text-ink">Preferred contact</legend>
                  <div className="flex gap-2">
                    {contactMethods.map((m) => (
                      <label key={m} className="relative flex-1 cursor-pointer">
                        <input type="radio" name={`${uid}-method`} value={m} checked={method === m} onChange={() => setMethod(m)} className="peer sr-only" />
                        <span className="flex min-h-[48px] items-center justify-center rounded-md border border-ink/20 bg-white/50 px-2 text-sm transition-colors peer-checked:border-brass peer-checked:bg-brass/15 peer-checked:font-semibold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brass">
                          {m}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="sm:col-span-2">
                  <Field label="Anything you'd like Dolly to know?" id={`${uid}-note`} hint="Optional">
                    <textarea id={`${uid}-note`} rows={3} className={`${fieldBase} resize-none`} value={note} onChange={(e) => setNote(e.target.value)} />
                  </Field>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" {...motionProps} className="py-2 text-center">
              <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-brass text-brass-deep">
                <Check aria-hidden strokeWidth={1.5} />
              </div>
              <h2 ref={headingRef} tabIndex={-1} id={titleId} className="display mb-3 text-[2rem] outline-none md:text-[2.4rem]">
                Thank you{name ? `, ${name.split(" ")[0]}` : ""}.
              </h2>
              <p className="lede mx-auto mb-8">Dolly will reach out within one business day.</p>
              <div className="mx-auto flex max-w-sm flex-col gap-3 text-left">
                <a href={site.phoneHref} className="flex min-h-[48px] items-center gap-3 rounded-md border border-ink/15 px-4 py-3 hover:border-brass">
                  <Phone aria-hidden size={18} strokeWidth={1.5} className="text-brass-deep" /> {site.phoneDisplay}
                </a>
                <a href={site.emailHref} className="flex min-h-[48px] items-center gap-3 rounded-md border border-ink/15 px-4 py-3 hover:border-brass">
                  <Mail aria-hidden size={18} strokeWidth={1.5} className="text-brass-deep" /> {site.email}
                </a>
              </div>
              <p className="mt-6 text-xs text-muted">Concept demo: nothing was sent. Your details were only logged in this browser.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
        {step > 0 && !done ? (
          <button type="button" onClick={() => { setErrors({}); setStep((s) => s - 1); }} className="inline-flex min-h-[44px] items-center gap-2 rounded-md px-2 text-sm font-medium text-ink-soft hover:text-ink">
            <ArrowLeft aria-hidden size={16} /> Back
          </button>
        ) : (
          <span />
        )}
        {!done ? (
          <button type="submit" className="btn-primary">
            {step === 2 ? "Request intro call" : "Continue"}
            <ArrowRight aria-hidden size={18} strokeWidth={1.75} />
          </button>
        ) : variant === "modal" ? (
          <button type="button" onClick={onDone} className="btn-primary">
            Close
          </button>
        ) : (
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setStep(0);
              setService(undefined);
              setAudience(undefined);
              setName("");
              setEmail("");
              setPhone("");
              setNote("");
            }}
          >
            Start a new request
          </button>
        )}
      </div>
    </form>
  );
}

function ChoiceGrid<T extends string>({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: readonly T[];
  value?: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((opt) => (
        <label key={opt} className="relative block cursor-pointer">
          <input type="radio" name={name} value={opt} checked={value === opt} onChange={() => onChange(opt)} className="peer sr-only" />
          <span className="flex min-h-[56px] items-center justify-between gap-3 rounded-md border border-ink/15 bg-white/50 px-4 py-3 text-[1rem] transition-[border-color,background-color] duration-300 peer-checked:border-brass peer-checked:bg-brass/12 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brass hover:border-brass/70">
            {opt}
            <span aria-hidden className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${value === opt ? "border-brass bg-brass" : "border-ink/30"}`}>
              {value === opt && <Check size={12} strokeWidth={2.5} className="text-ink" />}
            </span>
          </span>
        </label>
      ))}
    </div>
  );
}

function Field({ label, id, error, hint, children }: { label: string; id: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {hint && <span className="text-xs font-normal text-muted">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-[#8a3a2a]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
