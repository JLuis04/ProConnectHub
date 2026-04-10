import type { PlanId } from "@/types";

export function formatMoney(amount: number, currency = "MXN"): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function planLabel(plan: PlanId): string {
  const map: Record<PlanId, string> = {
    free: "Free",
    pro: "Pro",
    premium: "Premium",
  };
  return map[plan];
}

export function planBadgeClass(plan: PlanId): string {
  const map: Record<PlanId, string> = {
    free: "bg-stone-100 text-ink ring-stone-200",
    pro: "bg-brand-50 text-brand-700 ring-brand-100",
    premium: "bg-brand-100 text-brand-800 ring-brand-200",
  };
  return map[plan];
}
