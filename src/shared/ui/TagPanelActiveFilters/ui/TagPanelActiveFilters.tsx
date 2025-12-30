import React from "react"

import { Flex } from "@/shared/ui/layout/Flex"

import { Chip } from "../../Chip"

import "./styles.scss"

interface Props {
  columnLabels: Record<string, string> // ← вынесено в пропс
  filters: Partial<Record<string, string>>
  onRemoveFilter: (column: string) => void
  onResetAll: () => void
  visibleColumns: string[]
}

export const TagPanelActiveFilters: React.FC<Props> = ({ columnLabels, filters, onRemoveFilter, onResetAll, visibleColumns }) => {
  const columnOrder = visibleColumns

  const activeFilters = Object.entries(filters)
    .filter(([, value]) => value.trim() !== "")
    .sort(([colA], [colB]) => {
      const indexA = columnOrder.indexOf(colA)
      const indexB = columnOrder.indexOf(colB)
      if (indexA === -1) {
        return 1
      }
      if (indexB === -1) {
        return -1
      }
      return indexA - indexB
    })

  if (activeFilters.length === 0) {
    return null
  }

  return (
    <Flex align="center" gap={16} wrap="wrap">
      {activeFilters.map(([column, value]) => (
        <Chip key={String(column)} onRemove={() => onRemoveFilter(column)} size="sm">
          <span className="tag-panel-active-filters__label">{columnLabels[column]}:</span> {value}
        </Chip>
      ))}

      <button className="tag-panel-active-filters__reset" onClick={onResetAll} type="button">
        Очистить всё
      </button>
    </Flex>
  )
}
