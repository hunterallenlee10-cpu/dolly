"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { AudienceOption, ServiceOption } from "@/lib/site";
import dynamic from "next/dynamic";

const BookingModal = dynamic(() => import("./BookingModal"), { ssr: false });

export type BookingPreset = {
  service?: ServiceOption;
  audience?: AudienceOption;
};

type BookingCtx = {
  open: (preset?: BookingPreset) => void;
  close: () => void;
  isOpen: boolean;
};

const Ctx = createContext<BookingCtx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState<BookingPreset>({});
  const [session, setSession] = useState(0);

  const open = useCallback((p: BookingPreset = {}) => {
    setPreset(p);
    setSession((s) => s + 1);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {session > 0 && <BookingModal key={session} isOpen={isOpen} onClose={close} preset={preset} />}
    </Ctx.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
