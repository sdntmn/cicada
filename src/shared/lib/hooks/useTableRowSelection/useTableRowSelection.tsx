import { useEffect, useState } from "react"

/**
 * Позволяет управлять выбором строк в таблице с поддержкой единичного, множественного выбора и "выделить всё".
 * Автоматически синхронизирует выбранные строки при обновлении списка данных (например, фильтрации или пагинации),
 * удаляя из состояния выбора ID, которых больше нет в переданных строках.
 *
 * @template T - Тип объекта строки. Должен содержать обязательное поле `id: string`.
 *
 * @param {T[]} rows - Массив строк таблицы. Используется для:
 *   - Синхронизации выбранного состояния при изменении данных
 *   - Реализации функции "выделить всё"
 *
 * @returns {Object} Объект с состоянием и обработчиками выбора строк
 * @returns {Set<string>} returns.selectedRow - Набор ID выбранных строк
 * @returns {(id: string, checked: boolean) => void} returns.handleRowSelect - Функция для выбора/снятия выбора с одной строки
 * @returns {(checked: boolean) => void} returns.handleSelectAll - Функция для выбора всех строк (`true`) или снятия выделения (`false`)
 * @returns {() => void} returns.clearSelection - Функция для полной очистки выбора
 *
 * @example
 * type RowData = { id: string; name: string; email: string }
 *
 * const rows: RowData[] = [{ id: "1", name: "Иван", email: "ivan@example.com" }]
 *
 * const { selectedRow, handleRowSelect, handleSelectAll, clearSelection } = useTableRowSelection<RowData>(rows)
 *
 * // В компоненте:
 * <TableRow onClick={() => handleRowSelect(row.id, !isSelected)}>
 *   <TableCell>
 *     <Checkbox checked={selectedRow.has(row.id)} />
 *   </TableCell>
 * </TableRow>
 */

export const useTableRowSelection = <T extends { id: string }>(rows: T[]) => {
  const [selectedRow, setSelectedRow] = useState<Set<string>>(new Set())

  const clearSelection = () => {
    setSelectedRow(new Set())
  }

  const handleRowSelect = (id: string, checked: boolean) => {
    setSelectedRow((prev) => {
      const newSet = new Set(prev)
      if (checked) {
        newSet.add(id)
      } else {
        newSet.delete(id)
      }
      return newSet
    })
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = rows.map((row) => row.id)
      setSelectedRow(new Set(allIds))
    } else {
      clearSelection()
    }
  }

  useEffect(() => {
    const rowIds = new Set(rows.map((row) => row.id))
    setSelectedRow((prev) => {
      const synced = new Set<string>()
      prev.forEach((id) => {
        if (rowIds.has(id)) {
          synced.add(id)
        }
      })
      return synced
    })
  }, [rows])

  return {
    clearSelection,
    handleRowSelect,
    handleSelectAll,
    selectedRow,
  }
}
