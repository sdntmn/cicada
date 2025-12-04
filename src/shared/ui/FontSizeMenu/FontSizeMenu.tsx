import React from "react"

import cn from "classnames"

import { FONT_SIZE_DISPLAY_ORDER, FONT_SIZE_LABELS } from "@/shared/constants/constants"
import { FontSize } from "@/shared/lib/types/types"
import { Flex } from "@/shared/ui/layout/Flex"

import "./styles.scss"

interface Props {
  currentFontSize: FontSize
  onChangeFontSize: (size: FontSize) => void
}

export const FontSizeMenu: React.FC<Props> = ({ currentFontSize, onChangeFontSize }) => (
  <Flex gap={4} vertical>
    <p className="font-size-menu__title">Размер шрифта:</p>

    <Flex gap={4} vertical>
      {FONT_SIZE_DISPLAY_ORDER.map((size) => (
        <button
          className={cn(
            "font-size-menu__option",
            size === currentFontSize && "font-size-menu__option_active",
            `font-size-menu__font_${size}`
          )}
          key={size}
          onClick={() => onChangeFontSize(size)}
          type="button"
        >
          {FONT_SIZE_LABELS[size]}
        </button>
      ))}
    </Flex>
  </Flex>
)
