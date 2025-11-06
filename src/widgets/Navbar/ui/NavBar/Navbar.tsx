import React, { memo } from "react"

import cn from "classnames"

import {
  archiveMenuIcon,
  courtMenuIcon,
  dashboardMenuIcon,
  expertiseMenuIcon,
  Menu,
  MenuName,
  monitoringMenuIcon,
  searchIcon,
} from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon/ui/Icon"

import "./styles.scss"
interface Props {
  className?: string
  currentSection: Menu
  switchSection(newSection: Menu): void
}

export const Navbar: React.FC<Props> = memo(({ className, currentSection, switchSection }) => {
  const renderItem = (sectionItem: Menu, title: string, icon: string): React.ReactNode => (
    <li
      className={cn("navbar__item", currentSection === sectionItem && "navbar__item_active")}
      onClick={() => switchSection(sectionItem)}
    >
      <Icon className={cn(icon, currentSection === sectionItem && "navbar__icon_active")} />
      <p className="menu__text">{title}</p>
    </li>
  )

  return (
    <nav className={cn("navbar", className)}>
      <ul className="navbar__menu">
        {renderItem(Menu.dashboard, MenuName.dashboard, dashboardMenuIcon)}
        {renderItem(Menu.cardIndex, MenuName.cardIndex, searchIcon)}
        {renderItem(Menu.expertise, MenuName.expertise, expertiseMenuIcon)}
        {renderItem(Menu.court, MenuName.court, courtMenuIcon)}
        {renderItem(Menu.monitoring, MenuName.monitoring, monitoringMenuIcon)}
        {renderItem(Menu.archive, MenuName.archive, archiveMenuIcon)}
      </ul>
    </nav>
  )
})
