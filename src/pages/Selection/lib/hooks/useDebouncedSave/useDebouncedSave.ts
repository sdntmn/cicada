// lib/hooks/useDebouncedSave.ts
import { useCallback, useRef } from "react"

export const useDebouncedSave = (saveFunction: (query: any) => void, delay: number = 1000) => {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const lastQueryRef = useRef<string>("")

  const debouncedSave = useCallback(
    (query: any) => {
      const queryString = JSON.stringify(query)

      // Пропускаем сохранение если запрос не изменился
      if (lastQueryRef.current === queryString) {
        return
      }

      lastQueryRef.current = queryString

      // Очищаем предыдущий таймаут
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Устанавливаем новый таймаут
      timeoutRef.current = setTimeout(() => {
        saveFunction(query)
      }, delay)
    },
    [saveFunction, delay]
  )

  return debouncedSave
}
