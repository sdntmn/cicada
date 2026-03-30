import React, { forwardRef, type HTMLAttributes } from "react"

import cn from "classnames"

import "./styles.scss"

export type CardVariant = "outlined" | "elevated" | "default" | "filled"
export type CardSize = "sm" | "md" | "lg"

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  interactive?: boolean
  padding?: boolean
  size?: CardSize
  variant?: CardVariant
}

export const Card = forwardRef<HTMLDivElement, Props>(
  ({ children, className, interactive = false, padding = true, size = "md", variant = "default", ...props }, ref) => {
    const cardClassName = cn(
      "card",
      `card__${variant}`,
      `card__${size}`,
      interactive && "card__interactive",
      padding && "card__padding",
      className
    )

    return (
      <div className={cardClassName} ref={ref} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = "Card"
