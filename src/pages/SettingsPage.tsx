import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export function SettingsPage() {
  return (
    <Layout title="Configuración" subtitle="ProConnectHub">
      <PageHeader
        title="Ajustes generales"
        description="Branding, impuestos, pasarela de pago y políticas."
      />
      <div className="max-w-2xl space-y-6">
        <Card>
          <h3 className="font-semibold text-ink">Marca</h3>
          <p className="mt-1 text-sm text-muted">
            Nombre comercial, logo y colores del panel (white-label en Premium).
          </p>
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-sm font-medium text-ink">
                Nombre de la plataforma
              </label>
              <input
                defaultValue="ProConnectHub"
                className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm"
              />
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold text-ink">Pagos</h3>
          <p className="mt-1 text-sm text-muted">
            Claves de API y webhooks de tu proveedor (Stripe, Mercado Pago, etc.).
          </p>
          <div className="mt-4">
            <label className="text-sm font-medium text-ink">
              Webhook secret
            </label>
            <input
              type="password"
              placeholder="whsec_…"
              className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm"
            />
          </div>
        </Card>
        <Button>Guardar cambios (demo)</Button>
      </div>
    </Layout>
  );
}
