import { Column, ColumnConfig, type RowType } from "@/shared/lib/types/table"

export const getVisibleColumns = <T extends RowType<object>, C extends string, V extends string>(
  visibleKeys: (C | V)[],
  config: ColumnConfig<T, C, V>
): Column<T>[] =>
  visibleKeys
    .map((key) => {
      if (key in config.virtualColumns) {
        return config.virtualColumns[key as V]
      }
      if (key in config.columns) {
        return config.columns[key as C]
      }
      return null
    })
    .filter(Boolean) as Column<T>[]
