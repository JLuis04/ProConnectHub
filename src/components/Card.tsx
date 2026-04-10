import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

const paddingMap = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export function Card({ children, className = "", padding = "md" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-stone-200 bg-white shadow-card transition-shadow duration-200 hover:shadow-card-hover ${paddingMap[padding]} ${className}`}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
  trend?: { label: string; positive?: boolean };
}

export function StatCard({
  title,
  value,
  hint,
  icon,
  trend,
}: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-ink">
            {value}
          </p>
          {hint && (
            <p className="mt-1 text-xs text-muted">{hint}</p>
          )}
          {trend && (
            <p
              className={`mt-2 inline-flex items-center text-xs font-medium ${
                trend.positive === false
                  ? "text-rose-600"
                  : "text-brand-600"
              }`}
            >
              {trend.label}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-brand-600 shadow-sm ring-1 ring-stone-100">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
