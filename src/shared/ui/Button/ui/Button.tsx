// shared/ui/Button/Button.tsx
import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from "react"

import cn from "classnames"

import "./styles.scss"

export type ButtonVariant = "secondary" | "primary" | "outline" | "text" | "icon" | "chip"
export type ButtonSize = "xs" | "sm" | "md" | "lg"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean // для toggle-состояний (например, сортировка)
  children?: ReactNode
  fullWidth?: boolean
  icon?: ReactNode // если кнопка только с иконкой (для variant="icon")
  size?: ButtonSize
  variant?: ButtonVariant
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      active = false,
      children,
      className,
      disabled,
      fullWidth = false,
      icon,
      size = "lg",
      type = "button",
      variant = "secondary",
      ...props
    },
    ref
  ) => (
    <button
      className={cn(
        "button",
        `button__variant-${variant}`,
        `button__size-${size}`,
        active && "button_active",
        disabled && "button__disabled",
        fullWidth && "button__full-width",
        !children && icon && "button__icon-only",
        className
      )}
      disabled={disabled}
      ref={ref}
      type={type}
      {...props}
    >
      {icon}
      {children && <span className="button__content">{children}</span>}
    </button>
  )
)
