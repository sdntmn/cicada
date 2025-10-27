// src/shared/ui/PageSizeSelector/PageSizeSelector.tsx

import React, { useEffect, useRef, useState } from "react"

import cn from "classnames"

import { HORIZONTAL_POSITION } from "@/shared/constants"
import { PositionPortal } from "@/shared/ui/PositionPortal"

import "./styles.scss"

const PAGE_SIZES = [10, 20, 50, 100] as const
export type PageSize = (typeof PAGE_SIZES)[number]

const PAGE_SIZE_ID = "page-size-id"

export interface PageSizeSelectorProps {
  className?: string
  onChange: (size: PageSize) => void
  value: PageSize
}

export const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ className, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggle = () => setIsOpen((prev) => !prev)
  const close = () => setIsOpen(false)

  const handleSelect = (size: PageSize) => {
    onChange(size)
    close()
  }

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        close()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={cn("page-size-selector", className)} ref={dropdownRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Показывать по ${value} записей на странице`}
        className="page-size-selector__trigger"
        id={PAGE_SIZE_ID}
        onClick={toggle}
      >
        По {value}
      </button>

      <PositionPortal
        className=""
        componentId={PAGE_SIZE_ID}
        distanceBetweenElements={4}
        horizontalAlignment={HORIZONTAL_POSITION.LEFT}
        isOpen={isOpen}
        onClose={close}
      >
        <ul aria-label="Количество записей на странице" className="page-size-selector__dropdown" role="listbox">
          {PAGE_SIZES.map((size) => (
            <li
              aria-selected={value === size}
              className={cn("page-size-selector__option", value === size && "page-size-selector__option_active")}
              key={size}
              onClick={() => handleSelect(size)}
              role="option"
            >
              {size}
            </li>
          ))}
        </ul>
      </PositionPortal>
    </div>
  )
}
