import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  UserCheck,
  Users,
  UserSquare2,
  Pencil,
  Eye,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/Card";
import { Card } from "@/components/Card";
import { Table, type Column } from "@/components/Table";
import { RevenueLineChart } from "@/components/charts/RevenueLineChart";
import { NewUsersBarChart } from "@/components/charts/NewUsersBarChart";
import { api } from "@/services/api";
import { formatMoney, planBadgeClass, planLabel } from "@/lib/format";
import type { Payment, Professional } from "@/types";
import { Badge } from "@/components/Badge";

export function DashboardPage() {
  const [metrics] = useState(() => api.getDashboardMetrics());
  const [revenue, setRevenue] = useState<Awaited<
    ReturnType<typeof api.getRevenueByMonth>
  > | null>(null);
  const [newUsers, setNewUsers] = useState<Awaited<
    ReturnType<typeof api.getNewUsersByMonth>
  > | null>(null);
  const [recentPro, setRecentPro] = useState<Professional[]>([]);
  const [recentPay, setRecentPay] = useState<Payment[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [rev, nu, pros, pays] = await Promise.all([
        api.getRevenueByMonth(),
        api.getNewUsersByMonth(),
        api.getProfessionals(),
        api.getPayments(),
      ]);
      if (cancelled) return;
      setRevenue(rev);
      setNewUsers(nu);
      setRecentPro(
        [...pros].sort(
          (a, b) =>
            new Date(b.registeredAt).getTime() -
            new Date(a.registeredAt).getTime()
        )
      );
      setRecentPay(
        [...pays].sort(
          (a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime()
        )
      );
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const m = metrics;

  const proColumns: Column<Professional>[] = [
    { key: "name", header: "Nombre", cell: (r) => r.name },
    {
      key: "profession",
      header: "Profesión",
      cell: (r) => r.professionLabel,
    },
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
        </div>
      ),
    },
  ];

  const payColumns: Column<Payment>[] = [
    {
      key: "prof",
      header: "Profesionista",
      cell: (r) => r.professionalName,
    },
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
    {
      key: "date",
      header: "Fecha",
      cell: (r) => r.paidAt,
    },
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
    <Layout
      title="Dashboard"
      subtitle="Resumen de ProConnectHub y suscripciones"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total profesionistas"
          value={m.totalProfessionals}
          icon={<UserSquare2 className="h-5 w-5" />}
          trend={{ label: "+12% vs. mes anterior", positive: true }}
        />
        <StatCard
          title="Profesionistas activos"
          value={m.activeProfessionals}
          hint={`${Math.round((m.activeProfessionals / Math.max(m.totalProfessionals, 1)) * 100)}% del total`}
          icon={<UserCheck className="h-5 w-5" />}
        />
        <StatCard
          title="Total clientes"
          value={m.totalClients}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          title="Ingresos del mes"
          value={formatMoney(m.monthRevenue, m.currency)}
          icon={<CreditCard className="h-5 w-5" />}
          trend={{ label: "Suscripciones recurrentes", positive: true }}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="text-base font-semibold text-ink">
            Ingresos por mes
          </h3>
          <p className="mt-1 text-sm text-muted">
            Tendencia de ingresos por suscripciones
          </p>
          <div className="mt-4">
            {revenue && <RevenueLineChart data={revenue} />}
          </div>
        </Card>
        <Card>
          <h3 className="text-base font-semibold text-ink">
            Nuevos usuarios
          </h3>
          <p className="mt-1 text-sm text-muted">
            Altas de profesionistas por mes
          </p>
          <div className="mt-4">
            {newUsers && <NewUsersBarChart data={newUsers} />}
          </div>
        </Card>
      </div>

      <div className="mt-8 space-y-8">
        <div>
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-base font-bold tracking-tight text-ink">
              Últimos profesionistas registrados
            </h3>
            <Link
              to="/profesionistas"
              className="text-xs font-bold uppercase tracking-wider text-brand-600 transition hover:text-brand-700"
            >
              Ver todos
            </Link>
          </div>
          <Table
            columns={proColumns}
            data={recentPro.slice(0, 5)}
            rowKey={(r) => r.id}
          />
        </div>
        <div>
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-base font-bold tracking-tight text-ink">
              Últimos pagos
            </h3>
            <Link
              to="/suscripciones/pagos"
              className="text-xs font-bold uppercase tracking-wider text-brand-600 transition hover:text-brand-700"
            >
              Ver todos
            </Link>
          </div>
          <Table
            columns={payColumns}
            data={recentPay.slice(0, 5)}
            rowKey={(r) => r.id}
          />
        </div>
      </div>
    </Layout>
  );
}
