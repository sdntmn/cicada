import React from "react"

import cn from "classnames"

import "./styles.scss"

export interface ExpandedColumn {
  rows: {
    extraValue?: string | number | null
    isExtra?: boolean
    label: string
    value?: string | number | null
  }[]
  title?: string
}

interface Props {
  className?: string
  columns: ExpandedColumn[]
  gap?: number
  layout?: "custom" | "equal" | "auto"
  title?: string
}

export const ExpandedContentRow: React.FC<Props> = ({
  className,
  columns,
  gap = 64,
  layout = "auto",
  title = "Дополнительная информация",
}) => {
  if (!columns.length) {
    return null
  }

  return (
    <div className={cn("expanded-content-row", className)}>
      {title && <h4 className="expanded-content-row__title">{title}</h4>}

      <div className={cn("expanded-content-row__content", `expanded-content-row__content--${layout}`)} style={{ gap: `${gap}px` }}>
        {columns.map((column, columnIndex) => (
          <div className="expanded-content-row__column" key={columnIndex}>
            {column.title && <h5 className="expanded-content-row__column-title">{column.title}</h5>}
            <table className="expanded-content-row__table">
              <tbody>
                {column.rows.map((row, rowIndex) => (
                  <tr
                    className={cn("expanded-content-row__row", rowIndex % 2 === 0 && "expanded-content-row__row--striped")}
                    key={rowIndex}
                  >
                    <td className="expanded-content-row__label">{row.label}</td>
                    <td className={cn("expanded-content-row__value")}>
                      {row.value || row.value === 0 ? (
                        <span className="expanded-content-row__text">{row.value}</span>
                      ) : (
                        <span className="expanded-content-row__text">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  )
}
