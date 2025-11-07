import React, { useState } from "react"

import cn from "classnames"

import { DebtFiltersDropdown } from "@/pages/Selection/ui/DebtFiltersDropdown/DebtFiltersDropdown"
import { PanelSelectionActiveFilters } from "@/pages/Selection/ui/PanelSelectionActiveFilters/PanelSelectionActiveFilters"
import { FilterMode } from "@/shared/api/AccountsApi"

import "./styles.scss"

interface Props {
  filterMode: FilterMode
  onChangeMode: (mode: FilterMode) => void
  onChangeSum: (value: string) => void
  onChangeSumSlider: (value: number) => void
  onChangeTerm: (value: string) => void
  onChangeTermSlider: (value: number) => void
  onClearSum: () => void
  onClearTerm: () => void
  sumValue: string
  termValue: string
}

export const DebtFilterPanel: React.FC<Props> = ({
  filterMode,
  onChangeMode,
  onChangeSum,
  onChangeSumSlider,
  onChangeTerm,
  onChangeTermSlider,
  onClearSum,
  onClearTerm,
  sumValue,
  termValue,
}) => {
  const ref = React.useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen((prev) => !prev)
  const close = () => setIsOpen(false)

  const isActive = Boolean(sumValue) || Boolean(termValue) || isOpen

  return (
    <div className="debt-filter-panel">
      <button
        className={cn("debt-filter-panel__btn-filters", isActive && "debt-filter-panel__btn-filters_active")}
        onClick={toggle}
        ref={ref}
      >
        Фильтр
      </button>

      <PanelSelectionActiveFilters
        filterMode={filterMode}
        onClearSum={onClearSum}
        onClearTerm={onClearTerm}
        sumValue={sumValue}
        termValue={termValue}
      />

      <DebtFiltersDropdown
        anchorRef={ref}
        filterMode={filterMode}
        isOpen={isOpen}
        onChangeMode={onChangeMode}
        onChangeSum={onChangeSum}
        onChangeSumSlider={onChangeSumSlider}
        onChangeTerm={onChangeTerm}
        onChangeTermSlider={onChangeTermSlider}
        onClose={close}
        sumValue={sumValue}
        termValue={termValue}
      />
    </div>
  )
}
