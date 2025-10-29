import React, { HTMLAttributes } from "react"

import cn from "classnames"

import "./styles.scss"

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Контент */
  children?: React.ReactNode
  /** Дополнительный класс */
  className?: string
  /** Дополнительные стили */
  style?: React.CSSProperties
}

export const Layout: React.FC<LayoutProps> = ({ children, className, style, ...props }) => (
  <div {...props} className={cn("itpc-layout", className)} style={style}>
    {children}
  </div>
)
