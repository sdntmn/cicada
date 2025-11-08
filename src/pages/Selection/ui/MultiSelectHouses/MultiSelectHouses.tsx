import React, { useEffect, useMemo, useState } from "react"

import cn from "classnames"
import { Button, Checkbox } from "itpc-ui-kit"

import { accountsActions, SearchParams } from "@/entities/Account"
import { searchAccounts } from "@/entities/Account/model/thunk/thunk"
import { getHouses } from "@/entities/House"
import { houseSelectionActions } from "@/features/HouseMultiSelect/model/slice/housesSlice"
import { searchIcon } from "@/shared/constants"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { Icon } from "@/shared/ui/Icon"
import { Flex } from "@/shared/ui/layout/Flex"
import { MultiSelectField } from "@/shared/ui/MultiSelectField/ui/MultiSelect"

import { getSelectItems, mapSelectedHouses } from "../../lib/helpers"
import { useDebtFilters } from "../../lib/hooks"
import { DebtFilterPanel } from "../DebtFilterPanel/DebtFilterPanel"
import { TagPanelSelectedHouses } from "../TagPanelSelectedHouses/TagPanelSelectedHouses"

import "./styles.scss"

export const MultiSelectHouses: React.FC = () => {
  const dispatch = useAppDispatch()

  const [searchQuery, setSearchQuery] = useState("")
  const [isAllHousesSelected, setIsAllHousesSelected] = useState(false)

  const { houses, isLoading } = useAppSelector((state) => state.house)
  const { selectedHouseIds } = useAppSelector((state) => state.houseSelection)

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

  const selectItems = useMemo(() => getSelectItems(houses), [houses])

  const filteredSelectItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return selectItems
    }
    const query = searchQuery.toLowerCase()
    return selectItems.filter((item) => item.value.toLowerCase().includes(query))
  }, [selectItems, searchQuery])

  const selectedHouses = useMemo(() => mapSelectedHouses(houses || [], selectedHouseIds), [houses, selectedHouseIds])

  const handleSetSelectedHouse = (newSelectedIds: string[]) => {
    dispatch(houseSelectionActions.setSelectedHouseIds(newSelectedIds))
    if (isAllHousesSelected) {
      setIsAllHousesSelected(false)
    }
  }

  const handleRemoveHouse = (houseId: string) => {
    dispatch(houseSelectionActions.removeHouse(houseId))
  }

  const handleClearAllFilters = () => {
    dispatch(houseSelectionActions.clearHousesResults())
  }

  const handleClearAllHousesIds = () => {
    dispatch(houseSelectionActions.clearHousesResults())
  }

  const onCheckedAllHouses = () => {
    if (isAllHousesSelected) {
      setIsAllHousesSelected(false)
    } else {
      handleClearAllHousesIds()
      setIsAllHousesSelected(true)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const search = () => {
    const params: SearchParams = {}

    if (selectedHouseIds.length > 0) {
      params.houseIds = selectedHouseIds
    }

    const debt = Number(sumValue)
    if (sumValue && !isNaN(debt) && debt > 0) {
      params.minDebt = debt
    }

    const term = Number(termValue)
    if (termValue && !isNaN(term) && term > 0) {
      params.minTerm = term
    }

    if (params.minDebt !== undefined && params.minTerm !== undefined) {
      params.filterMode = filterMode
    }
    dispatch(accountsActions.updateSearchParams(params))
    dispatch(searchAccounts({ ...params, page: 0, pageSize: 20 }))
  }

  const isDisabled = isLoading || !houses.length || (!isAllHousesSelected && !Boolean(selectedHouseIds.length))

  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  return (
    <Flex className="multi-select-houses" gap={8}>
      <Flex className="multi-select-houses__input-wrap" vertical>
        <MultiSelectField
          className="multi-select-houses__input"
          disabled={isLoading}
          isLoading={isLoading}
          items={filteredSelectItems}
          onChange={handleSetSelectedHouse}
          onSearch={handleSearch}
          searchQuery={searchQuery}
          selectedItems={selectedHouseIds}
        />
        <Flex align="center" gap={4}>
          <Checkbox
            className={cn("multi-select-houses__checkbox", isAllHousesSelected && "multi-select-houses__checkbox_active")}
            disabled={isLoading || !Boolean(houses.length)}
            id={"checked_all"}
            isChecked={isAllHousesSelected}
            label="По всем"
            name={"checked_all"}
            onClick={onCheckedAllHouses}
            type="checkbox"
            variant="square"
          />
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
        </Flex>
      </Flex>

      <Button className="multi-select-houses__btn-apply" disabled={isDisabled} onPress={search}>
        <Icon className={cn(searchIcon, "multi-select-houses__btn-filters-icon")} />
      </Button>

      <TagPanelSelectedHouses onClearAll={handleClearAllFilters} onRemoveHouse={handleRemoveHouse} selectedHouses={selectedHouses} />
    </Flex>
  )
}
