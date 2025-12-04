import React from "react"

import cn from "classnames"

import { Icon } from "../../Icon/ui/Icon"

import "./styles.scss"

interface IconButtonProps {
  className?: string
  disabled?: boolean
  icon: string
  iconClassName?: string
  label?: string
  onClick?: () => void
  size?: "sm" | "md" | "lg"
  title?: string
  variant?: "default" | "primary" | "danger" | "ghost"
}

export const ButtonIcon: React.FC<IconButtonProps> = ({
  className,
  disabled = false,
  icon,
  iconClassName,
  label,
  onClick,
  size = "md",
  title,
  variant = "default",
}) => {
  const buttonClasses = cn(
    "button-icon",
    `button-icon__${variant}`,
    `button-icon__${size}`,
    {
      "button-icon_disabled": disabled,
    },
    className
  )

  return (
    <button className={cn("button-icon")} disabled={disabled} onClick={onClick} title={title} type="button">
      <Icon className={cn(icon, iconClassName, buttonClasses)} />
      {label && <span className="button-icon__label">{label}</span>}
    </button>
  )
}
