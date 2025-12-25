import React, { memo } from "react"

import cn from "classnames"

import {
  archiveMenuIcon,
  courtMenuIcon,
  dashboardMenuIcon,
  debtorIcon,
  expertiseMenuIcon,
  Menu,
  MenuName,
  monitoringMenuIcon,
  selectionIcon,
} from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon/ui/Icon"

import "./styles.scss"

export interface TopNavProps {
  className?: string
  currentSection: Menu
  onSectionChange: (section: Menu) => void
}

export const TopNav: React.FC<TopNavProps> = memo(({ className, currentSection, onSectionChange }) => {
  const menuItems = [
    { icon: dashboardMenuIcon, section: Menu.dashboard, title: MenuName.dashboard },
    { icon: selectionIcon, section: Menu.selection, title: MenuName.selection },
    { icon: expertiseMenuIcon, section: Menu.preparation, title: MenuName.preparation },
    { icon: courtMenuIcon, section: Menu.court, title: MenuName.court },
    { icon: monitoringMenuIcon, section: Menu.monitoring, title: MenuName.monitoring },
    { icon: archiveMenuIcon, section: Menu.archive, title: MenuName.archive },
    { icon: debtorIcon, section: Menu.debtors, title: MenuName.debtors },
  ]

  return (
    <nav className={cn("top-nav", className)}>
      <ul className="top-nav__menu">
        {menuItems.map(({ icon, section, title }) => {
          const isActive = currentSection === section

          return (
            <li
              className={cn("top-nav__item", isActive && "top-nav__item_active")}
              key={section}
              onClick={() => onSectionChange(section)}
            >
              <Icon className={cn("top-nav__icon", icon)} />
              <p className="top-nav__text">{title}</p>
            </li>
          )
        })}
      </ul>
    </nav>
  )
})
