import React, { useState } from "react"

import cn from "classnames"

import { HORIZONTAL_POSITION, RowDensity, verticaDots } from "@/shared/constants"
import { LineHeightIcon } from "@/shared/ui/LineHeightIcon"
import { PositionPortal } from "@/shared/ui/PositionPortal"

import { DENSITY_DISPLAY_ORDER } from "../../lib/constants/settings"

import "./styles.scss"

interface Props {
  currentDensity: RowDensity
  onChangeDensity: (density: RowDensity) => void
}

export const TableSettingsMenu: React.FC<Props> = ({ currentDensity, onChangeDensity }) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)
  const toggleMenu = () => setIsOpen((prev) => !prev)

  const handleSelectDensity = (density: RowDensity) => {
    onChangeDensity(density)
  }

  const buttonId = "table-settings-btn"

  return (
    <>
      <button aria-label="Настройки таблицы" className="table-settings-menu__btn" id={buttonId} onClick={toggleMenu} type="button">
        <i className={cn(verticaDots, " table-settings-menu__icon")} />
      </button>

      <PositionPortal
        className="table-settings-menu__dropdown"
        componentId={buttonId}
        distanceBetweenElements={4}
        horizontalAlignment={HORIZONTAL_POSITION.RIGHT}
        isOpen={isOpen}
        onClose={closeMenu}
      >
        <p className="table-settings-menu__title">Высота строк:</p>

        <div className="table-settings-menu__options">
          {DENSITY_DISPLAY_ORDER.map((density) => (
            <button
              className={cn("table-settings-menu__option", density === currentDensity && "table-settings-menu__option_active")}
              key={density}
              onClick={() => handleSelectDensity(density)}
              type="button"
            >
              <LineHeightIcon density={density} />
            </button>
          ))}
        </div>
      </PositionPortal>
    </>
  )
}
