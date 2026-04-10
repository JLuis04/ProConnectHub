import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { NewUsersPoint } from "@/types";

interface Props {
  data: NewUsersPoint[];
}

export function NewUsersBarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "1px solid #e7e5e4",
            boxShadow: "0 10px 40px -10px rgb(29 79 50 / 0.14)",
          }}
          formatter={(value: number) => [`${value} usuarios`, "Nuevos"]}
        />
        <Bar dataKey="count" fill="#1d4f32" radius={[8, 8, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}
