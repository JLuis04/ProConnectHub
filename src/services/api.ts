/**
 * Capa de datos mock — sustituir por llamadas HTTP reales.
 */
import {
  clients,
  getDashboardMetrics,
  payments,
  professionals,
  revenueByMonth,
  newUsersByMonth,
  subscriptionPlans,
  supportTickets,
} from "./mockData";
import type { Client, Payment, Professional } from "@/types";

export const api = {
  getProfessionals: (): Promise<Professional[]> =>
    Promise.resolve([...professionals]),
  getProfessionalById: (id: string): Promise<Professional | undefined> =>
    Promise.resolve(professionals.find((p) => p.id === id)),
  getClients: (): Promise<Client[]> => Promise.resolve([...clients]),
  getPayments: (): Promise<Payment[]> => Promise.resolve([...payments]),
  getDashboardMetrics,
  getRevenueByMonth: () => Promise.resolve([...revenueByMonth]),
  getNewUsersByMonth: () => Promise.resolve([...newUsersByMonth]),
  getSubscriptionPlans: () => Promise.resolve([...subscriptionPlans]),
  getSupportTickets: () => Promise.resolve([...supportTickets]),
};
