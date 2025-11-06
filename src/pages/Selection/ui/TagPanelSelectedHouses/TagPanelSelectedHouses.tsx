import React, { useRef, useState } from "react"

import cn from "classnames"

import { closeIcon, HORIZONTAL_POSITION } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon/ui/Icon"
import { Flex } from "@/shared/ui/layout/Flex"
import { PositionPortal } from "@/shared/ui/PositionPortal"

import { HouseOption } from "../../lib/types/types"

import "./styles.scss"

interface Props {
  onClearAll?: () => void
  onRemoveHouse?: (houseId: string) => void
  selectedHouses?: HouseOption[]
}

export const TagPanelSelectedHouses: React.FC<Props> = ({ onClearAll, onRemoveHouse, selectedHouses = [] }) => {
  const moreButtonRef = useRef<HTMLButtonElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const closeDropdown = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false)
    }
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const VISIBLE_TAGS_LIMIT = 3
  const visibleHouses = selectedHouses.slice(0, VISIBLE_TAGS_LIMIT)
  const hiddenHouses = selectedHouses.slice(VISIBLE_TAGS_LIMIT)
  const hasHidden = hiddenHouses.length > 0

  if (!selectedHouses?.length) {
    return null
  }

  return (
    <Flex align="flex-start" className="tag-panel-selected-houses" gap={24}>
      <Flex className="tag-panel-selected-houses__tag-wrap" gap={8}>
        {visibleHouses.map((house) => (
          <span className="tag-panel-selected-houses__tag" key={house.id}>
            {house.name}
            <button
              aria-label="Удалить фильтр"
              className="tag-panel-selected-houses__btn-remove"
              onClick={() => onRemoveHouse?.(house.id)}
            >
              <Icon className={cn(closeIcon, "tag-panel-selected-houses__icon-close")} />
            </button>
          </span>
        ))}

        {hasHidden && (
          <div className="tag-panel-selected-houses__more">
            <button
              aria-expanded={isDropdownOpen}
              className="tag-panel-selected-houses__more-btn"
              onClick={toggleDropdown}
              ref={moreButtonRef}
            >
              +{hiddenHouses.length}
            </button>
          </div>
        )}

        {/* Выпадающий список */}

        {hasHidden && (
          <PositionPortal
            anchorRef={moreButtonRef}
            className="tag-panel-selected-houses__portal"
            distanceBetweenElements={8}
            horizontalAlignment={HORIZONTAL_POSITION.RIGHT}
            isOpen={isDropdownOpen}
            onClose={closeDropdown}
          >
            <div className="tag-panel-selected-houses__dropdown">
              {hiddenHouses.map((house) => (
                <span className="tag-panel-selected-houses__tag" key={house.id}>
                  {house.name}
                  <button
                    aria-label="Удалить фильтр"
                    className="tag-panel-selected-houses__btn-remove"
                    onClick={() => onRemoveHouse?.(house.id)}
                  >
                    <Icon className={cn(closeIcon, "tag-panel-selected-houses__icon-close")} />
                  </button>
                </span>
              ))}
            </div>
          </PositionPortal>
        )}
      </Flex>
      <button className="tag-panel-selected-houses__btn-clear" onClick={onClearAll}>
        Очистить всё
      </button>
    </Flex>
  )
}
