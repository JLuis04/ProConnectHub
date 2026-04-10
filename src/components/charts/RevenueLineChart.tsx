import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonthlyRevenuePoint } from "@/types";
import { formatMoney } from "@/lib/format";

interface Props {
  data: MonthlyRevenuePoint[];
}

export function RevenueLineChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d4f32" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#1d4f32" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#6B7280", fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#6B7280", fontSize: 12 }}
          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "1px solid #e7e5e4",
            boxShadow: "0 10px 40px -10px rgb(29 79 50 / 0.14)",
          }}
          formatter={(value: number) => [formatMoney(value), "Ingresos"]}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#1d4f32"
          strokeWidth={2}
          fill="url(#revFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
