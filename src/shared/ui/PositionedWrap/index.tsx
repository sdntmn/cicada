import React, { type CSSProperties, useEffect, useRef, useState } from "react"

import cn from "classnames"

import { ALLOWED_POSITIONS, HORIZONTAL_POSITION, PositionType } from "@/shared/constants"
import { getCalculatePosition } from "@/shared/lib/helpers/getCalculatePosition/getCalculatePosition"

import "./styles.scss"

interface PositionedWrapProps {
  children: React.ReactNode
  distanceBetweenElements?: number
  horizontalAlignment?: HORIZONTAL_POSITION
  isClosing: boolean
  isOpen: boolean
  position?: PositionType
  refParent?: React.RefObject<HTMLElement>
}

export const PositionedWrap: React.FC<PositionedWrapProps> = ({
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

  const calculatePosition = (): void => {
    const parentElement = refParent.current
    const selfElement = ref.current

    if (!parentElement || !selfElement) {
      return
    }

    const style = getCalculatePosition(
      { current: parentElement },
      { current: selfElement },
      position,
      distanceBetweenElements,
      horizontalAlignment
    )
    setStylePosition(style)
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleScroll = () => calculatePosition()
    window.addEventListener("scroll", handleScroll, true)
    return () => window.removeEventListener("scroll", handleScroll, true)
  }, [isOpen, refParent])

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(calculatePosition, 0)
      return () => clearTimeout(timer)
    }
  }, [isOpen, refParent])

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
