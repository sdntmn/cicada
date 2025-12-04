import React, { memo } from "react"

import cn from "classnames"

import "./styles.scss"

interface Props {
  className?: string
  isActive?: boolean
  title?: string
}

export const Icon: React.FC<Props> = memo(function Icon({ className, isActive, title }) {
  return <i className={cn("icon", isActive && "icon_active", className)} title={title} />
})
