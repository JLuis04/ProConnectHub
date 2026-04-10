import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { NewUsersBarChart } from "@/components/charts/NewUsersBarChart";
import { api } from "@/services/api";
import type { NewUsersPoint } from "@/types";

export function FinanceMetricsPage() {
  const [data, setData] = useState<NewUsersPoint[]>([]);

  useEffect(() => {
    api.getNewUsersByMonth().then(setData);
  }, []);

  return (
    <Layout title="Métricas de crecimiento" subtitle="Finanzas">
      <PageHeader
        title="Crecimiento"
        description="Nuevas cuentas de profesionistas; combina con CAC y LTV en tu analítica real."
      />
      <Card>
        <h3 className="text-base font-semibold text-ink">
          Nuevos profesionistas por mes
        </h3>
        <div className="mt-4">
          <NewUsersBarChart data={data} />
        </div>
      </Card>
    </Layout>
  );
}
