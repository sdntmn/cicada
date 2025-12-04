import React, { useEffect, useState } from "react"

import cn from "classnames"

import { searchIcon } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon"
import { Tooltip } from "@/shared/ui/Tooltip"

import { GlobalSearchModal } from "../GlobalSearchModal/GlobalSearchModal"

import "./styles.scss"

export const GlobalSearch = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const openSearch = () => {
    setIsSearchOpen(true)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Проверяем, что это именно Ctrl/Cmd + K, а не другие комбинации
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K" || e.keyCode === 75)) {
        // Более агрессивное предотвращение
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()

        // Небольшая задержка для надежности
        setTimeout(() => {
          openSearch()
        }, 0)

        return false
      }
    }

    // Вешаем обработчик на phase capturing
    document.addEventListener("keydown", handleKeyDown, {
      capture: true,
    })

    return () => {
      document.removeEventListener("keydown", handleKeyDown, {
        capture: true,
      })
    }
  }, [])

  return (
    <>
      <Tooltip content="Поиск по делам и должникам (Ctrl+K)" disabled={isSearchOpen} position="bottom">
        <button
          aria-label="Глобальный поиск"
          className="global-search__btn"
          // title="Поиск по делам и должникам (Ctrl+K)"

          onClick={openSearch}
          type="button"
        >
          <Icon className={cn("global-search__icon", searchIcon)} />
          {/* <span className="global-search__placeholder">Найти дело или должника...</span> */}
          <span className="global-search__placeholder">Поиск</span>
          <span className="global-search__shortcut">Ctrl+K</span>
        </button>
      </Tooltip>
      {isSearchOpen && <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
    </>
  )
}

// Поиск начинается после 3+ символов.
// Максимум 6–8 результатов (по 3–4 на тип).
// ESC или клик вне поля → закрытие.
// Enter → переход к первому результату или на страницу
