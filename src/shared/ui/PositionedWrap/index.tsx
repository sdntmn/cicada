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
  refParent?: React.RefObject<HTMLDivElement>
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
    if (refParent) {
      const stylePosition: CSSProperties = getCalculatePosition(refParent, ref, position, distanceBetweenElements, horizontalAlignment)
      setStylePosition(stylePosition)
    }
  }

  useEffect(() => {
    const hasScroll: boolean = document.body.scrollHeight > window.innerHeight
    if (hasScroll) {
      window.addEventListener("scroll", calculatePosition)
    }
    return () => {
      window.removeEventListener("scroll", calculatePosition)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      calculatePosition()
    }
  }, [isOpen])

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
