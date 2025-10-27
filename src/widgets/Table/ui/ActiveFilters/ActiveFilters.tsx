import React from "react"

import { Account } from "@/entities/Account"
import { Flex } from "@/shared/ui/layout/Flex"
import { Column } from "@/shared/ui/TableSort/types"

import "./styles.scss"

interface ActiveFiltersProps {
  filters: Partial<Record<keyof Account, string>>
  onRemoveFilter: (column: keyof Account) => void
  onResetAll: () => void
  visibleColumns: Column<Account>[]
}

// Локализация названий колонок
const COLUMN_LABELS: Record<keyof Account, string> = {
  account: "Лицевой счёт",
  address: "Адрес",
  city: "Город",
  debt: "Долг",
  fio: "ФИО",
  id: "ID",
  judicialDistrict: "",
  penalty: "Пеня",
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filters, onRemoveFilter, onResetAll, visibleColumns }) => {
  const columnOrder = visibleColumns.map((col) => col.name)

  const activeFilters = Object.entries(filters)
    .filter(([, value]) => value.trim() !== "")
    .sort(([colA], [colB]) => {
      const indexA = columnOrder.indexOf(colA as keyof Account)
      const indexB = columnOrder.indexOf(colB as keyof Account)
      if (indexA === -1) {
        return 1
      }
      if (indexB === -1) {
        return -1
      }
      return indexA - indexB
    })

  if (activeFilters.length === 0) {
    return null
  }

  return (
    <Flex align="center" gap={16} wrap={"wrap"}>
      <Flex gap={8} wrap={"wrap"}>
        {activeFilters.map(([column, value]) => (
          <div className="active-filters__tag" key={column}>
            <span className="active-filters__label">{COLUMN_LABELS[column as keyof Account]}:</span>
            <span className="active-filters__value">{value}</span>
            <button
              aria-label={`Убрать фильтр по ${COLUMN_LABELS[column as keyof Account]}`}
              className="active-filters__remove"
              onClick={() => onRemoveFilter(column as keyof Account)}
              type="button"
            >
              <i className="fa-solid fa-xmark active-filters__icon-close" />
            </button>
          </div>
        ))}
      </Flex>
      <button className="active-filters__reset" onClick={onResetAll} type="button">
        Очистить всё
      </button>
    </Flex>
  )
}
