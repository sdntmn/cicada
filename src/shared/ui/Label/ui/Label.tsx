import React, { forwardRef, type LabelHTMLAttributes } from "react"

import cn from "classnames"

import "./styles.scss"

export type LabelSize = "sm" | "md" | "lg"
export type LabelVariant = "secondary" | "default" | "primary" | "success" | "warning" | "danger" | "info"

export interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  className?: string
  disabled?: boolean
  required?: boolean
  size?: LabelSize
  variant?: LabelVariant
}

export const Label = forwardRef<HTMLLabelElement, Props>(
  ({ children, className, disabled = false, required = false, size = "md", variant = "default", ...props }, ref) => {
    const labelClassName = cn(
      "label",
      `label__${size}`,
      `label__${variant}`,
      disabled && "label__disabled",
      required && "label__required",
      className
    )

    return (
      <label aria-disabled={disabled} className={labelClassName} ref={ref} {...props}>
        {children}
        {required && <span className="label__required-mark">*</span>}
      </label>
    )
  }
)

Label.displayName = "Label"
