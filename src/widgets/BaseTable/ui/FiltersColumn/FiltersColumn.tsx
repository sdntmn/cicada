import React, { useEffect, useState } from "react"

import { TextField } from "itpc-ui-kit"

import { HORIZONTAL_POSITION } from "@/shared/constants"
import { RowType } from "@/shared/lib/types/table"
import { Flex } from "@/shared/ui/layout/Flex"
import { PositionPortal } from "@/shared/ui/PositionPortal"

import "./styles.scss"

interface Props<T extends RowType> {
  anchorRef: React.RefObject<HTMLElement>
  columnName: keyof T
  currentValue?: string
  isOpen: boolean
  onClose: () => void
  onFilterChange: (column: keyof T, value?: string) => void
}

export const FiltersColumn = <T extends RowType>({
  anchorRef,
  columnName,
  currentValue = "",
  isOpen,
  onClose,
  onFilterChange,
}: Props<T>) => {
  const [inputValue, setInputValue] = useState(currentValue)

  const handleChange = (value: string) => {
    setInputValue(value)
    onFilterChange(columnName, value || undefined)
  }

  useEffect(() => {
    setInputValue(currentValue)
  }, [currentValue])

  const columnNameStr = String(columnName)

  return (
    <PositionPortal
      anchorRef={anchorRef}
      className="filters-column"
      distanceBetweenElements={4}
      horizontalAlignment={HORIZONTAL_POSITION.CENTER}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Flex vertical>
        <TextField
          id={`id-filter-${String(columnNameStr)}`}
          name={`name-filter-${String(columnNameStr)}`}
          onChange={handleChange}
          value={inputValue}
        />
      </Flex>
    </PositionPortal>
  )
}
