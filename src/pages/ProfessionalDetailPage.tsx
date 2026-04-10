import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { api } from "@/services/api";
import { formatMoney, planBadgeClass, planLabel } from "@/lib/format";
import type { Professional } from "@/types";

export function ProfessionalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [search] = useSearchParams();
  const editMode = search.get("edit") === "1";
  const [pro, setPro] = useState<Professional | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    api.getProfessionalById(id).then(setPro);
  }, [id]);

  if (pro === undefined) {
    return (
      <Layout title="Cargando…" subtitle="">
        <p className="text-muted">Cargando…</p>
      </Layout>
    );
  }

  if (!pro) {
    return (
      <Layout title="No encontrado" subtitle="">
        <p className="text-muted">No existe ese profesionista.</p>
        <Link to="/profesionistas" className="mt-4 inline-block text-brand-600">
          Volver al listado
        </Link>
      </Layout>
    );
  }

  return (
    <Layout
      title={pro.name}
      subtitle={pro.professionLabel}
    >
      {editMode && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Modo edición (demo): los cambios no se guardan hasta conectar API.
        </div>
      )}
      <PageHeader
        title="Detalle del profesionista"
        description="Información de cuenta y suscripción."
        actions={
          <>
            <Link
              to="/profesionistas"
              className="inline-flex text-inherit no-underline hover:no-underline"
            >
              <Button variant="secondary">Lista</Button>
            </Link>
            <Link
              to={`/profesionistas/${pro.id}?edit=1`}
              className="inline-flex text-inherit no-underline hover:no-underline"
            >
              <Button variant={editMode ? "primary" : "secondary"}>
                Editar
              </Button>
            </Link>
          </>
        }
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="text-sm font-semibold text-ink">Contacto</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-muted">Email</dt>
              <dd className="font-medium text-ink">{pro.email}</dd>
            </div>
            <div>
              <dt className="text-muted">Teléfono</dt>
              <dd className="font-medium text-ink">
                {pro.phone ?? "—"}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Registro</dt>
              <dd className="font-medium text-ink">{pro.registeredAt}</dd>
            </div>
          </dl>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-ink">Suscripción</h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted">Plan</span>
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${planBadgeClass(pro.plan)}`}
              >
                {planLabel(pro.plan)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted">Estado</span>
              <Badge variant={pro.status === "active" ? "success" : "neutral"}>
                {pro.status === "active" ? "Activo" : "Inactivo"}
              </Badge>
            </div>
            <p className="text-sm text-muted">
              Próximo cobro estimado:{" "}
              <span className="font-medium text-ink">
                {pro.plan === "free"
                  ? "Sin cargo"
                  : formatMoney(
                      pro.plan === "pro" ? 499 : 1299,
                      "MXN"
                    )}
              </span>
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
