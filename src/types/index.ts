export type PlanId = "free" | "pro" | "premium";
export type UserStatus = "active" | "inactive";

export interface Professional {
  id: string;
  name: string;
  email: string;
  specialty: string;
  professionLabel: string;
  status: UserStatus;
  plan: PlanId;
  registeredAt: string;
  phone?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  professionalId: string;
}

export interface Payment {
  id: string;
  professionalId: string;
  professionalName: string;
  amount: number;
  currency: string;
  plan: PlanId;
  paidAt: string;
  status: "completed" | "pending" | "failed";
}

export interface SubscriptionPlan {
  id: PlanId;
  name: string;
  priceMonthly: number;
  currency: string;
  features: string[];
  highlight?: boolean;
}

export interface MonthlyRevenuePoint {
  month: string;
  revenue: number;
}

export interface NewUsersPoint {
  month: string;
  count: number;
}

export interface SupportTicket {
  id: string;
  subject: string;
  requester: string;
  status: "open" | "in_progress" | "resolved";
  updatedAt: string;
}
