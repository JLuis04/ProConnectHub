import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/Button";

export function NotFoundPage() {
  return (
    <Layout title="404" subtitle="Página no encontrada">
      <p className="text-muted">La ruta no existe.</p>
      <Link
        to="/"
        className="mt-6 inline-block text-inherit no-underline hover:no-underline"
      >
        <Button>Ir al dashboard</Button>
      </Link>
    </Layout>
  );
}
