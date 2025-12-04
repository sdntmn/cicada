// widgets/Submenu/Submenu.tsx
import React, { memo } from "react"

import cn from "classnames"

import { copyLinkIcon, Menu } from "@/shared/constants"
import { getSubMenu } from "@/shared/lib/helpers"
import { AppView } from "@/shared/lib/types/navigation"
import { ButtonIcon } from "@/shared/ui/ButtonIcon"

import "./styles.scss"

interface SubNavProps {
  currentView: AppView
  onSectionChange: (section: Menu) => void
  onSubSectionChange: (subSection: string) => void
}

export const SubNav: React.FC<SubNavProps> = memo(({ currentView, onSectionChange, onSubSectionChange }) => {
  // Режим детальной страницы
  if (currentView.type === "detail") {
    const { caseId, debtorId, detailType, originSection, originSubSection } = currentView
    const menu = getSubMenu(originSection)
    const activeItem = menu?.find((item) => item.id === originSubSection)

    const copyLink = () => {
      const url = new URL(window.location.href)
      // Убедитесь, что параметры ctx есть
      navigator.clipboard.writeText(url.toString())
    }

    if (activeItem) {
      const id = detailType === "case" ? caseId : debtorId
      return (
        <>
          <div className="sub-nav-wrapper">
            <nav className="sub-nav">
              <ul className="sub-nav__list">
                <li
                  onClick={() => {
                    onSectionChange(originSection)
                    if (originSubSection) {
                      onSubSectionChange(originSubSection)
                    }
                  }}
                  className="sub-nav__item"
                >
                  <p className="sub-nav__text">{activeItem.title}</p>
                </li>
              </ul>
            </nav>
          </div>
          <span className="sub-nav__breadcrumb">
            {detailType === "case" ? "Дело" : "Должник"} {id}
            <ButtonIcon className="sub-nav__copy-link" icon={copyLinkIcon} onClick={copyLink} title="Копировать ссылку" />
          </span>
        </>
      )
    }
    return null
  }

  // Обычный режим
  const { section, subSection } = currentView as Extract<AppView, { type: "main" }>
  if (section === Menu.caseDetail || section === Menu.debtorDetail) {
    return null
  }

  const subMenu = getSubMenu(section)
  if (!subMenu) {
    return null
  }

  return (
    <div className="sub-nav-wrapper">
      <nav className="sub-nav">
        <ul className="sub-nav__list">
          {subMenu.map((item) => (
            <li
              className={cn("sub-nav__item", subSection === item.id && "sub-nav__item_active")}
              key={item.id}
              onClick={() => onSubSectionChange(item.id)}
            >
              <p className="sub-nav__text">{item.title}</p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
})
