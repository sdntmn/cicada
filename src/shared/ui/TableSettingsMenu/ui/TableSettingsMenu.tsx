import React, { useState } from "react"

import cn from "classnames"
import { Checkbox } from "itpc-ui-kit"

import { HORIZONTAL_POSITION, RowDensity, verticalDots } from "@/shared/constants"
import { FontSize } from "@/shared/lib/types/types"
import { Flex } from "@/shared/ui/layout/Flex"

import { Button } from "../../Button"
import { Dropdown } from "../../Dropdown"
import { FontSizeMenu } from "../../FontSizeMenu/FontSizeMenu"
import { Icon } from "../../Icon"
import { RowDensityMenu } from "../../RowDensityMenu/RowDensityMenu"

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
        <Button
          active={isOpen}
          aria-label="Настройки таблицы"
          className={cn("table-settings-menu__btn", isOpen && "table-settings-menu__btn_active")}
          icon={<Icon className={cn(verticalDots)} />}
          onClick={toggleMenu}
          ref={refButton}
          size="md"
          type="button"
          variant="icon"
        />
      </div>

      <Dropdown
        anchorRef={refButton}
        className="table-settings-menu"
        distanceBetweenElements={4}
        header="Настройки таблицы"
        horizontalAlignment={HORIZONTAL_POSITION.RIGHT}
        isOpen={isOpen}
        onClose={closeMenu}
      >
        <Flex className="table-settings-menu__content" gap={16} vertical>
          <RowDensityMenu currentDensity={currentDensity} onChangeDensity={handleSelectDensity} />
          <FontSizeMenu currentFontSize={currentFontSize} onChangeFontSize={onChangeFontSize} />
          <Flex gap={8} vertical>
            {onToggleStriped && (
              <Checkbox
                className="table-settings-menu__checkbox"
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
                className="table-settings-menu__checkbox"
                id="borders"
                isChecked={verticalBorders}
                label="Вертикальные границы"
                name={"borders"}
                onClick={() => onToggleVerticalBorders()}
                variant="square"
              />
            )}
          </Flex>
        </Flex>
      </Dropdown>
    </>
  )
}
