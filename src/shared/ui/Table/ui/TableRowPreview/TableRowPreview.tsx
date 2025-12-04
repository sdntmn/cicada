import React from "react"

import { Column, RowType } from "@/shared/lib/types/table"

interface Props<T extends RowType> {
  className?: string
  columns: Column<T>[] // ← принимает уже собранный массив колонок
  rowData: T
  rowIndex?: number
}

export const TableRowPreview = <T extends RowType>({ className, columns, rowData, rowIndex }: Props<T>) => {
  if (!rowData || !columns?.length) {
    return null
  }

  return (
    <div className={className} style={{ display: "table-row", width: "100%" }}>
      {columns.map((column) => {
        let content: React.ReactNode

        if (column.type === "virtual") {
          content = column.render?.(rowData, rowIndex ?? -1) ?? null
        } else {
          const value = rowData[column.name as keyof T]
          content = column.render ? column.render(value, rowData, rowIndex ?? -1) : value != null ? String(value) : ""
        }

        return (
          <div
            style={{
              display: "table-cell",
              fontSize: "14px",
              lineHeight: 1.4,
              overflow: "hidden",
              padding: "0px 16px",
              textAlign: column.align || "left",
              textOverflow: "ellipsis",
              verticalAlign: "middle",
              whiteSpace: "nowrap",
            }}
            key={column.name.toString()}
          >
            {content}
          </div>
        )
      })}
    </div>
  )
}
