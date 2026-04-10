import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, UserPlus } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Table, type Column } from "@/components/Table";
import { Button } from "@/components/Button";
import { api } from "@/services/api";
import type { Client, Professional } from "@/types";

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  useEffect(() => {
    Promise.all([api.getClients(), api.getProfessionals()]).then(
      ([c, p]) => {
        setClients(c);
        setProfessionals(p);
      }
    );
  }, []);

  const proMap = useMemo(() => {
    const m = new Map<string, string>();
    professionals.forEach((p) => m.set(p.id, p.name));
    return m;
  }, [professionals]);

  const columns: Column<Client>[] = [
    { key: "name", header: "Nombre", cell: (r) => r.name },
    {
      key: "pro",
      header: "Profesionista asignado",
      cell: (r) => proMap.get(r.professionalId) ?? "—",
    },
    { key: "email", header: "Email", cell: (r) => r.email },
    { key: "phone", header: "Teléfono", cell: (r) => r.phone },
    {
      key: "actions",
      header: "Acciones",
      className: "whitespace-nowrap",
      cell: (r) => (
        <Link
          to={`/profesionistas/${r.professionalId}`}
          className="inline-flex items-center gap-1 rounded-xl px-2 py-1.5 text-sm font-medium text-brand-600 hover:bg-brand-50"
        >
          <Eye className="h-4 w-4" />
          Ver profesionista
        </Link>
      ),
    },
  ];

  return (
    <Layout title="Clientes" subtitle="Relación con profesionistas">
      <PageHeader
        title="Lista de clientes"
        description="Clientes finales gestionados por cada profesionista en la plataforma."
        actions={
          <Link
            to="/clientes/nuevo"
            className="inline-flex text-inherit no-underline hover:no-underline"
          >
            <Button>
              <UserPlus className="h-4 w-4" />
              Registrar cliente
            </Button>
          </Link>
        }
      />
      <Table columns={columns} data={clients} rowKey={(r) => r.id} />
    </Layout>
  );
}
