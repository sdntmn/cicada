import React, { memo } from "react"

import cn from "classnames"

interface Props {
  className?: string
  icon?: React.ReactNode
  title: string
}

export const NavbarItem: React.FC<Props> = memo(({ className, icon, title }) => (
  <li className={cn("navbar-item", className)}>
    <div className="icon">{icon}</div>
    <p className="menu__text">{title}</p>
  </li>
))
NavbarItem.displayName = "NavbarItem"
