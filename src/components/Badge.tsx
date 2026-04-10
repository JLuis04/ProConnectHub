import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "success" | "neutral" | "warning" | "danger";
}

const styles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  success: "bg-brand-50 text-brand-800 ring-brand-200",
  neutral: "bg-stone-100 text-ink ring-stone-200",
  warning: "bg-amber-50 text-amber-800 ring-amber-100",
  danger: "bg-rose-50 text-rose-800 ring-rose-100",
};

export function Badge({ children, variant = "neutral" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
