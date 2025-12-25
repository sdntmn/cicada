import React, { forwardRef, type HTMLAttributes } from "react"

import cn from "classnames"

import { closeIcon } from "@/shared/constants"
import type { ChipSize, ChipVariant } from "@/shared/lib/types/types"

import { Icon } from "../../Icon"

import "./styles.scss"

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  className?: string
  onRemove?: () => void
  removable?: boolean
  size?: ChipSize
  variant?: ChipVariant
}

export const Chip = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, className, onRemove, removable, size = "small", variant = "filled", ...props }, ref) => {
    const isRemovable = onRemove != null || removable
    return (
      <span
        className={cn("chip", `chip__${variant}`, `chip_${size}`, className, isRemovable && "chip__removable")}
        ref={ref}
        {...props}
      >
        {children}
        {isRemovable && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              onRemove?.()
            }}
            aria-label="Удалить"
            className={cn("chip__remove", `chip__remove_${size}`)}
            type="button"
          >
            <Icon className={closeIcon} />
          </button>
        )}
      </span>
    )
  }
)
