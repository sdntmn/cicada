import React, { useRef, useState } from "react"

import { Typography } from "itpc-ui-kit"

import { HORIZONTAL_POSITION } from "@/shared/constants"
import { PositionPortal } from "@/shared/ui/PositionPortal"
import { ColumnSelector } from "@/shared/ui/Table/ui/ColumnSelector/ColumnSelector"

import "./styles.scss"

interface Props<T> {
  allColumns: T[]
  getColumnLabel: (col: T) => string
  onChange: (selected: Set<T>) => void
  selected: Set<T>
}

export const MenuVisibilityColumns = <T,>({ allColumns, getColumnLabel, onChange, selected }: Props<T>) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => {
    setIsOpen(false)
  }

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="menu-column">
      <button className="menu-column__btn" ref={buttonRef} type="button">
        <i aria-label="Выбрать колонки таблицы" className="fa-solid fa-table-columns menu-column__icon" onClick={toggleMenu} />
      </button>

      {isOpen && (
        <PositionPortal
          anchorRef={buttonRef}
          className="menu-column__content"
          distanceBetweenElements={4}
          horizontalAlignment={HORIZONTAL_POSITION.RIGHT}
          isOpen={isOpen}
          onClose={closeMenu}
        >
          <Typography.Title level={5}>Выбор колонок:</Typography.Title>
          <ColumnSelector<T> allColumns={allColumns} getColumnLabel={getColumnLabel} onChange={onChange} selected={selected} />
        </PositionPortal>
      )}
    </div>
  )
}
