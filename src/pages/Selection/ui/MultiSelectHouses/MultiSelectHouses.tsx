import React, { useEffect, useMemo, useState } from "react"

import cn from "classnames"
import { Button, Checkbox } from "itpc-ui-kit"

import { debtorsActions, searchDebtorCandidates, SearchParams } from "@/entities/Debtor"
import { getPremises } from "@/entities/Premises"
import { houseSelectionActions } from "@/features/HouseMultiSelect/model/slice/housesSlice"
import { searchIcon } from "@/shared/constants"
import { getSelectItems, mapSelectedHouses } from "@/shared/lib/helpers"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { Icon } from "@/shared/ui/Icon"
import { Flex } from "@/shared/ui/layout/Flex"
import { MultiSelectField } from "@/shared/ui/MultiSelectField/ui/MultiSelect"

import { useDebtFilters } from "../../lib/hooks"
import { DebtFilterPanel } from "../DebtFilterPanel/DebtFilterPanel"
import { TagPanelSelectedHouses } from "../TagPanelSelectedHouses/TagPanelSelectedHouses"

import "./styles.scss"
// - по сумме долга
// - по дате
// - по поставщику услуг
// - по адресу
// - есть оплаты недавние
// - признак исключкения - это из Гелиоса есть такой признак, я тут не знаю про что он
export const MultiSelectHouses: React.FC = () => {
  const dispatch = useAppDispatch()

  const [searchQuery, setSearchQuery] = useState("")
  const [isAllHousesSelected, setIsAllHousesSelected] = useState(false)

  const { isLoading, premises } = useAppSelector((state) => state.premises)
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
    dispatch(debtorsActions.updateSearchParams(params))
    dispatch(searchDebtorCandidates({ ...params, page: 0, pageSize: 20 }))
  }

  const isDisabled = isLoading || !premises.length || (!isAllHousesSelected && !Boolean(selectedHouseIds.length))

  useEffect(() => {
    dispatch(getPremises())
    return () => {
      dispatch(houseSelectionActions.clearHousesResults())
    }
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
            disabled={isLoading || !Boolean(premises.length)}
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
