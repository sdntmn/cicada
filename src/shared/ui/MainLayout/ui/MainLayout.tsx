import React, { memo, ReactElement } from "react"

import cn from "classnames"

import "./styles.scss"

interface Props {
  className?: string
  content: ReactElement
  header: ReactElement
}

export const MainLayout: React.FC<Props> = memo(({ className, content, header }) => (
  <div className={cn("main-layout", className)}>
    <header className="main-layout__header">{header}</header>

    <main className="main-layout__content">{content}</main>
  </div>
))
MainLayout.displayName = "MainLayout"
