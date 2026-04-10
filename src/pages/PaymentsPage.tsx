import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Table, type Column } from "@/components/Table";
import { Badge } from "@/components/Badge";
import { api } from "@/services/api";
import { formatMoney, planBadgeClass, planLabel } from "@/lib/format";
import type { Payment } from "@/types";

export function PaymentsPage() {
  const [rows, setRows] = useState<Payment[]>([]);

  useEffect(() => {
    api.getPayments().then(setRows);
  }, []);

  const columns: Column<Payment>[] = [
    { key: "name", header: "Profesionista", cell: (r) => r.professionalName },
    {
      key: "amount",
      header: "Monto",
      cell: (r) => formatMoney(r.amount, r.currency),
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
    { key: "date", header: "Fecha", cell: (r) => r.paidAt },
    {
      key: "status",
      header: "Estado",
      cell: (r) => (
        <Badge
          variant={
            r.status === "completed"
              ? "success"
              : r.status === "pending"
                ? "warning"
                : "danger"
          }
        >
          {r.status === "completed"
            ? "Completado"
            : r.status === "pending"
              ? "Pendiente"
              : "Fallido"}
        </Badge>
      ),
    },
  ];

  return (
    <Layout title="Pagos" subtitle="Cobros de suscripción">
      <PageHeader
        title="Pagos recientes"
        description="Últimos cargos registrados (datos mock)."
      />
      <Table columns={columns} data={rows} rowKey={(r) => r.id} />
    </Layout>
  );
}
