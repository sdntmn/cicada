import React, { useState } from "react"

import { Typography } from "itpc-ui-kit"

import { HORIZONTAL_POSITION } from "@/shared/constants"
import { PositionPortal } from "@/shared/ui/PositionPortal"

import { ColumnTableSelect } from "../../lib/types/table"
import { ColumnSelector } from "../ColumnSelector/ColumnSelector"

import "./styles.scss"

interface ColumnVisibilityMenuProps {
  allColumns: ColumnTableSelect[]
  onChange: (selected: Set<ColumnTableSelect>) => void
  selected: Set<ColumnTableSelect>
}

export const MenuVisibilityColumns: React.FC<ColumnVisibilityMenuProps> = ({ allColumns, onChange, selected }) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => {
    setIsOpen(false)
  }

  const toggleMenu = () => setIsOpen(!isOpen)
  const buttonId = "column-visibility-btn"

  return (
    <div className="menu-column">
      <button className="menu-column__btn" id={buttonId} type="button">
        <i aria-label="Выбрать колонки таблицы" className="fa-solid fa-table-columns menu-column__icon" onClick={toggleMenu} />
      </button>

      {isOpen && (
        <PositionPortal
          className="menu-column__content"
          componentId={buttonId}
          distanceBetweenElements={4}
          horizontalAlignment={HORIZONTAL_POSITION.RIGHT}
          isOpen={isOpen}
          onClose={closeMenu}
        >
          <Typography.Title level={5}>Выбор колонок:</Typography.Title>
          <ColumnSelector allColumns={allColumns} onChange={onChange} selected={selected} />
        </PositionPortal>
      )}
    </div>
  )
}
