import React, { useRef, useState } from "react"

import { Typography } from "itpc-ui-kit"

import { useOnClickOutside } from "@/shared/lib/hooks"
import { Flex } from "@/shared/ui/layout/Flex"

import { TableColumnTableSelect } from "../../lib/types/table"
import { ColumnSelector } from "../ColumnSelector/ColumnSelector"

import "./styles.scss"

interface ColumnVisibilityMenuProps {
  allColumns: TableColumnTableSelect[]
  onChange: (selected: Set<TableColumnTableSelect>) => void
  selected: Set<TableColumnTableSelect>
}

export const MenuVisibilityColumns: React.FC<ColumnVisibilityMenuProps> = ({ allColumns, onChange, selected }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const closeMenu = () => {
    setIsOpen(false)
  }

  const toggleMenu = () => setIsOpen(!isOpen)

  useOnClickOutside(menuRef, closeMenu, isOpen, dropdownRef)

  return (
    <Flex className="menu-column" ref={menuRef}>
      <button onClick={toggleMenu}>Колонки</button>

      {isOpen && (
        <Flex className="menu-column__content" ref={dropdownRef} vertical>
          <Typography.Title level={5}>Выбор колонок:</Typography.Title>
          <ColumnSelector allColumns={allColumns} onChange={onChange} selected={selected} />
        </Flex>
      )}
    </Flex>
  )
}
