import React, { memo, useRef, useState } from "react"

import cn from "classnames"
import { Checkbox } from "itpc-ui-kit"

import { User } from "@/entities/User"
import { HORIZONTAL_POSITION } from "@/shared/constants"
import { Flex } from "@/shared/ui/layout/Flex"
import { PositionPortal } from "@/shared/ui/PositionPortal"

import "./styles.scss"

interface Props {
  isDarkTheme?: boolean
  onLogout?: () => void
  onToggleTheme?: () => void
  userName?: User
}

export const Profile: React.FC<Props> = memo(({ isDarkTheme, onLogout, onToggleTheme, userName }) => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => setIsOpen((prev) => !prev)
  const closeMenu = () => setIsOpen(false)

  const handleLogout = () => {
    closeMenu()
    onLogout?.()
  }

  const handleToggleTheme = () => {
    onToggleTheme?.()
  }

  return (
    <>
      <button
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleMenu()
          }
        }}
        className={cn("profile__trigger", isOpen && "profile__trigger_active")}
        onClick={toggleMenu}
        ref={buttonRef}
        role="button"
        tabIndex={0}
      >
        <span className="profile__name">{userName ? userName.username : "Гость"}</span>
        <i className="fa-regular fa-circle-user profile__icon" />
      </button>

      <PositionPortal
        anchorRef={buttonRef}
        className="profile__dropdown"
        distanceBetweenElements={8}
        horizontalAlignment={HORIZONTAL_POSITION.RIGHT}
        isOpen={isOpen}
        onClose={closeMenu}
      >
        <Flex className="profile__menu" gap={8} vertical>
          <Checkbox
            id="dark-theme-toggle"
            isChecked={isDarkTheme}
            label="Тёмная тема"
            name="darkTheme"
            onClick={handleToggleTheme}
            type="checkbox"
            variant="android"
          />

          <button className="profile__logout-btn" onClick={handleLogout} type="button">
            Выйти
          </button>
        </Flex>
      </PositionPortal>
    </>
  )
})
