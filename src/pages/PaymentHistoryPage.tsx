import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Table, type Column } from "@/components/Table";
import { api } from "@/services/api";
import { formatMoney, planLabel } from "@/lib/format";
import type { Payment } from "@/types";

export function PaymentHistoryPage() {
  const [rows, setRows] = useState<Payment[]>([]);

  useEffect(() => {
    api.getPayments().then((p) =>
      setRows(
        [...p].sort(
          (a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime()
        )
      )
    );
  }, []);

  const columns: Column<Payment>[] = [
    { key: "id", header: "ID", cell: (r) => r.id },
    { key: "name", header: "Profesionista", cell: (r) => r.professionalName },
    {
      key: "amount",
      header: "Monto",
      cell: (r) => formatMoney(r.amount, r.currency),
    },
    { key: "plan", header: "Plan", cell: (r) => planLabel(r.plan) },
    { key: "date", header: "Fecha", cell: (r) => r.paidAt },
    {
      key: "status",
      header: "Estado",
      cell: (r) => (
        <span className="text-muted">
          {r.status === "completed"
            ? "Completado"
            : r.status === "pending"
              ? "Pendiente"
              : "Fallido"}
        </span>
      ),
    },
  ];

  return (
    <Layout title="Historial" subtitle="Pagos anteriores">
      <PageHeader
        title="Historial de pagos"
        description="Vista cronológica para conciliación y soporte."
      />
      <Table columns={columns} data={rows} rowKey={(r) => r.id} />
    </Layout>
  );
}
