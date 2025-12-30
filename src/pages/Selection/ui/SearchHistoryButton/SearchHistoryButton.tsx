import React, { useRef, useState } from "react"

import cn from "classnames"

import { FilterMode } from "@/shared/api/DebtorApi"
import { cityIcon, filterIcon, historyIcon, repeatIcon, searchIcon } from "@/shared/constants"
import { useAppSelector } from "@/shared/lib/store"
import { Badge } from "@/shared/ui/Badge/ui/Badge"
import { Button } from "@/shared/ui/Button"
import { Dropdown } from "@/shared/ui/Dropdown"
import { Icon } from "@/shared/ui/Icon"
import { Tooltip } from "@/shared/ui/Tooltip"

import { formatDate } from "../../lib/helpers/formatDate/formatDate"
import { useSearchHistory } from "../../lib/hooks/useSearchHistory/useSearchHistory"
import { AddressTooltipContent } from "../AddressTooltipContent/AddressTooltipContent"

import "./styles.scss"

export const SearchHistoryButton: React.FC = () => {
  const { isLoading, premises } = useAppSelector((state) => state.premises)
  const { history, loadQuery } = useSearchHistory()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleItemClick = (query: any) => {
    loadQuery(query)
    setIsOpen(false)
  }

  // const clearHistory = () => {
  //   if (window.confirm("Вы уверены, что хотите очистить историю поиска?")) {
  //     localStorage.removeItem("searchHistory")
  //   }
  // }

  return (
    <div className="search-history">
      <Button
        icon={
          <>
            <Icon className={cn(historyIcon, "search-history__btn-icon-history")} />
            <Icon
              className={cn(
                searchIcon,
                "search-history__btn-icon-search fa-flip-horizontal",
                isOpen && "search-history__btn-icon-search_active search-history__btn_active"
              )}
            />
          </>
        }
        active={isOpen}
        aria-label="История поиска"
        className={cn("search-history__btn search-history__btn-icon", isOpen && "search-history__btn_active")}
        disabled={isLoading || !premises.length}
        onClick={() => setIsOpen(!isOpen)}
        ref={buttonRef}
        variant="icon"
      />

      <Dropdown
        anchorRef={buttonRef}
        className="search-history__content"
        distanceBetweenElements={4}
        header={"История поиска"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {history.length === 0 ? (
          <div className="search-history__empty">История поиска пока пуста</div>
        ) : (
          <div className="search-history__list">
            {history.map((query) => {
              // === Фильтры (как раньше) ===
              const filterParts = []
              if (query.minDebt) {
                filterParts.push(`долг ≥ ${query.minDebt}`)
              }
              if (query.minTerm) {
                filterParts.push(`срок ≥ ${query.minTerm}`)
              }

              return (
                <div
                  aria-label={`Применить поиск от ${formatDate(new Date(query.timestamp))}`}
                  className="search-history__item"
                  key={query.timestamp}
                  onClick={() => handleItemClick(query)}
                  role="menuitem"
                >
                  {/* === Строка 1: Адреса как теги === */}
                  <div className="search-history__item-houses">
                    <Icon className={cn(cityIcon, "search-history__icon")} />
                    {query.previewAddresses && query.previewAddresses.length > 0 ? (
                      <>
                        {/* Показываем первые 2 адреса как теги */}
                        {query.previewAddresses.slice(0, 2).map((addr: string, index: number) => (
                          <Badge key={index} size="sm">
                            {addr}
                          </Badge>
                        ))}

                        {/* Если больше 2 — показываем +N с тултипом */}
                        {query.previewAddresses.length > 2 && (
                          <Tooltip
                            className="search-history__tooltip"
                            content={<AddressTooltipContent addresses={query.previewAddresses} maxInTooltip={20} visibleCount={2} />}
                            delay={300}
                            position="right"
                          >
                            <Badge size="sm" variant="overflow">
                              +{query.previewAddresses.length - 2}
                            </Badge>
                          </Tooltip>
                        )}
                      </>
                    ) : query.houseIds?.length ? (
                      <Badge size="sm">{query.houseIds.length} дом(ов)</Badge>
                    ) : (
                      <Badge size="sm">Все дома</Badge>
                    )}
                  </div>

                  {/* Строка 2: Фильтры */}
                  {(query.minDebt || query.minTerm) && (
                    <div className="search-history__item-filters">
                      <Icon className={cn(filterIcon, "search-history__icon search-history__icon-filters")} />
                      {query.minDebt && <Badge size="sm">долг ≥ {query.minDebt}</Badge>}
                      {query.filterMode && <Badge size="sm">{query.filterMode === FilterMode.ANY ? "или" : "и"}</Badge>}
                      {query.minTerm && <Badge size="sm">срок ≥ {query.minTerm}</Badge>}
                    </div>
                  )}

                  {/* Строка 3: Дата */}
                  <div className="search-history__item-footer">
                    <span>{formatDate(new Date(query.timestamp))}</span>
                    <span className="search-history__item-footer-repeat">
                      <Icon className={cn(repeatIcon, "search-history__item-footer-icon")} /> Повторить
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Dropdown>
    </div>
  )
}
