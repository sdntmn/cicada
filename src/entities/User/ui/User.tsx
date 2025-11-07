import React, { memo } from "react"

import cn from "classnames"

import "./styles.scss"
interface Props {
  className?: string
  userName?: string
}

export const User: React.FC<Props> = memo(({ className, userName }) => (
  <div className={cn("profile", className)}>
    <span>{userName}</span> <i className="fa-regular fa-circle-user profile__icon" />
  </div>
))
