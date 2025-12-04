import { useMemo, useState } from "react"

/**
 * Позволяет управлять видимостью и порядком колонок в таблице с поддержкой обязательных колонок.
 *
 * @template C - Тип обязательных (базовых) колонок. Должен быть строковым литералом.
 * @template V - Тип дополнительных (кастомных) колонок. По умолчанию совпадает с C.
 *
 * @param {Object} config - Конфигурация колонок таблицы
 * @param {(C | V)[]} config.defaultVisible - Список колонок, видимых по умолчанию
 * @param {(C | V)[]} config.displayOrder - Порядок отображения всех колонок (включая скрытые)
 * @param {Set<C | V>} config.requiredColumns - Множество обязательных колонок, которые нельзя скрыть
 *
 * @returns {Object} Объект с состоянием и контроллерами колонок
 * @returns {Set<C | V>} returns.selectedColumns - Текущий набор выбранных (видимых + обязательные) колонок
 * @returns {(C | V)[]} returns.visibleColumns - Массив колонок, отсортированный по displayOrder, только видимые
 * @returns {(newSelected: Set<C | V>) => void} returns.handleChangeVisibleColumns - Функция обновления выбранных колонок.
 *   Гарантирует, что обязательные колонки всегда останутся в наборе.
 *
 * @example
 * type BaseColumn = 'id' | 'name' | 'status'
 * type CustomColumn = `custom_${string}`
 *
 * const { visibleColumns, handleChangeVisibleColumns } = useTableColumns<BaseColumn, CustomColumn>({
 *   defaultVisible: ['id', 'name'],
 *   displayOrder: ['id', 'name', 'status', 'custom_field1'],
 *   requiredColumns: new Set(['id'])
 * })
 */

interface TableColumnsConfig<C extends string, V extends string = string> {
  defaultVisible: (C | V)[]
  displayOrder: (C | V)[]
  requiredColumns: Set<C | V>
  storageKey?: string
}

export const useTableColumns = <C extends string, V extends string = string>(config: TableColumnsConfig<C, V>) => {
  const { defaultVisible, displayOrder, requiredColumns } = config

  const [selectedColumns, setSelectedColumns] = useState<Set<C | V>>(() => {
    const initial = new Set(defaultVisible)
    requiredColumns.forEach((col) => initial.add(col))
    return initial
  })

  const visibleColumns = useMemo(() => displayOrder.filter((col) => selectedColumns.has(col)), [selectedColumns, displayOrder])

  const handleChangeVisibleColumns = (newSelected: Set<C | V>) => {
    const finalSet = new Set(newSelected)
    requiredColumns.forEach((col) => finalSet.add(col))
    setSelectedColumns(finalSet)
  }

  return {
    handleChangeVisibleColumns,
    selectedColumns,
    visibleColumns,
  }
}
