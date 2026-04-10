import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { api } from "@/services/api";
import type { Professional } from "@/types";

export function ClientNewPage() {
  const [pros, setPros] = useState<Professional[]>([]);

  useEffect(() => {
    api.getProfessionals().then(setPros);
  }, []);

  return (
    <Layout title="Registrar cliente" subtitle="Asignar a un profesionista">
      <PageHeader
        title="Nuevo cliente"
        description="El cliente quedará vinculado al profesionista seleccionado."
        actions={
          <Link
            to="/clientes"
            className="inline-flex text-inherit no-underline hover:no-underline"
          >
            <Button variant="secondary">Volver</Button>
          </Link>
        }
      />
      <Card className="max-w-xl">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Demo: enviarías este cliente a tu API.");
          }}
        >
          <div>
            <label className="block text-sm font-medium text-ink">
              Nombre
            </label>
            <input
              required
              className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">
              Profesionista
            </label>
            <select
              required
              className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="">Seleccionar…</option>
              {pros.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.professionLabel}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink">
              Teléfono
            </label>
            <input
              required
              className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <Button type="submit">Guardar cliente</Button>
        </form>
      </Card>
    </Layout>
  );
}
