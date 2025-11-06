import React from "react"

import { sortedLargestToSmall, sortedSmallToLargest } from "@/shared/constants"
import { Icon } from "@/shared/ui/Icon"

import { Column, DataColumn, KeySort, KeysSort, NumberColumns, RowType, SaveOrder, SorterFn, SortType } from "../../types/table"

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

export const getKeysNamesColumns = <T extends RowType>(columns: Column<T>[]): (keyof T)[] =>
  columns.filter((col): col is DataColumn<T> => col.type === "data").map((col) => col.name)

export const sorterFn =
  <T extends RowType>(currentKey: DataColumn<T>): SorterFn<T> =>
  (a, b) => {
    const valA = a[currentKey.name]
    const valB = b[currentKey.name]

    if (typeof valA === "string" && typeof valB === "string") {
      return valA.localeCompare(valB)
    }
    if (valA < valB) {
      return -1
    }
    if (valA > valB) {
      return 1
    }
    return 0
  }

export const setKey = <T extends RowType>(column: Column<T>, columnKey?: KeySort<T>): KeySort<T> => {
  if (column.type === "virtual") {
    return columnKey ?? { name: "id" as keyof T, order: SortType.NONE, sorter: () => 0 }
  }

  if (column.name === columnKey?.name) {
    return updateParametersKey(columnKey)
  } else {
    return updateParametersKey(column)
  }
}

const updateParametersKey = <T extends RowType>(key: KeySort<T> | Column<T>): KeySort<T> => {
  if ("order" in key) {
    return {
      ...key,
      order: key.order ? toggleSort(key.order) : SortType.NONE,
    }
  }

  if (key.type === "virtual") {
    throw new Error("Невозможно сортировать по виртуальному столбцу")
  }

  return {
    name: key.name,
    order: SortType.ASCENDING,
    sorter: key.sorter ?? sorterFn(key),
  }
}

export const byKey =
  <T extends RowType>(key: KeySort<T>) =>
  (a: T, b: T): number => {
    if (key && key.sorter) {
      return key.sorter(a, b)
    }

    return 0
  }

export const updateParametersKeys = <T extends RowType>(key: Column<T>, currentKeys?: KeysSort<T>): KeysSort<T> => {
  if (key.type === "virtual") {
    return currentKeys ?? {}
  }

  let keys: KeysSort<T> = {}

  if (currentKeys?.mainKey?.name === key.name && currentKeys?.mainKey?.order === SortType.DESCENDING) {
    return keys
  }

  if (!currentKeys?.mainKey || key.name === currentKeys.mainKey.name) {
    if (!currentKeys?.secondKey) {
      keys = {
        mainKey: {
          name: key.name,
          order: currentKeys?.mainKey?.order ? toggleSort(currentKeys.mainKey.order) : SortType.ASCENDING,
          sorter: key.sorter ?? sorterFn(key),
        },
      }
    } else {
      keys = {
        mainKey: {
          name: key.name,
          order: currentKeys?.mainKey?.order ? toggleSort(currentKeys.mainKey.order) : SortType.ASCENDING,
          sorter: key.sorter ?? sorterFn(key),
        },
        secondKey: currentKeys.secondKey,
      }
    }
  } else {
    if (key.name === currentKeys?.secondKey?.name) {
      keys = {
        mainKey: currentKeys.mainKey,
        secondKey: {
          name: key.name,
          order: currentKeys?.secondKey?.order ? toggleSort(currentKeys.secondKey.order) : SortType.ASCENDING,
          sorter: key.sorter ?? sorterFn(key),
        },
      }
    } else {
      keys = {
        mainKey: currentKeys?.mainKey,
        secondKey: {
          name: key.name,
          order: SortType.ASCENDING,
          sorter: key.sorter ?? sorterFn(key),
        },
      }
    }
  }

  return keys
}

export const renderIcon = <T extends RowType>(column: Column<T>, columnKey?: KeySort<T>): React.ReactNode => {
  if (column.type === "data" && column.isSortable) {
    if (column?.isSortable) {
      if (column.name === columnKey?.name) {
        switch (columnKey?.order) {
          case SortType.ASCENDING:
            return <Icon className={sortedSmallToLargest} isActive />
          case SortType.DESCENDING:
            return <Icon className={sortedLargestToSmall} isActive />
          default:
            return <Icon className={sortedSmallToLargest} />
        }
      } else {
        return <Icon className={sortedSmallToLargest} />
      }
    }
  }
  return null
}

export const renderIconTwoColumns = <T extends RowType>(column: Column<T>, currentKeys?: KeysSort<T>): React.ReactNode => {
  if (column.type === "data" && column.isSortable) {
    const mainKey = currentKeys?.mainKey
    const secondKey = currentKeys?.secondKey

    if (column.name === mainKey?.name) {
      return renderIcon(column, mainKey)
    }
    if (column.name === secondKey?.name) {
      return renderIcon(column, secondKey)
    }
    return <Icon className={sortedSmallToLargest} />
  }

  return null
}

export const renderSortIcon = <T extends RowType>(
  column: Column<T>,
  currentKey?: KeySort<T>,
  currentKeys?: KeysSort<T>,
  sortByNumberColumns?: NumberColumns
): React.ReactNode => {
  if (sortByNumberColumns === NumberColumns.TWO) {
    return renderIconTwoColumns(column, currentKeys)
  }
  if (sortByNumberColumns === NumberColumns.ONE) {
    return renderIcon(column, currentKey)
  }
  return null
}

export const byKeys =
  <T extends RowType>(currentKeys: KeysSort<T>) =>
  (a: T, b: T): number => {
    const main = currentKeys?.mainKey
    const second = currentKeys?.secondKey

    if (main?.sorter) {
      let result = main.sorter(a, b)
      if (main.order === SortType.DESCENDING) {
        result = -result
      }
      if (result !== 0) {
        return result
      }
    }

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

export const isColumnActive = <T extends RowType>(
  column: Column<T>,
  currentKey?: KeySort<T>,
  currentKeys?: KeysSort<T>,
  sortByNumberColumns?: NumberColumns
): boolean => {
  if (column.type !== "data") {
    return false
  }

  if (sortByNumberColumns === NumberColumns.TWO && currentKeys?.mainKey) {
    return currentKeys.mainKey.name === column.name && currentKeys.mainKey.order !== SortType.NONE
  }
  if (sortByNumberColumns === NumberColumns.ONE && currentKey) {
    return currentKey.name === column.name && currentKey.order !== SortType.NONE
  }
  return false
}
