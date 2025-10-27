// // features/SelectionFilter/SelectionFilter.tsx
// import React, { useEffect, useState } from "react"

// import { Typography } from "itpc-ui-kit"

// import { getUser } from "@/entities/User"
// import { useAppDispatch } from "@/shared/lib/store"
// import { Flex } from "@/shared/ui/layout/Flex"

// import { DebtFilter } from "../DebtFilter/DebtFilter"
// import { SearchModeToggle } from "../SearchModeToggle/SearchModeToggle"

// import "./"scss"

// type SearchMode = "any" | "all"

// export const SelectionFilter: React.FC = () => {
//   const dispatch = useAppDispatch()
//   const [searchMode, setSearchMode] = useState<SearchMode>("any")
//   const [sumValue, setSumValue] = useState<string>("")
//   const [termValue, setTermValue] = useState<string>("")

//   // Диапазоны
//   const SUM_MIN = 0
//   const SUM_MAX = 10_000
//   const TERM_MIN = 0
//   const TERM_MAX = 36

//   useEffect(() => {
//     dispatch(getUser("1"))
//   }, [])

//   return (
//     <Flex vertical>
//       <Typography.Text>Задолженность более</Typography.Text>
//       <Flex gap={16}>
//         <DebtFilter
//           id="sum"
//           label="Сумма / руб."
//           max={SUM_MAX}
//           min={SUM_MIN}
//           onChange={setSumValue}
//           // placeholder="сумма / руб."
//           step={100}
//           value={sumValue}
//         />

//         <DebtFilter
//           id="term"
//           label="Срок / мес."
//           max={TERM_MAX}
//           min={TERM_MIN}
//           onChange={setTermValue}
//           // placeholder="срок / мес."
//           step={1}
//           value={termValue}
//         />

//         {/* Переключатель режима */}
//         <SearchModeToggle onChange={setSearchMode} value={searchMode} />
//       </Flex>
//     </Flex>
//   )
// }

import React, { useEffect, useState } from "react"

import { Checkbox, TextField, Typography } from "itpc-ui-kit"

import { getUser } from "@/entities/User"
import { useAppDispatch } from "@/shared/lib/store"
import { Slider } from "@/shared/ui/Slider"

import { ActiveFilters } from "../ActiveFilters/ActiveFilters"
import { HouseMultiSelect } from "../HouseMultiSelect/HouseMultiSelect"

import "./styles.scss"

type SearchMode = "any" | "all"

// Мок данных для домов (замените на реальные данные из store)
const MOCK_HOUSES = [
  { id: "1", name: "Дом 1" },
  { id: "2", name: "Дом 2" },
  { id: "3", name: "Дом 3" },
  { id: "4", name: "Дом 4" },
  { id: "5", name: "Дом 5" },
]

export const SelectionFilter2: React.FC = () => {
  const dispatch = useAppDispatch()
  const [searchMode, setSearchMode] = useState<SearchMode>("any")
  const [sumValue, setSumValue] = useState<string>("")
  const [termValue, setTermValue] = useState<string>("")
  const [selectedHouses, setSelectedHouses] = useState<string[]>([])

  // Диапазоны
  const SUM_MIN = 0
  const SUM_MAX = 10_000
  const TERM_MIN = 0
  const TERM_MAX = 36

  const handleSumTextChange = (value: string) => {
    const clean = value.replace(/[^0-9]/g, "")
    setSumValue(clean)
  }

  const handleTermTextChange = (value: string) => {
    const clean = value.replace(/[^0-9]/g, "")
    setTermValue(clean)
  }

  const handleSumSliderChange = (value: number) => {
    setSumValue(String(value))
  }

  const handleTermSliderChange = (value: number) => {
    setTermValue(String(value))
  }

  const sumNum = sumValue === "" ? SUM_MIN : Number(sumValue)
  const termNum = termValue === "" ? TERM_MIN : Number(termValue)
  const clampedSum = isNaN(sumNum) ? SUM_MIN : Math.min(Math.max(sumNum, SUM_MIN), SUM_MAX)
  const clampedTerm = isNaN(termNum) ? TERM_MIN : Math.min(Math.max(termNum, TERM_MIN), TERM_MAX)

  // Получаем объекты выбранных домов
  const selectedHouseObjects = MOCK_HOUSES.filter((house) => selectedHouses.includes(house.id))

  // Обработчики удаления
  const handleRemoveHouse = (houseId: string) => {
    setSelectedHouses((prev) => prev.filter((id) => id !== houseId))
  }

  const handleClearSum = () => setSumValue("")
  const handleClearTerm = () => setTermValue("")
  const handleClearAll = () => {
    setSelectedHouses([])
    setSumValue("")
    setTermValue("")
  }

  const handleApply = () => {
    // Здесь можно вызвать вашу логику поиска
    console.log("Применить фильтры:", {
      houses: selectedHouses,
      mode: searchMode,
      sum: sumValue,
      term: termValue,
    })
    // dispatch(applyFilters({ ... }))
  }

  useEffect(() => {
    dispatch(getUser("1"))
  }, [])

  return (
    <div className={"filterCard"}>
      <HouseMultiSelect onChange={setSelectedHouses} options={MOCK_HOUSES} placeholder="Список домов" value={selectedHouses} />

      <div className={"filters"}>
        {/* Сумма долга */}
        <div className={"filterGroup"}>
          <Typography.Text className={"label"}>Сумма / руб.</Typography.Text>
          <TextField
            className={"textField"}
            id="sum"
            name="sum"
            onChange={handleSumTextChange}
            // placeholder="сумма / руб."
            value={sumValue}
          />
          <Slider className={"slider"} max={SUM_MAX} min={SUM_MIN} onChange={handleSumSliderChange} step={100} value={clampedSum} />
          <Typography.Text className={"value"}>{sumValue ? Number(sumValue).toLocaleString("ru-RU") : "0"} ₽</Typography.Text>
        </div>

        <div className={"modeToggle"}>
          <Checkbox
            className={"checkbox"}
            id="search-any"
            isChecked={searchMode === "any"}
            label="или"
            labelPosition="right"
            name="search-mode"
            onClick={() => setSearchMode("any")}
            variant="round"
          />
          <Checkbox
            className={"checkbox"}
            id="search-all"
            isChecked={searchMode === "all"}
            label="и"
            labelPosition="right"
            name="search-mode"
            onClick={() => setSearchMode("all")}
            variant="round"
          />
        </div>

        {/* Срок долга */}
        <div className={"filterGroup"}>
          <Typography.Text className={"label"}>Срок / мес.</Typography.Text>
          <TextField
            className={"textField"}
            id="term"
            name="term"
            onChange={handleTermTextChange}
            // placeholder="срок / мес."
            value={termValue}
          />
          <Slider className={"slider"} max={TERM_MAX} min={TERM_MIN} onChange={handleTermSliderChange} step={1} value={clampedTerm} />
          <Typography.Text className={"value"}>{termValue || "0"} мес.</Typography.Text>
        </div>
      </div>

      {/* <button className={"searchButton"}>Поиск</button> */}
      {/* Панель активных фильтров */}
      <ActiveFilters
        onApply={handleApply}
        onClearAll={handleClearAll}
        onClearSum={handleClearSum}
        onClearTerm={handleClearTerm}
        onRemoveHouse={handleRemoveHouse}
        selectedHouses={selectedHouseObjects}
        sumValue={sumValue}
        termValue={termValue}
      />
    </div>
  )
}
