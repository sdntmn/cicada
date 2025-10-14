import React, { useRef } from "react"

import cn from "classnames"
import moment from "moment"

import "./styles.scss"

interface Props {
  activeIndex?: number
  children?: React.ReactNode
  disabled?: boolean
  id: string
  isActive?: boolean
  itemIndex: number
  onChange?(id: string): void
  onMouseEnter?(index: number): void
}

export const SelectItem: React.FC<Props> = ({
  activeIndex,
  children,
  disabled,
  id,
  isActive,
  itemIndex,
  onChange,
  onMouseEnter,
  ...rest
}) => {
  const isActiveIndex = typeof activeIndex === "number" && activeIndex === itemIndex

  const isTouchDevice = useRef(false)

  const handleClick = () => {
    if (!disabled && onChange && !isTouchDevice.current) {
      onChange(id)
    }
  }

  const touchStartRef = React.useRef({ time: moment(), x: 0, y: 0 })

  const handleTouchStart = (event: React.TouchEvent<HTMLLIElement>) => {
    isTouchDevice.current = true
    if (!disabled) {
      touchStartRef.current = {
        time: moment(),
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      }
    }
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLLIElement>) => {
    if (!disabled && onChange) {
      const { time: startTime, x: startX, y: startY } = touchStartRef.current
      const endX = event.changedTouches[0].clientX
      const endY = event.changedTouches[0].clientY
      const endTime = moment()

      const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))
      const duration = endTime.diff(startTime, "milliseconds")

      if (distance < 10 && duration < 300) {
        onChange(id)
      }
    }
  }

  return (
    <li
      className={cn(
        "itpc-select-item",
        !disabled && "itpc-select-item_clickable",
        !disabled && isActiveIndex && "itpc-select-item_clickable_hover",
        disabled && "itpc-select-item_disabled",
        !isActiveIndex && isActive && "itpc-select-item_selected",
        isActiveIndex && "itpc-select-item_active"
      )}
      data-id={id}
      onClick={handleClick}
      onMouseEnter={() => onMouseEnter && onMouseEnter(itemIndex)}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
      {...rest}
    >
      <span className={cn("itpc-select-item__stick", isActive && "itpc-select-item__stick_showed")} />
      {children}
    </li>
  )
}
