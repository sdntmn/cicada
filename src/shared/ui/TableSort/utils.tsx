import React from "react"

import { Column, KeySort, KeysSort, NumberColumns, RowType, SaveOrder, SorterFn, SortType } from "./types"
import { IconSortDown } from "./ui/IconSortDown"
import { IconSortUp } from "./ui/IconSortUp"

export const toggleSort = (orderSort: SortType): SortType => {
  switch (orderSort) {
    case SortType.NONE:
      return SortType.ASCENDING

    case SortType.ASCENDING:
      return SortType.DESCENDING

    case SortType.DESCENDING:
      return SortType.NONE

    default:
      return SortType.NONE
  }
}

export const getKeysNamesColumns = (column: Column<RowType>[]): (keyof RowType)[] => column?.map((item: Column<RowType>) => item.name)

export const sorterFn =
  (currentKey: Column<RowType>): SorterFn<RowType> =>
  (a: RowType, b: RowType): number =>
    Number(a[currentKey?.name] > b[currentKey?.name]) - Number(a[currentKey?.name] < b[currentKey?.name])

export const setKey = (key: Column<RowType>, columnKey?: KeySort<RowType>): KeySort<RowType> => {
  if (Boolean(key) && key.name === columnKey?.name) {
    return updateParametersKey(columnKey)
  } else {
    return updateParametersKey(key)
  }
}

const updateParametersKey = (key: KeySort<RowType> | Column<RowType>): KeySort<RowType> => {
  if ("order" in key) {
    return {
      ...key,
      order: key.order && toggleSort(key?.order),
    }
  } else {
    return {
      ...key,
      order: SortType.ASCENDING,
      sorter: !key.sorter ? sorterFn(key as Column<RowType>) : key.sorter,
    }
  }
}

export const byKey =
  (key: KeySort<RowType>) =>
  (a: RowType, b: RowType): number => {
    if (key && key.sorter) {
      return key.sorter(a, b)
    }

    return 0
  }

export const updateParametersKeys = (key: Column<RowType>, currentKeys?: KeysSort<RowType>): KeysSort<RowType> => {
  let keys: KeysSort<RowType> = {}

  if (currentKeys?.mainKey?.name === key.name && currentKeys?.mainKey?.order === SortType.DESCENDING) {
    return keys
  }

  if (!Boolean(currentKeys?.mainKey) || key.name === currentKeys?.mainKey?.name) {
    if (!currentKeys?.secondKey) {
      keys = {
        mainKey: {
          ...key,
          order: currentKeys?.mainKey?.order ? toggleSort(currentKeys?.mainKey?.order) : SortType.ASCENDING,
          sorter: !key?.sorter ? sorterFn(key) : key?.sorter,
        },
      }
    } else {
      keys = {
        mainKey: {
          ...key,
          order: currentKeys?.mainKey?.order ? toggleSort(currentKeys?.mainKey?.order) : SortType.ASCENDING,
          sorter: !key?.sorter ? sorterFn(key) : key?.sorter,
        },
        secondKey: currentKeys.secondKey,
      }
    }
  } else {
    if (key.name === currentKeys?.secondKey?.name) {
      keys = {
        mainKey: currentKeys?.mainKey,
        secondKey: {
          ...key,
          order: currentKeys?.secondKey?.order ? toggleSort(currentKeys?.secondKey?.order) : SortType.ASCENDING,
          sorter: !key?.sorter ? sorterFn(key) : key?.sorter,
        },
      }
    } else {
      keys = {
        mainKey: currentKeys?.mainKey,
        secondKey: {
          ...key,
          order: SortType.ASCENDING,
          sorter: !key?.sorter ? sorterFn(key) : key?.sorter,
        },
      }
    }
  }

  return keys
}

export const renderIcon = (column: Column<RowType>, columnKey?: KeySort<RowType>): React.ReactNode => {
  if (column?.isSortable) {
    if (column.name === columnKey?.name) {
      switch (columnKey?.order) {
        case SortType.ASCENDING:
          return <IconSortUp isActiveIcon />

        case SortType.DESCENDING:
          return <IconSortDown isActiveIcon />

        default:
          return <IconSortUp />
      }
    } else {
      return <IconSortUp />
    }
  }

  return null
}

const renderIconTwoColumns = (column: Column<RowType>, currentKeys?: KeysSort<RowType>): React.ReactNode => {
  if (column?.isSortable) {
    const mainKey = currentKeys?.mainKey
    const secondKey = currentKeys?.secondKey

    if (column.name === mainKey?.name) {
      return renderIcon(column, mainKey)
    }
    if (column.name === secondKey?.name) {
      return renderIcon(column, secondKey)
    }

    if (column.name !== secondKey?.name || mainKey?.name) {
      return <IconSortUp />
    }
  }
}

export const renderSortIcon = (
  column: Column<RowType>,
  currentKey?: KeySort<RowType>,
  currentKeys?: KeysSort<RowType>,
  sortByNumberColumns?: NumberColumns
) => {
  if (sortByNumberColumns === NumberColumns.TWO) {
    return renderIconTwoColumns(column, currentKeys)
  }
  if (sortByNumberColumns === NumberColumns.ONE) {
    return renderIcon(column, currentKey)
  }
  return null
}

export const byKeys =
  (currentKeys: KeysSort<RowType>) =>
  (a: RowType, b: RowType): number => {
    const main = currentKeys?.mainKey
    const second = currentKeys?.secondKey

    // Сортируем по главному ключу с учётом направления
    if (main?.sorter) {
      let result = main.sorter(a, b)
      if (main.order === SortType.DESCENDING) {
        result = -result
      }

      if (result !== 0) {
        return result
      }
    }

    // Если главный ключ равен — сортируем по второму
    if (second?.sorter) {
      let result = second.sorter(a, b)
      if (second.order === SortType.DESCENDING) {
        result = -result
      }
      return result
    }

    return 0
  }

export const order = (rows: RowType[]): SaveOrder[] =>
  rows?.map((el: RowType, i: number) => ({
    _id: el.id,
    index: i,
  }))

export const restoreOrder = (saveOrder: SaveOrder[], rows: RowType[]): RowType[] =>
  saveOrder.map((el: SaveOrder) => {
    const index: number = rows?.findIndex((row: RowType) => row?.id === el?._id)
    return rows[index]
  })

export const isColumnActive = (
  column: Column<RowType>,
  currentKey?: KeySort<RowType>,
  currentKeys?: KeysSort<RowType>,
  sortByNumberColumns?: NumberColumns
): boolean => {
  if (sortByNumberColumns === NumberColumns.TWO && currentKeys?.mainKey) {
    return currentKeys.mainKey.name === column.name && currentKeys.mainKey.order !== SortType.NONE
  }
  if (sortByNumberColumns === NumberColumns.ONE && currentKey) {
    return currentKey.name === column.name && currentKey.order !== SortType.NONE
  }
  return false
}

// export const sorterFn =
//   (currentKey: Column<RowType>): SorterFn<RowType> =>
//   (a: RowType, b: RowType): number =>
//     Number(a[currentKey?.name] > b[currentKey?.name]) - Number(a[currentKey?.name] < b[currentKey?.name])

// // export const setKey = (key: Column<RowType>, columnKey?: KeySort<RowType>): KeySort<RowType> => {
// //   if (Boolean(key) && key.name === columnKey?.name) {
// //     return updateParametersKey(columnKey)
// //   } else {
// //     return updateParametersKey(key)
// //   }
// // }

// const defaultSorter =
//   <T extends RowType>(key: keyof T) =>
//   (a: T, b: T): number => {
//     const valA = a[key]
//     const valB = b[key]

//     // Числовое сравнение, если оба — числа (или строки-числа)
//     const numA = Number(valA)
//     const numB = Number(valB)

//     const isNumA = !isNaN(numA) && valA != null && valA !== ""
//     const isNumB = !isNaN(numB) && valB != null && valB !== ""

//     if (isNumA && isNumB) {
//       return numA - numB
//     }

//     // Иначе — строковое сравнение
//     return String(valA).localeCompare(String(valB))
//   }

// export const setKey = <T extends RowType>(column: Column<T>, currentKey?: KeySort<T>): KeySort<T> => {
//   // Определяем новое направление
//   const nextOrder =
//     currentKey?.name === column.name && currentKey.order === SortType.ASCENDING ? SortType.DESCENDING : SortType.ASCENDING

//   // Берём кастомный sorter или создаём fallback
//   const sorter = column.sorter ? column.sorter : defaultSorter(column.name)

//   return {
//     name: column.name,
//     order: nextOrder,
//     sorter,
//   }
// }
