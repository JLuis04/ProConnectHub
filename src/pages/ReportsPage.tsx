import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export function ReportsPage() {
  return (
    <Layout title="Reportes" subtitle="Exportación y análisis">
      <PageHeader
        title="Reportes"
        description="Plantilla para informes CSV/PDF y dashboards personalizados."
        actions={
          <>
            <Button variant="secondary">Programar envío</Button>
            <Button>Exportar CSV (demo)</Button>
          </>
        }
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="font-semibold text-ink">Ingresos por plan</h3>
          <p className="mt-2 text-sm text-muted">
            Conecta tu warehouse o Stripe Sigma para desglose real por plan y
            región.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-ink">Churn y retención</h3>
          <p className="mt-2 text-sm text-muted">
            Aquí puedes incrustar gráficas de cohorte o enlazar a tu herramienta
            de product analytics.
          </p>
        </Card>
      </div>
    </Layout>
  );
}
