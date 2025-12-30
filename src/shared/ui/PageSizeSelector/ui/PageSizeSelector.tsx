import React, { useRef, useState } from "react"

import cn from "classnames"

import { HORIZONTAL_POSITION, PAGE_SIZES } from "@/shared/constants"
import { PageSize } from "@/shared/lib/types/types"
import { PositionPortal } from "@/shared/ui/PositionPortal"

import { Button } from "../../Button"

import "./styles.scss"
import { Dropdown } from "../../Dropdown"

export interface Props {
  className?: string
  onChange: (size: PageSize) => void
  value: PageSize
}

export const PageSizeSelector: React.FC<Props> = ({ className, onChange, value }) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen((prev) => !prev)
  const close = () => setIsOpen(false)

  const handleSelect = (size: PageSize) => {
    onChange(size)
    close()
  }

  return (
    <div className={cn("page-size-selector", className)}>
      <Button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Показывать по ${value} записей на странице`}
        // className="page-size-selector__trigger"
        onClick={toggle}
        ref={buttonRef}
        size="md"
        type="button"
        variant="outline"
      >
        По {value}
      </Button>

      <Dropdown
        anchorRef={buttonRef}
        className=""
        distanceBetweenElements={4}
        horizontalAlignment={HORIZONTAL_POSITION.LEFT}
        isOpen={isOpen}
        onClose={close}
      >
        <ul aria-label="Количество записей на странице" className="page-size-selector__list" role="listbox">
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
      </Dropdown>
    </div>
  )
}
