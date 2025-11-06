// src/shared/lib/utils/filterRows.ts

/**
 * Фильтрует массив объектов по заданным критериям.
 *
 * @param rows - Массив данных для фильтрации
 * @param filters - Объект с фильтрами вида { columnName: filterValue }
 * @returns Отфильтрованный массив
 */
export const filterRows = <T extends Record<string, any>>(rows: T[], filters: Partial<Record<keyof T, string>>): T[] => {
  // Если нет фильтров — возвращаем все строки
  if (Object.keys(filters).length === 0) {
    return rows
  }

  // Фильтруем строки
  return rows.filter((row) =>
    // Проверяем, что строка удовлетворяет ВСЕМ фильтрам
    Object.entries(filters).every(([column, filterValue]) => {
      // Получаем значение поля из строки
      const rowValue = String(row[column as keyof T] ?? "")

      // Проверяем, содержит ли значение подстроку (регистронезависимо)
      return rowValue.toLowerCase().includes(filterValue.toLowerCase())
    })
  )
}
