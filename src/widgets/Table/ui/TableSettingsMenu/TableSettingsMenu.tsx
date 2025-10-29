import React, { useState } from "react"

import cn from "classnames"
import { Checkbox } from "itpc-ui-kit"

import { FontSize, HORIZONTAL_POSITION, RowDensity, verticaDots } from "@/shared/constants"
import { Flex } from "@/shared/ui/layout/Flex"
import { PositionPortal } from "@/shared/ui/PositionPortal"

import { FontSizeMenu } from "../FontSizeMenu/FontSizeMenu"
import { RowDensityMenu } from "../RowDensityMenu/RowDensityMenu"

import "./styles.scss"

interface Props {
  currentDensity: RowDensity
  currentFontSize?: FontSize
  onChangeDensity: (density: RowDensity) => void
  onChangeFontSize?: (fontSize: FontSize) => void
  onToggleStriped?: () => void
  onToggleVerticalBorders?: () => void
  striped?: boolean
  verticalBorders?: boolean
}

export const TableSettingsMenu: React.FC<Props> = ({
  currentDensity,
  currentFontSize,
  onChangeDensity,
  onChangeFontSize,
  onToggleStriped,
  onToggleVerticalBorders,
  striped,
  verticalBorders,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)
  const toggleMenu = () => setIsOpen((prev) => !prev)

  const handleSelectDensity = (density: RowDensity) => {
    onChangeDensity(density)
  }

  const buttonId = "table-settings-btn"

  return (
    <>
      <div className="table-settings-menu__btn-wrap">
        <button
          aria-label="Настройки таблицы"
          className={cn("table-settings-menu__btn", isOpen && "table-settings-menu__btn_active")}
          id={buttonId}
          onClick={toggleMenu}
          type="button"
        >
          <i className={cn(verticaDots, " table-settings-menu__icon")} />
        </button>
      </div>

      <PositionPortal
        className="table-settings-menu__dropdown"
        componentId={buttonId}
        distanceBetweenElements={4}
        horizontalAlignment={HORIZONTAL_POSITION.RIGHT}
        isOpen={isOpen}
        onClose={closeMenu}
      >
        <Flex gap={16} vertical>
          <RowDensityMenu currentDensity={currentDensity} onChangeDensity={handleSelectDensity} />
          <FontSizeMenu currentFontSize={currentFontSize} onChangeFontSize={onChangeFontSize} />

          {/* 👇 Новые переключатели */}
          {onToggleStriped && (
            <Checkbox
              id={"striped"}
              isChecked={striped}
              label="Зебра"
              name={"striped"}
              onClick={() => onToggleStriped()}
              variant="square"
            />
            // <div className="table-settings-menu__option">
            //   <Icon className={cn(stripedIcon)} />
            //   <label className="table-settings-menu__label">
            //     <input checked={striped} onChange={onToggleStriped} type="checkbox" />
            //     Зебра (чередование строк)
            //   </label>
            // </div>
          )}

          {onToggleVerticalBorders && (
            <Checkbox
              id={"Borders"}
              isChecked={verticalBorders}
              label="Вертикальные границы"
              name={"Borders"}
              onClick={() => onToggleVerticalBorders()}
              variant="square"
            />
            // <div className="table-settings-menu__option">
            //   <label className="table-settings-menu__label">
            //     <input checked={verticalBorders} onChange={onToggleVerticalBorders} type="checkbox" />
            //     Вертикальные границы
            //   </label>
            // </div>
          )}
        </Flex>
      </PositionPortal>
    </>
  )
}
