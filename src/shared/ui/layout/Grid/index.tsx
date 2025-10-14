import React, { HTMLAttributes } from "react"

import { RowAlign, RowJustify } from "../../../enums"

import { RowContext, RowContextState } from "./RowContext"
import "./styles.css"
import { generateColClassList, generateColStyle, generateRowClassList, generateRowStyle } from "./utils"

export interface ColProps extends HTMLAttributes<HTMLDivElement> {
  /** Дополнительный класс */
  className?: string
  /** Количество колонок */
  col?: number
  /** Размер колонки */
  flex?: number | string
  /** Порядковый номер */
  order?: number
  /** Дополнительные стили */
  style?: React.CSSProperties
}

export const Col: React.FC<ColProps> = ({ children, ...props }) => {
  const { gap } = React.useContext(RowContext)

  return (
    <div {...props} className={generateColClassList(props)} style={generateColStyle(props, gap)}>
      {children}
    </div>
  )
}

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
  /** Вертикальное выравнивание */
  align?: RowAlign
  /** Дополнительный класс */
  className?: string
  /** Расстояние между колонками */
  gap?: [number, number] | number
  /** Горизонтальное выравнивание */
  justify?: RowJustify
  /** Дополнительные стили */
  style?: React.CSSProperties
  /** Разрешить перенос */
  wrap?: boolean
}

export const Row: React.FC<RowProps> = ({ children, wrap = true, ...props }) => {
  const rowContext = React.useMemo<RowContextState>(() => ({ gap: props.gap }), [props.gap])

  return (
    <RowContext.Provider value={rowContext}>
      <div {...props} className={generateRowClassList({ wrap, ...props })} style={generateRowStyle(props)}>
        {children}
      </div>
    </RowContext.Provider>
  )
}

export { RowJustify, RowAlign }
