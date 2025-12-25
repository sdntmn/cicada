// shared/ui/Panel/Panel.tsx
import React from "react"

import cn from "classnames"

import "./styles.scss"

export interface Props {
  children: React.ReactNode
  className?: string
  isOpen: boolean
  onClose: () => void
  title?: string
  width?: number // например, 400, 500, 600
}

export const Panel: React.FC<Props> = ({ children, className, isOpen, onClose, title, width = 400 }) => {
  if (!isOpen) {
    return null
  }

  return (
    <>
      <div className="panel__backdrop" onClick={onClose} />
      <div className="panel__wrapper" style={{ width }}>
        <div className={cn("panel", className)}>
          {title && (
            <div className="panel__header">
              <h3 className="panel__title">{title}</h3>
              <button aria-label="Закрыть" className="panel__close" onClick={onClose} />
            </div>
          )}
          <div className="panel__body">{children}</div>
        </div>
      </div>
    </>
  )
}
