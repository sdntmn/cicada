import { CSSProperties, RefObject } from "react"

import { type ALLOWED_POSITIONS, HORIZONTAL_POSITION, VERTICAL_POSITION } from "@/shared/constants"

import type { TooltipPosition, TooltipPositionConfig } from "../../types/types"

export const getTooltipPosition = (
  triggerRef: RefObject<HTMLElement>,
  tooltipRef: RefObject<HTMLElement>,
  positionType: ALLOWED_POSITIONS,
  config: TooltipPositionConfig,
  distance: number = 8
): CSSProperties => {
  const triggerEl = triggerRef.current
  const tooltipEl = tooltipRef.current

  if (!triggerEl || !tooltipEl) {
    return {}
  }

  const triggerRect = triggerEl.getBoundingClientRect()
  const tooltipRect = tooltipEl.getBoundingClientRect()

  const scrollTop = window.scrollY
  const scrollLeft = window.scrollX

  let top = 0
  let left = 0

  // === Вертикальное позиционирование ===
  if (config.vertical === VERTICAL_POSITION.TOP) {
    // Тултип СВЕРХУ: его низ = верх триггера - отступ
    top = triggerRect.top - tooltipRect.height - distance
  } else if (config.vertical === VERTICAL_POSITION.BOTTOM) {
    // Тултип СНИЗУ: его верх = низ триггера + отступ
    top = triggerRect.bottom + distance
  } else {
    // VERTICAL_POSITION.CENTER — выравнивание по центру по Y
    top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
  }

  // === Горизонтальное позиционирование ===
  if (config.horizontal === HORIZONTAL_POSITION.LEFT) {
    // Тултип СЛЕВА: его правый край = левый край триггера - отступ
    left = triggerRect.left - tooltipRect.width - distance
  } else if (config.horizontal === HORIZONTAL_POSITION.RIGHT) {
    // Тултип СПРАВА: его левый край = правый край триггера + отступ
    left = triggerRect.right + distance
  } else {
    // HORIZONTAL_POSITION.CENTER — выравнивание по центру по X
    left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
  }

  // Для position: absolute — добавляем скролл
  if (positionType === "absolute") {
    top += scrollTop
    left += scrollLeft
  }

  return {
    left,
    position: positionType,
    top,
  }
}

export const mapPosition = (pos: TooltipPosition) => {
  switch (pos) {
    case "top":
      return { horizontal: HORIZONTAL_POSITION.CENTER, vertical: VERTICAL_POSITION.TOP }
    case "bottom":
      return { horizontal: HORIZONTAL_POSITION.CENTER, vertical: VERTICAL_POSITION.BOTTOM }
    case "left":
      return { horizontal: HORIZONTAL_POSITION.LEFT, vertical: VERTICAL_POSITION.CENTER }
    case "right":
      return { horizontal: HORIZONTAL_POSITION.RIGHT, vertical: VERTICAL_POSITION.CENTER }
    default:
      return { horizontal: HORIZONTAL_POSITION.CENTER, vertical: VERTICAL_POSITION.BOTTOM }
  }
}
