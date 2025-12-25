import React, { useRef, useState } from "react"

import cn from "classnames"

import { HORIZONTAL_POSITION } from "@/shared/constants"
import { Dropdown } from "@/shared/ui/Dropdown"
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

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className="menu-column">
      <button
        aria-label="Выбрать колонки таблицы"
        className={cn("menu-column__btn", isOpen && "menu-column__btn_active")}
        onClick={toggleMenu}
        ref={buttonRef}
        type="button"
      >
        <i className="fa-solid fa-table-columns menu-column__icon" />
      </button>

      <Dropdown
        anchorRef={buttonRef}
        className="menu-column__content"
        distanceBetweenElements={4}
        header="Выбор колонок:"
        horizontalAlignment={HORIZONTAL_POSITION.RIGHT}
        isOpen={isOpen}
        onClose={closeMenu}
      >
        <ColumnSelector<T> allColumns={allColumns} getColumnLabel={getColumnLabel} onChange={onChange} selected={selected} />
      </Dropdown>
    </div>
  )
}
