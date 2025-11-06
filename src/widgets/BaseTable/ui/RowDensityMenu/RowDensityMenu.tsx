// src/shared/ui/TableSettingsMenu/RowDensityMenu.tsx
import React from "react"

import cn from "classnames"

import { RowDensity } from "@/shared/constants"
import { Flex } from "@/shared/ui/layout/Flex"
import { LineHeightIcon } from "@/shared/ui/LineHeightIcon"

import { DENSITY_DISPLAY_ORDER } from "../../lib/constants/settings"

import "./styles.scss"

interface Props {
  currentDensity: RowDensity
  onChangeDensity: (density: RowDensity) => void
}

export const RowDensityMenu: React.FC<Props> = ({ currentDensity, onChangeDensity }) => (
  <Flex gap={4} vertical>
    <p className="row-density-menu__title">Высота строк:</p>
    <Flex gap={4}>
      {DENSITY_DISPLAY_ORDER.map((density: RowDensity) => (
        <button
          className={cn("row-density-menu__option", density === currentDensity && "row-density-menu__option_active")}
          key={density}
          onClick={() => onChangeDensity(density)}
          type="button"
        >
          <LineHeightIcon density={density} />
        </button>
      ))}
    </Flex>
  </Flex>
)
