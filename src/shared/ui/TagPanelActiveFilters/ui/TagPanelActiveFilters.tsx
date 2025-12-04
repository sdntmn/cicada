import React from "react"

import cn from "classnames"

import { closeIcon } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon"
import { Flex } from "@/shared/ui/layout/Flex"

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
      <Flex gap={8} wrap="wrap">
        {activeFilters.map(([column, value]) => (
          <div className="tag-panel-active-filters__item" key={String(column)}>
            <span className="tag-panel-active-filters__label">{columnLabels[column]}:</span>
            <span className="tag-panel-active-filters__value">{value}</span>
            <button
              aria-label={`Убрать фильтр по ${columnLabels[column]}`}
              className="tag-panel-active-filters__remove"
              onClick={() => onRemoveFilter(column)}
              type="button"
            >
              <Icon className={cn(closeIcon, "tag-panel-active-filters__icon-close")} />
            </button>
          </div>
        ))}
      </Flex>
      <button className="tag-panel-active-filters__reset" onClick={onResetAll} type="button">
        Очистить всё
      </button>
    </Flex>
  )
}
