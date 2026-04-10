import type { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  className?: string;
  cell: (row: T) => ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  rowKey: (row: T) => string;
}

export function Table<T>({
  columns,
  data,
  emptyMessage = "Sin datos",
  rowKey,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-card">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-stone-100 bg-brand-50/40">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`px-4 py-3 font-semibold text-muted ${col.className ?? ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-muted"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={rowKey(row)}
                className="transition-colors hover:bg-brand-50/35"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-ink ${col.className ?? ""}`}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
