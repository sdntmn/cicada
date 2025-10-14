import React from "react"

import cn from "classnames"
import { Checkbox } from "itpc-ui-kit"

import { Column, NumberColumns, RowType } from "../../types"
import { TableSortCell } from "../TableSortCell"

import "./styles.scss"

interface TableSortRowProps {
  arrKeysNameColumns: (keyof RowType)[]
  columns?: Column<RowType>[]
  index?: number
  isChecked?: boolean
  isSelected?: boolean
  isShowRowIndex?: boolean
  isShowSelection?: boolean
  nameMainColumnSort?: keyof RowType
  onCheck: (checked: boolean) => void
  rowData: RowType
  selectedRow?: Set<string | number>
  sortByNumberColumns?: NumberColumns
}

export const TableSortRow: React.FC<TableSortRowProps> = ({
  arrKeysNameColumns,
  columns,
  index,
  isSelected,
  isShowRowIndex,
  isShowSelection,
  nameMainColumnSort,
  onCheck,
  rowData,
  selectedRow,
  sortByNumberColumns,
  ...rest
}: TableSortRowProps) => {
  const columnMap = React.useMemo(() => {
    if (!columns) {
      return {}
    }
    return columns.reduce<Record<string, Column<RowType>>>((acc, col) => {
      acc[String(col.name)] = col
      return acc
    }, {})
  }, [columns])

  return (
    <tr className={cn("table-sort-row", isSelected && "table-sort-row__selected")} {...rest}>
      {isShowSelection && onCheck && (
        <td className="table-sort-row__selection-cell">
          <Checkbox
            className="table-sort-checkbox"
            id={`check-${rowData.id}`}
            isChecked={selectedRow?.has(rowData.id) || false}
            name="row-selection"
            onClick={(e) => onCheck(e.target.checked)}
            type="checkbox"
            variant="square"
          />
        </td>
      )}
      {isShowRowIndex && <TableSortCell isMainColumSort={false} value={(index + 1).toString()} />}
      {rowData &&
        arrKeysNameColumns &&
        arrKeysNameColumns?.map((colName) => {
          const column = columnMap[String(colName)]
          const align = column?.align || "left"
          const value = rowData[colName]
          return (
            <TableSortCell
              align={align}
              isMainColumSort={nameMainColumnSort === colName}
              key={colName}
              sortByNumberColumns={sortByNumberColumns}
              value={value}
            />
          )
        })}
    </tr>
  )
}
