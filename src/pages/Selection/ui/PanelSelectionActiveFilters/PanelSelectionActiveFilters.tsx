import React from "react"

import cn from "classnames"

import { closeIcon } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon/ui/Icon"
import { Flex } from "@/shared/ui/layout/Flex"

import { FilterMode } from "../../lib/constants/enum"

import "./styles.scss"

interface ActiveFiltersProps {
  filterMode?: FilterMode
  onClearSum?: () => void
  onClearTerm?: () => void
  sumValue?: string
  termValue?: string
}

export const PanelSelectionActiveFilters: React.FC<ActiveFiltersProps> = ({
  filterMode,
  onClearSum,
  onClearTerm,
  sumValue,
  termValue,
}) => {
  const hasActiveFilters = !!sumValue || !!termValue

  const hasSum = sumValue != null && Number(sumValue) > 0
  const hasTerm = termValue != null && Number(termValue) > 0
  const showCondition = hasSum && hasTerm

  if (!hasActiveFilters) {
    return null
  }

  return (
    <Flex align="center" className="panel-selection-active-filters" gap={8}>
      {hasSum && (
        <span className="panel-selection-active-filters__tag-wrap">
          <span>Сумма ≥</span>
          {Number(sumValue).toLocaleString("ru-RU")} ₽
          <button aria-label="Удалить фильтр суммы" className="panel-selection-active-filters__btn-remove" onClick={onClearSum}>
            <Icon className={cn(closeIcon, "panel-selection-active-filters__icon-remove")} />
          </button>
        </span>
      )}
      {showCondition && (
        <span className="panel-selection-active-filters__condition">{filterMode === FilterMode.ANY ? "или" : "и"}</span>
      )}
      {/* Срок долга */}
      {hasTerm && (
        <span className="panel-selection-active-filters__tag-wrap">
          <span>Срок ≥</span>
          {termValue} мес.
          <button aria-label="Удалить фильтр срока" className="panel-selection-active-filters__btn-remove" onClick={onClearTerm}>
            <Icon className={cn(closeIcon, "panel-selection-active-filters__icon-remove")} />
          </button>
        </span>
      )}
    </Flex>
  )
}
