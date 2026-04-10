import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export function ProfessionalNewPage() {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);

  return (
    <Layout
      title="Registrar profesionista"
      subtitle="Alta manual o invitación"
    >
      <PageHeader
        title="Nuevo profesionista"
        description="Los datos son solo de demostración; conecta tu backend para persistir."
        actions={
          <Link
            to="/profesionistas"
            className="inline-flex text-inherit no-underline hover:no-underline"
          >
            <Button variant="secondary">Volver a la lista</Button>
          </Link>
        }
      />
      <Card className="max-w-xl">
        {sent ? (
          <p className="text-sm font-medium text-brand-700">
            Registro simulado correctamente. En producción redirigirías al detalle
            o al listado.
          </p>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div>
              <label className="block text-sm font-medium text-ink">
                Nombre completo
              </label>
              <input
                required
                className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink">
                Email
              </label>
              <input
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink">
                Especialidad
              </label>
              <input
                required
                className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink">
                Teléfono
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink">
                Plan inicial
              </label>
              <select className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
                <option value="free">Free</option>
                <option value="pro">Pro</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit">Crear cuenta</Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/profesionistas")}
              >
                Cancelar
              </Button>
            </div>
          </form>
        )}
      </Card>
    </Layout>
  );
}
