import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Table, type Column } from "@/components/Table";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { api } from "@/services/api";
import type { SupportTicket } from "@/types";

export function SupportPage() {
  const [rows, setRows] = useState<SupportTicket[]>([]);

  useEffect(() => {
    api.getSupportTickets().then(setRows);
  }, []);

  const columns: Column<SupportTicket>[] = [
    { key: "id", header: "Ticket", cell: (r) => r.id.toUpperCase() },
    { key: "sub", header: "Asunto", cell: (r) => r.subject },
    { key: "req", header: "Solicitante", cell: (r) => r.requester },
    {
      key: "st",
      header: "Estado",
      cell: (r) => (
        <Badge
          variant={
            r.status === "resolved"
              ? "success"
              : r.status === "in_progress"
                ? "warning"
                : "neutral"
          }
        >
          {r.status === "open"
            ? "Abierto"
            : r.status === "in_progress"
              ? "En progreso"
              : "Resuelto"}
        </Badge>
      ),
    },
    { key: "up", header: "Actualizado", cell: (r) => r.updatedAt },
    {
      key: "act",
      header: "Acciones",
      cell: () => (
        <Button variant="ghost" className="!px-2 !py-1.5 text-sm">
          Abrir
        </Button>
      ),
    },
  ];

  return (
    <Layout title="Soporte" subtitle="Tickets">
      <PageHeader
        title="Tickets de soporte"
        description="Cola mock para integrar con Zendesk, Intercom o tu inbox interno."
        actions={<Button>Nuevo ticket (demo)</Button>}
      />
      <Table columns={columns} data={rows} rowKey={(r) => r.id} />
    </Layout>
  );
}
