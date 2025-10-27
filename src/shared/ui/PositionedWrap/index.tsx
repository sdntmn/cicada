import React, { type CSSProperties, useEffect, useRef, useState } from "react"

import cn from "classnames"

import { ALLOWED_POSITIONS, HORIZONTAL_POSITION, PositionType } from "@/shared/constants"
import { getCalculatePosition } from "@/shared/lib/helpers/getCalculatePosition/getCalculatePosition"

import "./styles.scss"

interface PositionedWrapProps {
  buttonId?: string // ← новый пропс
  children: React.ReactNode
  distanceBetweenElements?: number
  horizontalAlignment?: HORIZONTAL_POSITION
  isClosing: boolean
  isOpen: boolean
  position?: PositionType
  // Поддерживаем оба варианта:
  refParent?: React.RefObject<HTMLElement>
}

export const PositionedWrap: React.FC<PositionedWrapProps> = ({
  buttonId,
  children,
  distanceBetweenElements,
  horizontalAlignment,
  isClosing,
  isOpen,
  position = ALLOWED_POSITIONS.FIXED,
  refParent,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [stylePosition, setStylePosition] = useState<CSSProperties>({})

  const getParentElement = (): HTMLElement | null => {
    if (refParent?.current) {
      return refParent.current
    }
    if (buttonId) {
      return document.getElementById(buttonId)
    }
    return null
  }

  const calculatePosition = (): void => {
    const parentElement = getParentElement()
    if (!parentElement || !ref.current) {
      return
    }

    const parentRef = { current: parentElement }
    const style = getCalculatePosition(parentRef, ref, position, distanceBetweenElements, horizontalAlignment)
    setStylePosition(style)
  }

  // Обновляем позицию при скролле
  useEffect(() => {
    const handleScroll = () => calculatePosition()
    window.addEventListener("scroll", handleScroll, true)
    return () => window.removeEventListener("scroll", handleScroll, true)
  }, [buttonId, refParent])

  // Пересчитываем при открытии
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(calculatePosition, 0) // дать время отрендериться
      return () => clearTimeout(timer)
    }
  }, [isOpen, buttonId, refParent])

  return (
    <div
      className={cn(
        "itpc-positioned-wrap",
        isOpen && "itpc-positioned-wrap_opened",
        !isOpen && isClosing && "itpc-positioned-wrap_closed"
      )}
      ref={ref}
      style={stylePosition}
    >
      {children}
    </div>
  )
}
