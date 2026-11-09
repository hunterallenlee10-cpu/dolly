"use client";

import { ArrowRight } from "lucide-react";
import { useBooking, type BookingPreset } from "./BookingContext";

type Props = {
  preset?: BookingPreset;
  className?: string;
  label?: string;
  showArrow?: boolean;
};

export default function BookCallButton({ preset, className = "", label = "Book an intro call", showArrow = true }: Props) {
  const { open } = useBooking();
  return (
    <button type="button" className={`btn-primary ${className}`} onClick={() => open(preset)} aria-haspopup="dialog">
      {label}
      {showArrow && <ArrowRight aria-hidden size={18} strokeWidth={1.75} />}
    </button>
  );
}
