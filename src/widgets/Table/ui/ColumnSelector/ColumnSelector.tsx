import React from "react"

import { Checkbox } from "itpc-ui-kit"

import { Flex } from "@/shared/ui/layout/Flex"

import { COLUMN_LABELS } from "../../lib/constants/columns"
import { ColumnTableSelect } from "../../lib/types/table"

import "./styles.scss"

interface Props {
  allColumns: ColumnTableSelect[]
  onChange: (selected: Set<ColumnTableSelect>) => void
  selected: Set<ColumnTableSelect>
}

export const ColumnSelector: React.FC<Props> = ({ allColumns, onChange, selected }) => {
  const handleToggle = (column: ColumnTableSelect) => {
    const newSet = new Set(selected)
    if (newSet.has(column)) {
      newSet.delete(column)
    } else {
      newSet.add(column)
    }
    onChange(newSet)
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
        {allColumns.map((column) => (
          <Checkbox
            id={`check-${column}`}
            isChecked={selected.has(column)}
            key={column}
            label={COLUMN_LABELS[column]}
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
