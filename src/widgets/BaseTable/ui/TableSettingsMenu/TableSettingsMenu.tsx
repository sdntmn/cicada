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
  const refButton = React.useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)
  const toggleMenu = () => setIsOpen((prev) => !prev)

  const handleSelectDensity = (density: RowDensity) => {
    onChangeDensity(density)
  }

  return (
    <>
      <div className="table-settings-menu__btn-wrap">
        <button
          aria-label="Настройки таблицы"
          className={cn("table-settings-menu__btn", isOpen && "table-settings-menu__btn_active")}
          onClick={toggleMenu}
          ref={refButton}
          type="button"
        >
          <i className={cn(verticaDots, " table-settings-menu__icon")} />
        </button>
      </div>

      <PositionPortal
        anchorRef={refButton}
        className="table-settings-menu__dropdown"
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
          )}
        </Flex>
      </PositionPortal>
    </>
  )
}
