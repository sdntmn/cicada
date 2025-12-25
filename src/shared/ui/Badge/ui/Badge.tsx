import React, { forwardRef, type HTMLAttributes } from "react"

import cn from "classnames"

import type { BadgeSize, BadgeVariant } from "@/shared/lib/types/types"

import "./styles.scss"

export interface Props extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  className?: string
  size?: BadgeSize
  variant?: BadgeVariant
}

export const Badge = forwardRef<HTMLSpanElement, Props>(({ children, className, size = "sm", variant = "default", ...props }, ref) => (
  <span className={cn("badge", `badge__${variant}`, `badge__${size}`, className)} ref={ref} {...props}>
    {children}
  </span>
))
