import React from "react"

import { SearchMode } from "@/features/HouseMultiSelect/lib/types/types"
import { Flex } from "@/shared/ui/layout/Flex"

import { DebtFilters } from "../DebtFilters/DebtFilters"
import { SearchModeSelector } from "../SearchModeSelector/SearchModeSelector"

import "./styles.scss"

interface Props {
  onChangeMode: (mode: SearchMode) => void
  onChangeSum: (value: string) => void
  onChangeSumSlider: (value: number) => void
  onChangeTerm: (value: string) => void
  onChangeTermSlider: (value: number) => void
  searchMode: SearchMode
  sumValue: string
  termValue: string
}

export const DebtFiltersDropdown: React.FC<Props> = ({
  onChangeMode,
  onChangeSum,
  onChangeSumSlider,
  onChangeTerm,
  onChangeTermSlider,
  searchMode,
  sumValue,
  termValue,
}) => (
  <Flex gap={32} vertical>
    <DebtFilters
      onChangeSum={onChangeSum}
      onChangeSumSlider={onChangeSumSlider}
      onChangeTerm={onChangeTerm}
      onChangeTermSlider={onChangeTermSlider}
      sumValue={sumValue}
      termValue={termValue}
    />

    <SearchModeSelector onChange={onChangeMode} value={searchMode} />
  </Flex>
)
