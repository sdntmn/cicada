import React, { ButtonHTMLAttributes, forwardRef } from "react"

import cn from "classnames"

import { closeIcon } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon"

import "./styles.scss"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  clearable?: boolean
  isActive?: boolean
  isOpen?: boolean
  onClear?: (e: React.MouseEvent) => void
}

export const FilterButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, clearable, isActive, isOpen, onClear, ...props }, ref) => (
    <button
      className={cn("filter-button", isActive && "filter-button_active", isOpen && "filter-button_open", className)}
      ref={ref}
      {...props}
    >
      {children}
      {clearable && onClear && (
        <span className="filter-button__clear-wrap" onClick={onClear}>
          <Icon className={cn("filter-button__clear", closeIcon)} />
        </span>
      )}
    </button>
  )
)
