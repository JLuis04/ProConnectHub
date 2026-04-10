import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { RevenueLineChart } from "@/components/charts/RevenueLineChart";
import { api } from "@/services/api";
import { formatMoney } from "@/lib/format";
import type { MonthlyRevenuePoint } from "@/types";

export function FinanceIncomePage() {
  const [data, setData] = useState<MonthlyRevenuePoint[]>([]);

  useEffect(() => {
    api.getRevenueByMonth().then(setData);
  }, []);

  const total = data.reduce((a, b) => a + b.revenue, 0);
  const last = data[data.length - 1]?.revenue ?? 0;

  return (
    <Layout title="Ingresos mensuales" subtitle="Finanzas">
      <PageHeader
        title="Ingresos recurrentes"
        description="Agregado mock por mes; sustituye por datos de tu pasarela de pago."
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="text-sm font-medium text-muted">Suma (periodo)</p>
          <p className="mt-2 text-2xl font-semibold text-ink">
            {formatMoney(total)}
          </p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-muted">Último mes</p>
          <p className="mt-2 text-2xl font-semibold text-ink">
            {formatMoney(last)}
          </p>
        </Card>
      </div>
      <Card>
        <h3 className="text-base font-semibold text-ink">
          Serie de ingresos
        </h3>
        <div className="mt-4">
          <RevenueLineChart data={data} />
        </div>
      </Card>
    </Layout>
  );
}
