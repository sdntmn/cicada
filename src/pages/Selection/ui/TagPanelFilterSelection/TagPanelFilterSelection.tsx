import React from "react"

import cn from "classnames"

import { FilterMode } from "@/shared/api/AccountsApi"
import { closeIcon } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon/ui/Icon"
import { Flex } from "@/shared/ui/layout/Flex"

import "./styles.scss"

interface Props {
  filterMode?: FilterMode
  onClearSum?: () => void
  onClearTerm?: () => void
  sumValue?: string
  termValue?: string
}

export const TagPanelFilterSelection: React.FC<Props> = ({ filterMode, onClearSum, onClearTerm, sumValue, termValue }) => {
  const hasActiveFilters = !!sumValue || !!termValue

  const hasSum = sumValue != null && Number(sumValue) > 0
  const hasTerm = termValue != null && Number(termValue) > 0
  const showCondition = hasSum && hasTerm

  if (!hasActiveFilters) {
    return null
  }

  return (
    <Flex align="center" className="tag-panel-filter-selection" gap={8}>
      {hasSum && (
        <span className="tag-panel-filter-selection__wrap">
          <span>Сумма ≥</span>
          {Number(sumValue).toLocaleString("ru-RU")} ₽
          <button aria-label="Удалить фильтр суммы" className="tag-panel-filter-selection__btn-remove" onClick={onClearSum}>
            <Icon className={cn(closeIcon, "tag-panel-filter-selection__icon-remove")} />
          </button>
        </span>
      )}
      {showCondition && <span className="tag-panel-filter-selection__condition">{filterMode === FilterMode.ANY ? "или" : "и"}</span>}
      {/* Срок долга */}
      {hasTerm && (
        <span className="tag-panel-filter-selection__tag-wrap">
          <span>Срок ≥</span>
          {termValue} мес.
          <button aria-label="Удалить фильтр срока" className="tag-panel-filter-selection__btn-remove" onClick={onClearTerm}>
            <Icon className={cn(closeIcon, "tag-panel-filter-selection__icon-remove")} />
          </button>
        </span>
      )}
    </Flex>
  )
}
