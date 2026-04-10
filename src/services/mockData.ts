import type {
  Client,
  MonthlyRevenuePoint,
  NewUsersPoint,
  Payment,
  Professional,
  SubscriptionPlan,
  SupportTicket,
} from "@/types";

export const professionals: Professional[] = [
  {
    id: "p1",
    name: "Ana Martínez",
    email: "ana.martinez@email.com",
    specialty: "nutricion",
    professionLabel: "Nutricionista",
    status: "active",
    plan: "pro",
    registeredAt: "2026-03-28",
    phone: "+52 55 1000 0001",
  },
  {
    id: "p2",
    name: "Carlos Ruiz",
    email: "carlos.ruiz@email.com",
    specialty: "psicologia",
    professionLabel: "Psicólogo",
    status: "active",
    plan: "premium",
    registeredAt: "2026-03-22",
    phone: "+52 55 1000 0002",
  },
  {
    id: "p3",
    name: "Laura Gómez",
    email: "laura.gomez@email.com",
    specialty: "fisioterapia",
    professionLabel: "Fisioterapeuta",
    status: "inactive",
    plan: "free",
    registeredAt: "2026-02-10",
  },
  {
    id: "p4",
    name: "Miguel Hernández",
    email: "miguel.h@email.com",
    specialty: "coaching",
    professionLabel: "Coach ejecutivo",
    status: "active",
    plan: "pro",
    registeredAt: "2026-04-02",
    phone: "+52 55 1000 0004",
  },
  {
    id: "p5",
    name: "Sofía Torres",
    email: "sofia.t@email.com",
    specialty: "odontologia",
    professionLabel: "Odontóloga",
    status: "active",
    plan: "premium",
    registeredAt: "2026-04-08",
  },
];

export const clients: Client[] = [
  {
    id: "c1",
    name: "Pedro Sánchez",
    email: "pedro@email.com",
    phone: "+52 55 2000 0001",
    professionalId: "p1",
  },
  {
    id: "c2",
    name: "María López",
    email: "maria@email.com",
    phone: "+52 55 2000 0002",
    professionalId: "p1",
  },
  {
    id: "c3",
    name: "Jorge Ramírez",
    email: "jorge@email.com",
    phone: "+52 55 2000 0003",
    professionalId: "p2",
  },
  {
    id: "c4",
    name: "Elena Vargas",
    email: "elena@email.com",
    phone: "+52 55 2000 0004",
    professionalId: "p4",
  },
];

export const payments: Payment[] = [
  {
    id: "pay1",
    professionalId: "p2",
    professionalName: "Carlos Ruiz",
    amount: 1299,
    currency: "MXN",
    plan: "premium",
    paidAt: "2026-04-01",
    status: "completed",
  },
  {
    id: "pay2",
    professionalId: "p1",
    professionalName: "Ana Martínez",
    amount: 499,
    currency: "MXN",
    plan: "pro",
    paidAt: "2026-04-03",
    status: "completed",
  },
  {
    id: "pay3",
    professionalId: "p5",
    professionalName: "Sofía Torres",
    amount: 1299,
    currency: "MXN",
    plan: "premium",
    paidAt: "2026-04-08",
    status: "pending",
  },
  {
    id: "pay4",
    professionalId: "p4",
    professionalName: "Miguel Hernández",
    amount: 499,
    currency: "MXN",
    plan: "pro",
    paidAt: "2026-03-28",
    status: "completed",
  },
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    currency: "MXN",
    features: [
      "Hasta 10 clientes",
      "Recordatorios básicos",
      "Soporte por correo",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 499,
    currency: "MXN",
    highlight: true,
    features: [
      "Clientes ilimitados",
      "Facturación y cobros",
      "Automatizaciones",
      "Soporte prioritario",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    priceMonthly: 1299,
    currency: "MXN",
    features: [
      "Todo en Pro",
      "Marca blanca",
      "API y webhooks",
      "Account manager",
    ],
  },
];

export const revenueByMonth: MonthlyRevenuePoint[] = [
  { month: "Nov", revenue: 12400 },
  { month: "Dic", revenue: 15800 },
  { month: "Ene", revenue: 14200 },
  { month: "Feb", revenue: 18900 },
  { month: "Mar", revenue: 21300 },
  { month: "Abr", revenue: 24600 },
];

export const newUsersByMonth: NewUsersPoint[] = [
  { month: "Nov", count: 12 },
  { month: "Dic", count: 18 },
  { month: "Ene", count: 15 },
  { month: "Feb", count: 22 },
  { month: "Mar", count: 28 },
  { month: "Abr", count: 19 },
];

export const supportTickets: SupportTicket[] = [
  {
    id: "t1",
    subject: "Error al generar factura PDF",
    requester: "Ana Martínez",
    status: "open",
    updatedAt: "2026-04-09",
  },
  {
    id: "t2",
    subject: "Cambio de plan a Premium",
    requester: "Sofía Torres",
    status: "in_progress",
    updatedAt: "2026-04-08",
  },
  {
    id: "t3",
    subject: "Duda sobre exportación de datos",
    requester: "Miguel Hernández",
    status: "resolved",
    updatedAt: "2026-04-05",
  },
];

/** Agregados para el dashboard */
export function getDashboardMetrics() {
  const totalProfessionals = professionals.length;
  const activeProfessionals = professionals.filter((p) => p.status === "active")
    .length;
  const totalClients = clients.length;
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const monthRevenue = payments
    .filter((p) => {
      const d = new Date(p.paidAt);
      return (
        d.getMonth() === month &&
        d.getFullYear() === year &&
        p.status === "completed"
      );
    })
    .reduce((acc, p) => acc + p.amount, 0);

  return {
    totalProfessionals,
    activeProfessionals,
    totalClients,
    monthRevenue,
    currency: "MXN" as const,
  };
}
