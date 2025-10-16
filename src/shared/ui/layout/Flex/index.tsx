import React, { CSSProperties, forwardRef, HTMLAttributes } from "react"

import "./styles.scss"
import { generateClassList } from "./utils"

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  /** Вертикальное выравнивание */
  align?: CSSProperties["alignItems"]
  /** Контент */
  children?: React.ReactNode
  /** Дополнительный класс */
  className?: string
  /** Расстояние между элементами */
  gap?: number
  /** Горизонтальное выравнивание */
  justify?: CSSProperties["justifyContent"]
  /** Дополнительные стили */
  style?: React.CSSProperties
  /** Вертикальное расположение */
  vertical?: boolean
  /** Перенос строк */
  wrap?: CSSProperties["flexWrap"]
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ align, children, className, gap, justify, style, vertical, wrap, ...props }, ref) => (
    <div
      {...props}
      className={generateClassList({ align, className, gap, justify, vertical, wrap })}
      ref={ref}
      style={{ gap, ...style }}
    >
      {children}
    </div>
  )
)
