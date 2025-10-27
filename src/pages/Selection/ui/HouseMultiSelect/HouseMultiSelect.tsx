import React, { useEffect, useRef, useState } from "react"

import { Typography } from "itpc-ui-kit"

import "./styles.scss"

interface HouseOption {
  id: string
  name: string
}

interface HouseMultiSelectProps {
  onChange: (value: string[]) => void
  options: HouseOption[]
  placeholder?: string
  value: string[]
}

export const HouseMultiSelect: React.FC<HouseMultiSelectProps> = ({ onChange, options, placeholder = "Выберите дома", value }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleOption = (houseId: string) => {
    if (value.includes(houseId)) {
      onChange(value.filter((id) => id !== houseId))
    } else {
      onChange([...value, houseId])
    }
  }

  const selectedHouses = options.filter((house) => value.includes(house.id))
  const displayText = selectedHouses.length > 0 ? `${selectedHouses.length} выбрано` : placeholder

  return (
    <div className={"multiSelect"} ref={dropdownRef}>
      <div className={"selected"} onClick={() => setIsOpen(!isOpen)}>
        <Typography.Text className={"placeholder"}>{displayText}</Typography.Text>
        <span className={"arrow"}>▼</span>
      </div>

      {isOpen && (
        <div className={"dropdown"}>
          {options.map((house) => (
            <label className={"option"} key={house.id}>
              <input
                checked={value.includes(house.id)}
                className={"checkbox"}
                onChange={() => toggleOption(house.id)}
                type="checkbox"
              />
              <span className={"optionText"}>{house.name}</span>
            </label>
          ))}
        </div>
      )}

      {selectedHouses.length > 0 && (
        <div className={"chips"}>
          {selectedHouses.map((house) => (
            <span className={"chip"} key={house.id}>
              {house.name}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleOption(house.id)
                }}
                className={"removeChip"}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
