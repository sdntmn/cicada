import React, { memo } from "react"

import cn from "classnames"

import "./styles.scss"
interface Props {
  className?: string
}

export const Profile: React.FC<Props> = memo(({ className }) => (
  <div className={cn("profile", className)}>
    <span>Профиль</span> <i className="fa-regular fa-circle-user profile__icon" />
  </div>
))
