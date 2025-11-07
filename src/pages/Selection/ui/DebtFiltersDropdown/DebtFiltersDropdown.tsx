import React from "react"

import { FilterMode } from "@/shared/api/AccountsApi"
import { HORIZONTAL_POSITION } from "@/shared/constants"
import { Flex } from "@/shared/ui/layout/Flex"
import { PositionPortal } from "@/shared/ui/PositionPortal"

import { DebtFilters } from "../DebtFilters/DebtFilters"
import { FilterLogicSwitch } from "../FilterLogicSwitch/FilterLogicSwitch"

import "./styles.scss"

interface Props {
  anchorRef: React.RefObject<HTMLButtonElement>
  filterMode: FilterMode
  isOpen?: boolean
  onChangeMode: (mode: FilterMode) => void
  onChangeSum: (value: string) => void
  onChangeSumSlider: (value: number) => void
  onChangeTerm: (value: string) => void
  onChangeTermSlider: (value: number) => void
  onClose: () => void
  sumValue: string
  termValue: string
}

export const DebtFiltersDropdown: React.FC<Props> = ({
  anchorRef,
  filterMode,
  isOpen,
  onChangeMode,
  onChangeSum,
  onChangeSumSlider,
  onChangeTerm,
  onChangeTermSlider,
  onClose,
  sumValue,
  termValue,
}) => (
  <PositionPortal
    anchorRef={anchorRef}
    className="debt-filter-panel__content"
    distanceBetweenElements={0}
    horizontalAlignment={HORIZONTAL_POSITION.LEFT}
    isOpen={isOpen}
    onClose={onClose}
  >
    <Flex gap={32} vertical>
      <DebtFilters
        onChangeSum={onChangeSum}
        onChangeSumSlider={onChangeSumSlider}
        onChangeTerm={onChangeTerm}
        onChangeTermSlider={onChangeTermSlider}
        sumValue={sumValue}
        termValue={termValue}
      />

      <FilterLogicSwitch onChange={onChangeMode} value={filterMode} />
    </Flex>
  </PositionPortal>
)
