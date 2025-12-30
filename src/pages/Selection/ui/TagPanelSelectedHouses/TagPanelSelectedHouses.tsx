// TagPanelSelectedHouses.tsx
import React, { useEffect, useMemo, useRef, useState } from "react"

import cn from "classnames"

import { HORIZONTAL_POSITION, sortAscIcon, sortDescIcon } from "@/shared/constants"
import type { PremisesOption } from "@/shared/lib/types/types"
import { Button } from "@/shared/ui/Button"
import { Dropdown } from "@/shared/ui/Dropdown"
import { Icon } from "@/shared/ui/Icon/ui/Icon"
import { Flex } from "@/shared/ui/layout/Flex" // 👈 подключили

import { Chip } from "@/shared/ui/Chip"

import "./styles.scss"

interface Props {
  onClearAll?: () => void
  onRemoveHouse?: (houseId: string) => void
  selectedHouses?: PremisesOption[]
}

type SortOrder = "desc" | "asc" | null

export const TagPanelSelectedHouses: React.FC<Props> = ({ onClearAll, onRemoveHouse, selectedHouses = [] }) => {
  const moreButtonRef = useRef<HTMLButtonElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)

  const VISIBLE_TAGS_LIMIT = 2
  const visibleHouses = selectedHouses.slice(0, VISIBLE_TAGS_LIMIT)
  const hiddenHouses = selectedHouses.slice(VISIBLE_TAGS_LIMIT)
  const hasHidden = hiddenHouses.length > 0

  const sortedHiddenHouses = useMemo(() => {
    if (sortOrder === null) {
      return hiddenHouses
    }
    return [...hiddenHouses].sort((a, b) => (sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))
  }, [hiddenHouses, sortOrder])

  const toggleSortOrder = () => {
    setSortOrder((prev) => {
      if (prev === null) {
        return "asc"
      }
      if (prev === "asc") {
        return "desc"
      }
      return null
    })
  }

  // Закрываем выпадашку, если скрытых адресов больше нет
  useEffect(() => {
    if (isDropdownOpen && !hasHidden) {
      setIsDropdownOpen(false)
    }
  }, [hasHidden, isDropdownOpen])

  const headerDropdown = (
    <Flex className="tag-panel-selected-houses__header" gap={32} justify="space-between">
      <span>Выбранные адреса </span>
      <Button
        aria-label={
          sortOrder === null ? "Сортировать по возрастанию" : sortOrder === "asc" ? "Сортировать по убыванию" : "Отключить сортировку"
        }
        onClick={(e) => {
          e.stopPropagation()
          toggleSortOrder()
        }}
        className={cn("tag-panel-selected-houses__btn-sort", sortOrder !== null && "tag-panel-selected-houses__btn-sort_active")}
        icon={<Icon className={sortOrder === null ? sortAscIcon : sortOrder === "asc" ? sortAscIcon : sortDescIcon} />}
        size="sm"
        variant="icon"
      />
    </Flex>
  )

  if (!selectedHouses.length) {
    return null
  }

  return (
    <Flex align="flex-start" className="tag-panel-selected-houses" gap={8}>
      <Flex className="tag-panel-selected-houses__tag-wrap" gap={8}>
        {visibleHouses.map((house) => (
          <Chip key={house.id} onRemove={() => onRemoveHouse?.(house.id)} size="lg">
            {house.name}
          </Chip>
        ))}

        {hasHidden && (
          <div className="tag-panel-selected-houses__more">
            <Button
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              ref={moreButtonRef}
              size="lg"
              variant="chip"
            >
              +{hiddenHouses.length}
            </Button>
          </div>
        )}

        {hasHidden && (
          <Dropdown
            anchorRef={moreButtonRef}
            distanceBetweenElements={4}
            header={headerDropdown}
            horizontalAlignment={HORIZONTAL_POSITION.RIGHT}
            isOpen={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
          >
            <div className="tag-panel-selected-houses__list">
              {sortedHiddenHouses.map((house) => (
                <Chip key={house.id} onRemove={() => onRemoveHouse?.(house.id)} size="md">
                  {house.name}
                </Chip>
              ))}
            </div>
          </Dropdown>
        )}
      </Flex>

      <Button className="tag-panel-selected-houses__btn-clear" onClick={onClearAll} size="sm" variant="text">
        Очистить всё
      </Button>
    </Flex>
  )
}
