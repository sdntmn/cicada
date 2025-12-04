import React, { cloneElement, useEffect, useRef, useState } from "react"

import cn from "classnames"

import { ALLOWED_POSITIONS } from "@/shared/constants"
import { getTooltipPosition, mapPosition } from "@/shared/lib/helpers"
import type { TooltipPosition } from "@/shared/lib/types/types"

import "./styles.scss"

export interface Props {
  children: React.ReactElement
  className?: string
  content: React.ReactNode | string
  delay?: number
  disabled?: boolean
  maxWidth?: number | string
  position?: TooltipPosition
  showArrow?: boolean
  theme?: "vs-dark" | "light" | "dark"
  width?: number | string
}

export const Tooltip: React.FC<Props> = ({
  children,
  className,
  content,
  delay = 300,
  disabled = false,
  maxWidth = "300px",
  position = "top",
  showArrow = true,
  theme = "vs-dark",
  width,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [calculatedPosition, setCalculatedPosition] = useState(position)

  useEffect(() => {
    if (disabled && isVisible) {
      setIsVisible(false)
    }
  }, [disabled, isVisible])

  const show = () => {
    if (disabled) {
      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
      // Рассчитываем оптимальную позицию при показе
      calculateOptimalPosition()
    }, delay)
  }

  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsVisible(false)
  }

  const calculateOptimalPosition = () => {
    if (!triggerRef.current || !tooltipRef.current) {
      return
    }

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth

    // Если тултип не помещается в выбранной позиции, выбираем другую
    let optimalPosition = position

    if (position === "top" && triggerRect.top < 120) {
      optimalPosition = "bottom"
    } else if (position === "bottom" && viewportHeight - triggerRect.bottom < 120) {
      optimalPosition = "top"
    } else if (position === "left" && triggerRect.left < 120) {
      optimalPosition = "right"
    } else if (position === "right" && viewportWidth - triggerRect.right < 120) {
      optimalPosition = "left"
    }

    setCalculatedPosition(optimalPosition)
  }

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const { horizontal, vertical } = mapPosition(calculatedPosition)

      const styles = getTooltipPosition(triggerRef, tooltipRef, ALLOWED_POSITIONS.FIXED, { horizontal, vertical }, 6)

      const el = tooltipRef.current
      Object.assign(el.style, {
        bottom: "",
        left: typeof styles.left === "number" ? `${styles.left}px` : "",
        maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
        position: styles.position || "fixed",
        right: "",
        top: typeof styles.top === "number" ? `${styles.top}px` : "",
        width: width ? (typeof width === "number" ? `${width}px` : width) : "",
      })
    }
  }, [isVisible, calculatedPosition, width, maxWidth])

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    },
    []
  )

  const childWithProps = cloneElement(children, {
    "aria-describedby": isVisible ? "tooltip" : undefined,
    "aria-label": typeof content === "string" ? content : undefined,
    onBlur: hide,
    onFocus: show,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        hide()
      }
      children.props.onKeyDown?.(e)
    },
    onMouseEnter: show,
    onMouseLeave: hide,
    ref: triggerRef,
  })

  return (
    <>
      {childWithProps}
      {isVisible && (
        <div
          style={{
            animation: "tooltipFadeIn 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          className={cn("tooltip", `tooltip--${calculatedPosition}`, `tooltip--theme-${theme}`, className)}
          id="tooltip"
          ref={tooltipRef}
          role="tooltip"
        >
          <div className="tooltip__content">{content}</div>
          {showArrow && <div className={cn("tooltip__arrow", `tooltip__arrow--${calculatedPosition}`)} />}
        </div>
      )}
    </>
  )
}
