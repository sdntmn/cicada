import React from "react"

import { Column, NumberColumns, RowType } from "../../types"
import { TableSortRow } from "../TableSortRow"

interface TableSortBodyProps {
  arrKeysNameColumns?: (keyof RowType)[]
  columns?: Column<RowType>[]
  getRowId?: (row: RowType) => string | number
  isShowRowIndex: boolean
  isShowSelection: boolean
  nameMainColumnSort?: keyof RowType
  onRowSelect?: (id: string | number, checked: boolean) => void
  rows: RowType[]
  selectedRow?: Set<string | number>
  sortByNumberColumns?: NumberColumns
}

export const TableSortBody: React.FC<TableSortBodyProps> = ({
  arrKeysNameColumns,
  columns,
  getRowId,
  isShowRowIndex,
  isShowSelection,
  nameMainColumnSort,
  onRowSelect,
  rows,
  selectedRow,
  sortByNumberColumns,
  ...rest
}: TableSortBodyProps) => (
  <tbody className="itpc-table-sort__body" {...rest}>
    {rows &&
      rows.map((row: RowType, index) => {
        const rowId = getRowId(row)
        const isSelected = selectedRow?.has(rowId) || false

        return (
          <TableSortRow
            arrKeysNameColumns={arrKeysNameColumns}
            columns={columns}
            index={index}
            isSelected={isSelected} // ← новое свойство
            isShowRowIndex={isShowRowIndex}
            isShowSelection={isShowSelection}
            key={rowId}
            nameMainColumnSort={nameMainColumnSort}
            onCheck={(checked) => onRowSelect?.(rowId, checked)}
            rowData={row}
            selectedRow={selectedRow}
            sortByNumberColumns={sortByNumberColumns}
          />
        )
      })}
  </tbody>
)
