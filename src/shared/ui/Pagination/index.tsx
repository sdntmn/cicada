import React, { FC, HTMLAttributes, useEffect, useMemo, useState } from "react"

import cn from "classnames"

import { IconArrow } from "../IconArrow"
import { IconDoubleArrow } from "../IconDoubleArrow"

import "./styles.scss"

export interface PaginationResult {
  currentPage?: number
  end: number
  start: number
}

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** Результат пагинации */
  callback: (pagination: PaginationResult) => void
  /** Дополнительный класс */
  className?: string
  /** Длина массива, данные которого необходимо разделить */
  dataLength: number
  /** Количество элементов на странице */
  step?: number
}

export const Pagination: FC<Props> = ({ callback, className = "", dataLength, step = 10, ...rest }) => {
  const totalPages = useMemo(() => Math.max(1, Math.ceil(dataLength / step)), [dataLength, step])
  const [currentPage, setCurrentPage] = useState(1)

  // Сбрасываем на первую страницу, если текущая вышла за пределы
  useEffect(() => {
    if (currentPage > totalPages) {
      goToPage(1)
    }
  }, [totalPages, currentPage])

  const goToPage = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(newPage)

    const start = (newPage - 1) * step
    const end = Math.min(newPage * step, dataLength)

    callback({
      currentPage: newPage,
      end,
      start,
    })
  }

  const prev = () => goToPage(currentPage - 1)
  const next = () => goToPage(currentPage + 1)
  const start = () => goToPage(1)
  const end = () => goToPage(totalPages)

  // Логика среза для отображения только части страниц
  const getVisiblePages = (): number[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5]
    }

    if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
  }

  const visiblePages = getVisiblePages()

  // Нет данных — не рендерим пагинацию
  if (dataLength === 0) {
    return null
  }

  return (
    <div {...rest} className={cn("itpc-pagination", className)}>
      <button
        aria-label="Первая страница"
        className="itpc-pagination__btn itpc-pagination__btn_left"
        disabled={currentPage === 1}
        onClick={start}
        type="button"
      >
        <IconDoubleArrow orientation="left" />
      </button>

      <button
        aria-label="Предыдущая страница"
        className="itpc-pagination__btn itpc-pagination__btn_left"
        disabled={currentPage === 1}
        onClick={prev}
        type="button"
      >
        <IconArrow orientation="left" />
      </button>

      <div className="itpc-pagination__pages">
        {visiblePages.map((page) => (
          <button
            className={cn(
              "itpc-pagination__btn",
              "itpc-pagination__btn_page",
              currentPage === page && "itpc-pagination__btn_page_active"
            )}
            aria-label={`Страница ${page}`}
            key={page}
            onClick={() => goToPage(page)}
            type="button"
          >
            {page}
          </button>
        ))}

        {/* Троеточие и последняя страница, если нужно */}
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <>
            <span className="itpc-pagination__text">...</span>
            <button
              className={cn(
                "itpc-pagination__btn",
                "itpc-pagination__btn_page",
                currentPage === totalPages && "itpc-pagination__btn_page_active"
              )}
              aria-label={`Страница ${totalPages}`}
              onClick={() => goToPage(totalPages)}
              type="button"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        aria-label="Следующая страница"
        className="itpc-pagination__btn itpc-pagination__btn_right"
        disabled={currentPage === totalPages}
        onClick={next}
        type="button"
      >
        <IconArrow orientation="right" />
      </button>

      <button
        aria-label="Последняя страница"
        className="itpc-pagination__btn itpc-pagination__btn_right"
        disabled={currentPage === totalPages}
        onClick={end}
        type="button"
      >
        <IconDoubleArrow orientation="right" />
      </button>
    </div>
  )
}
