import React from "react"

import { Column, KeySort, KeysSort, NumberColumns, RowType } from "../../types"
import { renderIcon, renderIconTwoColumns } from "../../utils" // убедитесь, что они экспортируются

interface Props<T extends RowType> {
  column: Column<T>
  currentKey?: KeySort<T>
  currentKeys?: KeysSort<T>
  sortByNumberColumns?: NumberColumns
}

export const SortIcon = <T extends RowType>({ column, currentKey, currentKeys, sortByNumberColumns }: Props<T>) => {
  if (sortByNumberColumns === NumberColumns.TWO) {
    return <>{renderIconTwoColumns(column, currentKeys)}</>
  }

  if (sortByNumberColumns === NumberColumns.ONE) {
    return <>{renderIcon(column, currentKey)}</>
  }

  return null
}
