import { Link, NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  CreditCard,
  Headphones,
  LayoutDashboard,
  Settings,
  Users,
  UserSquare2,
  Wallet,
  ChevronDown,
  X,
} from "lucide-react";
import { useUiStore } from "@/store/uiStore";
import { useEffect, useState, type ReactNode } from "react";
import { SidebarChromeBackground } from "./SidebarChromeBackground";

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}

interface NavGroup {
  label: string;
  icon: ReactNode;
  items: NavItem[];
}

const groups: NavGroup[] = [
  {
    label: "Profesionistas",
    icon: <UserSquare2 className="h-4 w-4" />,
    items: [
      { to: "/profesionistas", label: "Lista" },
      { to: "/profesionistas/nuevo", label: "Registrar" },
    ],
  },
  {
    label: "Clientes",
    icon: <Users className="h-4 w-4" />,
    items: [
      { to: "/clientes", label: "Lista" },
      { to: "/clientes/nuevo", label: "Registrar" },
    ],
  },
  {
    label: "Suscripciones",
    icon: <CreditCard className="h-4 w-4" />,
    items: [
      { to: "/suscripciones/planes", label: "Planes" },
      { to: "/suscripciones/pagos", label: "Pagos" },
      { to: "/suscripciones/historial", label: "Historial" },
    ],
  },
  {
    label: "Finanzas",
    icon: <Wallet className="h-4 w-4" />,
    items: [
      { to: "/finanzas/ingresos", label: "Ingresos mensuales" },
      { to: "/finanzas/metricas", label: "Métricas de crecimiento" },
    ],
  },
  {
    label: "Reportes",
    icon: <BarChart3 className="h-4 w-4" />,
    items: [{ to: "/reportes", label: "Reportes" }],
  },
  {
    label: "Soporte",
    icon: <Headphones className="h-4 w-4" />,
    items: [{ to: "/soporte", label: "Tickets" }],
  },
  {
    label: "Configuración",
    icon: <Settings className="h-4 w-4" />,
    items: [{ to: "/configuracion", label: "General" }],
  },
];

function pathMatchesItem(pathname: string, item: NavItem): boolean {
  const to = item.to;
  if (item.end) return pathname === to;
  if (to === "/") return pathname === "/";
  if (pathname === to) return true;
  return pathname.startsWith(`${to}/`);
}

/** Grupo que contiene la ruta actual, o null (p. ej. en Dashboard /). */
function activeGroupLabelForPath(pathname: string): string | null {
  for (const g of groups) {
    for (const item of g.items) {
      if (pathMatchesItem(pathname, item)) return g.label;
    }
  }
  return null;
}

function openGroupsForPath(pathname: string): Record<string, boolean> {
  const active = activeGroupLabelForPath(pathname);
  return Object.fromEntries(
    groups.map((g) => [g.label, active !== null && g.label === active])
  );
}

const navTextShadow =
  "[text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_0_1px_rgba(0,0,0,0.4)]";

function linkClass({ isActive }: { isActive: boolean }) {
  return `block rounded-full px-3 py-2 text-sm font-medium transition ${navTextShadow} ${
    isActive
      ? "bg-white/20 text-white shadow-sm ring-1 ring-white/35"
      : "text-white hover:bg-white/12 hover:text-white"
  }`;
}

/** Un solo submenú activo: si varios `to` encajan (p. ej. /profesionistas y /profesionistas/nuevo), gana el más específico. */
function isNavItemActive(
  pathname: string,
  item: NavItem,
  siblings: NavItem[]
): boolean {
  if (item.end) return pathname === item.to;

  const candidates = siblings.filter((s) => {
    if (pathname === s.to) return true;
    if (s.to === "/" || s.to === "") return false;
    return pathname.startsWith(`${s.to}/`);
  });
  if (candidates.length === 0) return false;
  const best = candidates.reduce((a, b) => (a.to.length >= b.to.length ? a : b));
  return best.to === item.to;
}

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useUiStore();
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    openGroupsForPath(location.pathname)
  );

  useEffect(() => {
    setOpenGroups(openGroupsForPath(location.pathname));
  }, [location.pathname]);

  const toggleGroup = (label: string) => {
    setOpenGroups((s) => ({ ...s, [label]: !s[label] }));
  };

  const aside = (
    <aside className="relative flex h-full w-64 shrink-0 flex-col overflow-hidden bg-[#143023] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)] ring-1 ring-white/10">
      <SidebarChromeBackground />
      <div className="relative z-10 flex h-full min-h-0 flex-col antialiased">
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <img
          src="/LogoProConnectHub.png"
          alt="ProConnectHub"
          className="h-10 w-auto max-w-[calc(100%-2.5rem)] shrink object-contain object-left"
          style={{
            filter:
              "drop-shadow(1px 0 0 #fff) drop-shadow(-1px 0 0 #fff) drop-shadow(0 1px 0 #fff) drop-shadow(0 -1px 0 #fff) drop-shadow(1px 1px 0 #fff) drop-shadow(-1px 1px 0 #fff) drop-shadow(1px -1px 0 #fff) drop-shadow(-1px -1px 0 #fff)",
          }}
        />
        <button
          type="button"
          className="ml-auto shrink-0 rounded-full p-1.5 text-white transition hover:bg-white/10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Cerrar menú"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 text-white">
        <div className="rounded-xl pb-1">
          <NavLink
            to="/"
            end
            className={(p) =>
              `${linkClass(p)} flex items-center gap-2.5`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard className="h-4 w-4 shrink-0 text-white" />
            Dashboard
          </NavLink>
        </div>
        {groups.map((group) => {
          const expanded = openGroups[group.label] ?? false;
          return (
            <div key={group.label} className="rounded-xl pb-1">
              <button
                type="button"
                onClick={() => toggleGroup(group.label)}
                className={`flex w-full items-center gap-2 rounded-full px-2 py-2 text-left text-xs font-semibold uppercase tracking-wide text-white/92 transition hover:bg-white/10 hover:text-white ${navTextShadow}`}
              >
                <span className="text-white [&_svg]:text-current">{group.icon}</span>
                <span className="flex-1">{group.label}</span>
                <ChevronDown
                  className={`h-4 w-4 text-white/85 transition ${expanded ? "rotate-0" : "-rotate-90"}`}
                />
              </button>
              {expanded && (
                <div className="mt-1 space-y-0.5 pl-1">
                  {group.items.map((item) => {
                    const subActive = isNavItemActive(
                      location.pathname,
                      item,
                      group.items
                    );
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={linkClass({ isActive: subActive })}
                        aria-current={subActive ? "page" : undefined}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <p className={`text-xs text-white/75 ${navTextShadow}`}>v0.0.1 · Mock data</p>
      </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex">{aside}</div>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-stone-900/45"
            aria-label="Cerrar menú"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 z-50 flex w-64 max-w-[85vw] shadow-xl">
            {aside}
          </div>
        </div>
      )}
    </>
  );
}
