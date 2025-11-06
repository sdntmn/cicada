import React from "react"

import { Checkbox } from "itpc-ui-kit"

import { Flex } from "@/shared/ui/layout/Flex"

import "./styles.scss"

interface Props<T> {
  allColumns: T[]
  getColumnLabel: (column: T) => string // ← новый пропс
  onChange: (selected: Set<T>) => void
  selected: Set<T>
}

export const ColumnSelector = <T,>({ allColumns, getColumnLabel, onChange, selected }: Props<T>) => {
  const handleToggle = (column: T) => {
    const newSelected = new Set(selected)
    if (newSelected.has(column)) {
      newSelected.delete(column)
    } else {
      newSelected.add(column)
    }
    onChange(newSelected)
  }

  const handleToggleAll = () => {
    const allSelected = allColumns.every((col) => selected.has(col))
    if (allSelected) {
      onChange(new Set())
    } else {
      onChange(new Set(allColumns))
    }
  }

  const isAllSelected = allColumns.length > 0 && allColumns.every((col) => selected.has(col))

  return (
    <Flex className="column-selector__list" vertical>
      <Checkbox
        id="check-all"
        isChecked={isAllSelected}
        label="Выбрать все"
        name="select-all"
        onClick={handleToggleAll}
        variant="square"
      />
      <Flex className="column-selector__list" gap={4} vertical>
        {allColumns.map((column, index) => (
          <Checkbox
            id={`check-${column}`}
            isChecked={selected.has(column)}
            key={index}
            label={getColumnLabel(column)}
            name={`column-${column}`}
            onClick={() => handleToggle(column)}
            type="checkbox"
            variant="square"
          />
        ))}
      </Flex>
    </Flex>
  )
}
