import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

interface LayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function Layout({ title, subtitle, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <div className="lg:pl-64">
        <Navbar title={title} subtitle={subtitle} />
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
