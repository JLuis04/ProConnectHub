import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "@/pages/DashboardPage";
import { ProfessionalsPage } from "@/pages/ProfessionalsPage";
import { ProfessionalNewPage } from "@/pages/ProfessionalNewPage";
import { ProfessionalDetailPage } from "@/pages/ProfessionalDetailPage";
import { ClientsPage } from "@/pages/ClientsPage";
import { ClientNewPage } from "@/pages/ClientNewPage";
import { SubscriptionPlansPage } from "@/pages/SubscriptionPlansPage";
import { PaymentsPage } from "@/pages/PaymentsPage";
import { PaymentHistoryPage } from "@/pages/PaymentHistoryPage";
import { FinanceIncomePage } from "@/pages/FinanceIncomePage";
import { FinanceMetricsPage } from "@/pages/FinanceMetricsPage";
import { ReportsPage } from "@/pages/ReportsPage";
import { SupportPage } from "@/pages/SupportPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/profesionistas" element={<ProfessionalsPage />} />
      <Route path="/profesionistas/nuevo" element={<ProfessionalNewPage />} />
      <Route path="/profesionistas/:id" element={<ProfessionalDetailPage />} />
      <Route path="/clientes" element={<ClientsPage />} />
      <Route path="/clientes/nuevo" element={<ClientNewPage />} />
      <Route
        path="/suscripciones/planes"
        element={<SubscriptionPlansPage />}
      />
      <Route path="/suscripciones/pagos" element={<PaymentsPage />} />
      <Route
        path="/suscripciones/historial"
        element={<PaymentHistoryPage />}
      />
      <Route path="/finanzas/ingresos" element={<FinanceIncomePage />} />
      <Route path="/finanzas/metricas" element={<FinanceMetricsPage />} />
      <Route path="/reportes" element={<ReportsPage />} />
      <Route path="/soporte" element={<SupportPage />} />
      <Route path="/configuracion" element={<SettingsPage />} />
      <Route path="/dashboard" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
