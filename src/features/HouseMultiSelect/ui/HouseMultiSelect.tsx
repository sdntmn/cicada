// src/features/HouseMultiSelect/ui/HouseMultiSelect.tsx

import React, { useEffect, useMemo, useState } from "react"

import cn from "classnames"
import { Button } from "itpc-ui-kit"

import { getHouses } from "@/entities/House"
import { useDebtFilters } from "@/pages/lib/hooks/useDebtFilters/useDebtFilters"
import { DebtFilterPanel } from "@/pages/Selection/ui/DebtFilterPanel/DebtFilterPanel"
import { HouseOption, TagPanelSelectedHouses } from "@/pages/Selection/ui/TagPanelSelectedHouses/TagPanelSelectedHouses"
import { searchIcon } from "@/shared/constants"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { Icon } from "@/shared/ui/Icon/Icon"
import { Flex } from "@/shared/ui/layout/Flex"
import { MultiSelectField } from "@/shared/ui/MultiSelectField/ui/MultiSelect"

import { houseSelectionActions } from "../model/slice/housesSlice"

import "./styles.scss"

export const HouseMultiSelect: React.FC = () => {
  const dispatch = useAppDispatch()

  const [searchQuery, setSearchQuery] = useState("")

  const { houses } = useAppSelector((state) => state.house)
  const { selectedHouseIds } = useAppSelector((state) => state.houseSelection)

  const {
    handleClearSum,
    handleClearTerm,
    handleSearchModeChange,
    handleSumChange,
    handleSumSliderChange,
    handleTermChange,
    handleTermSliderChange,
    searchMode,
    sumValue,
    termValue,
  } = useDebtFilters()

  // ——— Вычисление опций для мультиселекта ———
  const selectItems = useMemo(
    () =>
      houses?.map((house) => ({
        id: house.id,
        value: `${house.city}, ${house.street}, ${house.house}`,
      })) || [],
    [houses]
  )

  const filteredSelectItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return selectItems
    }
    const query = searchQuery.toLowerCase()
    return selectItems.filter((item) => item.value.toLowerCase().includes(query))
  }, [selectItems, searchQuery])

  // ——— Вычисление выбранных домов для тегов ———
  const selectedHouses = useMemo<HouseOption[]>(() => {
    const houseMap = new Map(houses?.map((h) => [h.id, h]) || [])
    return selectedHouseIds
      .map((id) => {
        const house = houseMap.get(id)
        return house ? { id, name: `${house.street}, ${house.house}` } : null
      })
      .filter(Boolean) as HouseOption[]
  }, [houses, selectedHouseIds])

  // ——— Обработчики ———
  const handleSetSelectedHouse = (newSelectedIds: string[]) => {
    dispatch(houseSelectionActions.setSelectedHouseIds(newSelectedIds))
  }

  const handleRemoveHouse = (houseId: string) => {
    dispatch(houseSelectionActions.removeHouse(houseId))
  }

  const handleClearAllFilters = () => {
    dispatch(houseSelectionActions.clearHousesResults())
  }

  // ——— Эффекты ———
  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  // ——— Рендер ———
  return (
    <Flex className="house-multi-select" gap={8}>
      {/* Основной блок ввода и фильтров */}
      <Flex className="house-multi-select__input-wrap" vertical>
        <MultiSelectField
          className="house-multi-select__input"
          items={filteredSelectItems}
          onChange={handleSetSelectedHouse}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          selectedItems={selectedHouseIds}
        />

        <DebtFilterPanel
          onChangeMode={handleSearchModeChange}
          onChangeSum={handleSumChange}
          onChangeSumSlider={handleSumSliderChange}
          onChangeTerm={handleTermChange}
          onChangeTermSlider={handleTermSliderChange}
          onClearSum={handleClearSum}
          onClearTerm={handleClearTerm}
          searchMode={searchMode}
          sumValue={sumValue}
          termValue={termValue}
        />
      </Flex>

      {/* Кнопка поиска */}
      <Button className="house-multi-select__btn-apply" onPress={() => console.log("Искать")}>
        <Icon className={cn(searchIcon, "house-multi-select__btn-filters-icon")} />
      </Button>

      {/* Теги выбранных домов */}
      <TagPanelSelectedHouses onClearAll={handleClearAllFilters} onRemoveHouse={handleRemoveHouse} selectedHouses={selectedHouses} />
    </Flex>
  )
}
