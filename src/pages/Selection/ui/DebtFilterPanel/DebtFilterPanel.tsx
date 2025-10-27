import React, { useState } from "react"

import cn from "classnames"

import { SearchMode } from "@/features/HouseMultiSelect/lib/types/types"
import { DebtFiltersDropdown } from "@/pages/Selection/ui/DebtFiltersDropdown/DebtFiltersDropdown"
import { PanelSelectionActiveFilters } from "@/pages/Selection/ui/PanelSelectionActiveFilters/PanelSelectionActiveFilters"
import { HORIZONTAL_POSITION } from "@/shared/constants"
import { PositionPortal } from "@/shared/ui/PositionPortal"

import "./styles.scss"

interface DebtFilterPanelProps {
  onChangeMode: (mode: SearchMode) => void
  onChangeSum: (value: string) => void
  onChangeSumSlider: (value: number) => void
  onChangeTerm: (value: string) => void
  onChangeTermSlider: (value: number) => void
  onClearSum: () => void
  onClearTerm: () => void
  searchMode: SearchMode
  sumValue: string
  termValue: string
}

const FILTER_BUTTON_ID = "debt-filter-btn"

export const DebtFilterPanel: React.FC<DebtFilterPanelProps> = ({
  onChangeMode,
  onChangeSum,
  onChangeSumSlider,
  onChangeTerm,
  onChangeTermSlider,
  onClearSum,
  onClearTerm,
  searchMode,
  sumValue,
  termValue,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen((prev) => !prev)
  const close = () => setIsOpen(false)

  return (
    <div className="debt-filter-panel">
      <button
        className={cn("debt-filter-panel__btn-filters", isOpen && "debt-filter-panel__btn-filters_active")}
        id={FILTER_BUTTON_ID}
        onClick={toggle}
      >
        Фильтр
      </button>

      <PanelSelectionActiveFilters
        onClearSum={onClearSum}
        onClearTerm={onClearTerm}
        searchMode={searchMode}
        sumValue={sumValue}
        termValue={termValue}
      />

      <PositionPortal
        className="debt-filter-panel__content"
        componentId={FILTER_BUTTON_ID}
        distanceBetweenElements={0}
        horizontalAlignment={HORIZONTAL_POSITION.LEFT}
        isOpen={isOpen}
        onClose={close}
      >
        <DebtFiltersDropdown
          onChangeMode={onChangeMode}
          onChangeSum={onChangeSum}
          onChangeSumSlider={onChangeSumSlider}
          onChangeTerm={onChangeTerm}
          onChangeTermSlider={onChangeTermSlider}
          searchMode={searchMode}
          sumValue={sumValue}
          termValue={termValue}
        />
      </PositionPortal>
    </div>
  )
}
