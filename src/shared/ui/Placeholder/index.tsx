import React from "react"

import cn from "classnames"
import { ValidationState } from "itpc-ui-kit/dist/components/types"

import "./styles.scss"

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  focused?: boolean
  htmlFor?: string
  required?: boolean
  validationState?: ValidationState
}

export const Placeholder: React.FC<Props> = ({
  children,
  className,
  disabled,
  focused,
  htmlFor,
  required,
  validationState,
  ...rest
}) => (
  <label
    className={cn(
      "itpc-placeholder",
      className,
      disabled && "itpc-placeholder_disabled",
      focused && "itpc-placeholder_focused",
      validationState === "invalid" && "itpc-placeholder_color_red"
    )}
    htmlFor={htmlFor}
    {...rest}
  >
    {children}

    {required && <span>*</span>}
  </label>
)
