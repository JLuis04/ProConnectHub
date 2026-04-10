import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { api } from "@/services/api";
import { formatMoney } from "@/lib/format";
import type { SubscriptionPlan } from "@/types";

export function SubscriptionPlansPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);

  useEffect(() => {
    api.getSubscriptionPlans().then(setPlans);
  }, []);

  return (
    <Layout title="Planes" subtitle="Suscripciones para profesionistas">
      <PageHeader
        title="Planes de suscripción"
        description="Free, Pro y Premium orientados a monetización por valor."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            padding="lg"
            className={
              plan.highlight
                ? "relative ring-2 ring-brand-500/30 lg:scale-[1.02]"
                : ""
            }
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-0.5 text-xs font-semibold text-white shadow-sm">
                Popular
              </span>
            )}
            <h3 className="text-lg font-semibold text-ink">{plan.name}</h3>
            <p className="mt-3 flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight text-ink">
                {plan.priceMonthly === 0
                  ? "Gratis"
                  : formatMoney(plan.priceMonthly, plan.currency)}
              </span>
              {plan.priceMonthly > 0 && (
                <span className="text-sm text-muted">/mes</span>
              )}
            </p>
            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-muted">
                  <Check className="h-4 w-4 shrink-0 text-brand-600" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              className="mt-8 w-full"
              variant={plan.highlight ? "primary" : "secondary"}
            >
              {plan.priceMonthly === 0 ? "Plan actual (demo)" : "Configurar"}
            </Button>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
