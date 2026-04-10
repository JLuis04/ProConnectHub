import { Bell, Menu, Search } from "lucide-react";
import { useUiStore } from "@/store/uiStore";
import { SidebarChromeBackground } from "./SidebarChromeBackground";

const navTitleShadow =
  "[text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_0_1px_rgba(0,0,0,0.4)]";

interface NavbarProps {
  title: string;
  subtitle?: string;
}

export function Navbar({ title, subtitle }: NavbarProps) {
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  return (
    <header className="sticky top-0 z-20 overflow-hidden border-b border-white/10 bg-[#143023] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.35)] backdrop-blur-md">
      <SidebarChromeBackground />
      <div
        className={`relative z-10 flex h-16 items-center gap-4 px-4 antialiased sm:px-6 lg:px-8 ${navTitleShadow}`}
      >
        <button
          type="button"
          onClick={toggleSidebar}
          className="rounded-full p-2 text-white transition hover:bg-white/10 lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold tracking-tight text-white sm:text-xl">
            {title}
          </h1>
          {subtitle && (
            <p className="truncate text-sm text-white/80">{subtitle}</p>
          )}
        </div>
        <div className="hidden max-w-md flex-1 sm:flex sm:justify-end lg:justify-center">
          <div className="relative flex w-full max-w-md items-center gap-1 rounded-xl border border-white/20 bg-white/95 py-1 pl-3 pr-1 shadow-lg shadow-black/15">
            <Search className="h-4 w-4 shrink-0 text-muted" />
            <input
              type="search"
              placeholder="Buscar profesionistas, clientes…"
              className="min-w-0 flex-1 border-0 bg-transparent py-2 pl-1 pr-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-0"
            />
            <button
              type="button"
              className="shrink-0 rounded-lg bg-[#1d4f32] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#163f28]"
            >
              Buscar
            </button>
          </div>
        </div>
        <button
          type="button"
          className="relative rounded-full p-2 text-white transition hover:bg-white/10"
          aria-label="Notificaciones"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-300 ring-2 ring-white/40" />
        </button>
        <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/12 py-1 pl-1 pr-3 shadow-md shadow-black/10 backdrop-blur-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white shadow-sm ring-2 ring-white/30">
            AD
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-white/75">admin@proconnecthub.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
