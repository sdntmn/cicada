import React, {
  cloneElement,
  forwardRef,
  type HTMLAttributes,
  type ReactElement,
  type Ref,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"

import cn from "classnames"

import { ALLOWED_POSITIONS } from "@/shared/constants"
import { getTooltipPosition, mapPosition, mergeRefs } from "@/shared/lib/helpers"
import type { TooltipPosition } from "@/shared/lib/types/types"

import "./styles.scss"

type ElementWithRef = HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }

export interface TooltipProps {
  children: ReactElement<ElementWithRef>
  className?: string
  content: React.ReactNode | string
  delay?: number
  disabled?: boolean
  maxWidth?: number | string
  position?: TooltipPosition
  showArrow?: boolean
  title?: React.ReactNode | string
  width?: number | string
}

export const Tooltip = forwardRef<HTMLElement, TooltipProps>(
  (
    {
      children,
      className,
      content,
      delay = 300,
      disabled = false,
      maxWidth = "300px",
      position = "top",
      showArrow = true,
      title,
      width,
    },
    externalRef
  ) => {
    if (!React.isValidElement(children)) {
      throw new Error("Tooltip: children must be a single valid React element.")
    }

    const [isVisible, setIsVisible] = useState(false)
    const [isPositioned, setIsPositioned] = useState(false)
    const internalTriggerRef = useRef<HTMLElement>(null) // ← внутренний ref для позиционирования
    const tooltipRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const [calculatedPosition, setCalculatedPosition] = useState(position)
    const tooltipId = useId()

    // Объединяем внутренний и внешний ref
    const mergedRef = mergeRefs(internalTriggerRef, externalRef)

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
        setIsPositioned(false)
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
      if (!internalTriggerRef.current || !tooltipRef.current) {
        return
      }

      const triggerRect = internalTriggerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth

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
      if (isVisible && internalTriggerRef.current && tooltipRef.current) {
        const raf = requestAnimationFrame(() => {
          const { horizontal, vertical } = mapPosition(calculatedPosition)
          const styles = getTooltipPosition(internalTriggerRef, tooltipRef, ALLOWED_POSITIONS.FIXED, { horizontal, vertical }, 6)
          const el = tooltipRef.current
          if (el) {
            el.style.left = typeof styles.left === "number" ? `${styles.left}px` : ""
            el.style.top = typeof styles.top === "number" ? `${styles.top}px` : ""
            el.style.position = styles.position || "fixed"
            setIsPositioned(true)
          }
        })
        return () => cancelAnimationFrame(raf)
      }
    }, [isVisible, calculatedPosition])

    useEffect(
      () => () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      },
      []
    )

    // ❌ НЕ читаем ref из children.props — это запрещено!

    const clonedChild = cloneElement(children, {
      "aria-describedby": isVisible ? tooltipId : undefined,
      "aria-label": typeof content === "string" ? content : undefined,
      onBlur: (e: React.FocusEvent<HTMLElement>) => {
        children.props.onBlur?.(e)
        hide()
      },
      onClick: children.props.onClick,
      onFocus: (e: React.FocusEvent<HTMLElement>) => {
        children.props.onFocus?.(e)
        show()
      },
      onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Escape") {
          hide()
        }
        children.props.onKeyDown?.(e)
      },
      onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
        children.props.onMouseEnter?.(e)
        show()
      },
      onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
        children.props.onMouseLeave?.(e)
        hide()
      },
      // ✅ Передаём объединённый ref
      ref: mergedRef,
    })

    return (
      <>
        {clonedChild}
        {isVisible && (
          <div
            style={{
              animation: "tooltipFadeIn 150ms cubic-bezier(0.4, 0, 0.2, 1)",
              maxWidth,
              width,
            }}
            className={cn("tooltip", isPositioned && "tooltip__ready", `tooltip--${calculatedPosition}`, className)}
            id={tooltipId}
            ref={tooltipRef}
            role="tooltip"
          >
            <div className="tooltip__content">
              {title && <div className="tooltip__title">{title}</div>}
              <div className="tooltip__description">{content}</div>
            </div>
            {showArrow && <div className={cn("tooltip__arrow", `tooltip__arrow--${calculatedPosition}`)} />}
          </div>
        )}
      </>
    )
  }
)
