import React from "react"

import { Item } from "itpc-ui-kit"

import { MultiSelectField } from "@/shared/ui/MultiSelectField/ui/MultiSelect"

import "./styles.scss"

export const SearchByListHouses: React.FC = () => {
  const mockStreetItemsWithoutApartment: Item[] = [
    { id: "1", value: "проезд Тест, д.10" },
    { id: "2", value: "ул. Республики, д.45" },
    { id: "3", value: "ул. Ленина, д.22" },
    { id: "4", value: "ул. 50 лет Октября, д.17" },
    { id: "5", value: "пр. Мира, д.8" },
    { id: "6", value: "ул. Широтная, д.63" },
    { id: "7", value: "ул. Свободы, д.31" },
    { id: "8", value: "ул. Профсоюзная, д.12" },
    { id: "9", value: "ул. Гагарина, д.5" },
    { id: "10", value: "ул. Пермякова, д.28" },
    { id: "11", value: "ул. Комсомольская, д.44" },
    { id: "12", value: "ул. Мельникайте, д.71" },
    { id: "13", value: "ул. Спортивная, д.15" },
    { id: "14", value: "ул. Альпинистов, д.9" },
    { id: "15", value: "ул. Набережная, д.37" },
  ]

  return (
    <MultiSelectField
      onChange={() => {
        console.info(" мультисилект")
      }}
      className="search-by-list-houses"
      items={mockStreetItemsWithoutApartment}
    />
  )
}
