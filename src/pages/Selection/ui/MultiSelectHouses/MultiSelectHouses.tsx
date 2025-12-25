import React, { useEffect, useMemo, useState } from "react"

import { debtorsActions, searchDebtorCandidates, SearchParams } from "@/entities/Debtor"
import { getPremises } from "@/entities/Premises"
import { houseSelectionActions } from "@/features/HouseMultiSelect/model/slice/housesSlice"
import { getSelectItems, mapSelectedHouses } from "@/shared/lib/helpers"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { Flex } from "@/shared/ui/layout/Flex"
import { MultiSelectField } from "@/shared/ui/MultiSelectField/ui/MultiSelect"

import { getPreviewAddresses } from "../../lib/helpers/getPreviewAddresses/getPreviewAddresses"
import { parsePositiveNumber } from "../../lib/helpers/parsePositiveNumber/parsePositiveNumber"
import { useDebtFilters } from "../../lib/hooks"
import { useSearchHistory } from "../../lib/hooks/useSearchHistory/useSearchHistory"
import type { SearchHistoryItem } from "../../lib/types/types"
import { DebtFilterPanel } from "../DebtFilterPanel/DebtFilterPanel"
import { SearchButton } from "../SearchButton/SearchButton"
import { SearchHistoryButton } from "../SearchHistoryButton/SearchHistoryButton"
import { TagPanelSelectedHouses } from "../TagPanelSelectedHouses/TagPanelSelectedHouses"

import "./styles.scss"

export const MultiSelectHouses: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchQuery, setSearchQuery] = useState("")

  const { isLoading, premises } = useAppSelector((state) => state.premises)
  const { selectedHouseIds } = useAppSelector((state) => state.houseSelection)

  const { saveQuery } = useSearchHistory()

  const {
    filterMode,
    handleClearSum,
    handleClearTerm,
    handleSearchModeChange,
    handleSumChange,
    handleSumSliderChange,
    handleTermChange,
    handleTermSliderChange,
    sumValue,
    termValue,
  } = useDebtFilters()

  const selectItems = useMemo(() => getSelectItems(premises), [premises])

  const filteredSelectItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return selectItems
    }
    const query = searchQuery.toLowerCase()
    return selectItems.filter((item) => item.value.toLowerCase().includes(query))
  }, [selectItems, searchQuery])

  const selectedHouses = useMemo(() => mapSelectedHouses(premises || [], selectedHouseIds), [premises, selectedHouseIds])

  const handleSetSelectedHouse = (newSelectedIds: string[]) => {
    dispatch(houseSelectionActions.setSelectedHouseIds(newSelectedIds))
  }

  const handleRemoveHouse = (houseId: string) => {
    dispatch(houseSelectionActions.removeHouse(houseId))
  }

  const handleClearAllFilters = () => {
    dispatch(houseSelectionActions.clearHousesResults())
    handleClearSum()
    handleClearTerm()
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const buildSearchQuery = (): Omit<SearchHistoryItem, "timestamp"> | null => {
    const debt = parsePositiveNumber(sumValue)
    const term = parsePositiveNumber(termValue)

    const query: Omit<SearchHistoryItem, "timestamp"> = {
      filterMode: debt !== undefined || term !== undefined ? filterMode : undefined,
      houseIds: selectedHouseIds.length > 0 ? [...selectedHouseIds] : undefined,
      minDebt: debt,
      minTerm: term,
      previewAddresses: getPreviewAddresses(selectedHouses),
    }

    const hasFilters = Boolean(query.houseIds || debt || term)
    return hasFilters ? query : null
  }

  const search = () => {
    const queryToSave = buildSearchQuery()

    if (queryToSave) {
      const params: SearchParams = {
        filterMode: queryToSave.filterMode,
        houseIds: queryToSave.houseIds,
        minDebt: queryToSave.minDebt,
        minTerm: queryToSave.minTerm,
      }

      dispatch(debtorsActions.updateSearchParams(params))
      dispatch(searchDebtorCandidates({ ...params, page: 0, pageSize: 20 }))

      saveQuery(queryToSave)
    }
  }

  // Обработчик загрузки из истории
  useEffect(() => {
    const handleLoadHistory = (event: CustomEvent) => {
      const query = event.detail as SearchHistoryItem

      // Подставляем дома
      if (query.houseIds && query.houseIds.length > 0) {
        dispatch(houseSelectionActions.setSelectedHouseIds(query.houseIds))
      } else {
        dispatch(houseSelectionActions.clearHousesResults())
      }

      // Подставляем сумму
      if (query.minDebt) {
        handleSumChange(query.minDebt.toString())
      } else {
        handleClearSum()
      }

      // Подставляем срок
      if (query.minTerm) {
        handleTermChange(query.minTerm.toString())
      } else {
        handleClearTerm()
      }

      // Подставляем режим
      if (query.filterMode) {
        handleSearchModeChange(query.filterMode)
      }
    }

    window.addEventListener("load-search-history", handleLoadHistory as EventListener)
    return () => {
      window.removeEventListener("load-search-history", handleLoadHistory as EventListener)
    }
  }, [dispatch, handleSumChange, handleTermChange, handleSearchModeChange, handleClearSum, handleClearTerm])

  useEffect(() => {
    dispatch(getPremises())
    return () => {
      dispatch(houseSelectionActions.clearHousesResults())
    }
  }, [dispatch])

  const isDisabled = isLoading || !premises.length

  return (
    <>
      <SearchHistoryButton />
      <MultiSelectField
        className="multi-select-houses__input"
        disabled={isLoading}
        id="multi-select-houses"
        isLoading={isLoading}
        items={filteredSelectItems}
        name="multi-select-houses"
        onChange={handleSetSelectedHouse}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        selectedItems={selectedHouseIds}
      />

      <SearchButton disabled={isDisabled} onPress={search} />

      <DebtFilterPanel
        filterMode={filterMode}
        onChangeMode={handleSearchModeChange}
        onChangeSum={handleSumChange}
        onChangeSumSlider={handleSumSliderChange}
        onChangeTerm={handleTermChange}
        onChangeTermSlider={handleTermSliderChange}
        onClearSum={handleClearSum}
        onClearTerm={handleClearTerm}
        sumValue={sumValue}
        termValue={termValue}
      />

      <TagPanelSelectedHouses onClearAll={handleClearAllFilters} onRemoveHouse={handleRemoveHouse} selectedHouses={selectedHouses} />
    </>
  )
}
