import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2, UserPlus } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Table, type Column } from "@/components/Table";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Badge } from "@/components/Badge";
import { api } from "@/services/api";
import { planBadgeClass, planLabel } from "@/lib/format";
import type { Professional } from "@/types";

export function ProfessionalsPage() {
  const [rows, setRows] = useState<Professional[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    api.getProfessionals().then(setRows);
  }, []);

  const columns: Column<Professional>[] = [
    { key: "name", header: "Nombre", cell: (r) => r.name },
    { key: "specialty", header: "Especialidad", cell: (r) => r.professionLabel },
    { key: "email", header: "Email", cell: (r) => r.email },
    {
      key: "status",
      header: "Estado",
      cell: (r) => (
        <Badge variant={r.status === "active" ? "success" : "neutral"}>
          {r.status === "active" ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },
    {
      key: "plan",
      header: "Plan",
      cell: (r) => (
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${planBadgeClass(r.plan)}`}
        >
          {planLabel(r.plan)}
        </span>
      ),
    },
    { key: "reg", header: "Registro", cell: (r) => r.registeredAt },
    {
      key: "actions",
      header: "Acciones",
      className: "whitespace-nowrap",
      cell: (r) => (
        <div className="flex gap-1">
          <Link
            to={`/profesionistas/${r.id}`}
            className="inline-flex rounded-xl p-2 text-muted hover:bg-stone-100"
            title="Ver"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <Link
            to={`/profesionistas/${r.id}?edit=1`}
            className="inline-flex rounded-xl p-2 text-muted hover:bg-stone-100"
            title="Editar"
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <button
            type="button"
            title="Eliminar (demo)"
            className="inline-flex rounded-xl p-2 text-rose-600 hover:bg-rose-50"
            onClick={() =>
              alert(`Demo: eliminaría a ${r.name} (conectar API real).`)
            }
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout
      title="Profesionistas"
      subtitle="Gestión de cuentas y planes"
    >
      <PageHeader
        title="Lista de profesionistas"
        description="Profesionistas registrados en la plataforma con su plan de suscripción."
        actions={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(true)}>
              Registrar (modal)
            </Button>
            <Link
              to="/profesionistas/nuevo"
              className="inline-flex text-inherit no-underline hover:no-underline"
            >
              <Button>
                <UserPlus className="h-4 w-4" />
                Nuevo profesionista
              </Button>
            </Link>
          </>
        }
      />
      <Table columns={columns} data={rows} rowKey={(r) => r.id} />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Registrar profesionista"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                alert("Demo: aquí enviarías el formulario a tu API.");
                setModalOpen(false);
              }}
            >
              Guardar
            </Button>
          </>
        }
      >
        <p className="mb-4 text-sm text-muted">
          Formulario rápido de demostración. Para flujo completo usa la página{" "}
          <Link
            to="/profesionistas/nuevo"
            className="font-medium text-brand-600 hover:underline"
          >
            Registrar profesionista
          </Link>
          .
        </p>
        <div className="space-y-3">
          <Field label="Nombre completo" />
          <Field label="Email" type="email" />
          <Field label="Especialidad" />
          <div>
            <label className="block text-sm font-medium text-ink">
              Plan
            </label>
            <select className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
              <option value="free">Free</option>
              <option value="pro">Pro</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}

function Field({
  label,
  type = "text",
}: {
  label: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink">{label}</label>
      <input
        type={type}
        className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      />
    </div>
  );
}
