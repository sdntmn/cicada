export enum SortType {
  ASCENDING = "ascending",
  DESCENDING = "descending",
  NONE = "none",
}

export type RowType<T = object> = {
  [key in keyof T]: T[key]
} & {
  id: string
}

export type SorterFn<T> = (a: T, b: T) => number

export type TextAlign = "center" | "right" | "left"

export interface Column<T> {
  align?: TextAlign
  icon?: React.ReactNode
  isSortable: boolean
  name: keyof T
  sorter?: SorterFn<T>
  title: string
}

export interface KeySort<T> {
  // isSortable: boolean
  name: keyof T
  order: SortType
  sorter: SorterFn<T>
}

export interface KeysSort<T> {
  mainKey?: KeySort<T>
  secondKey?: KeySort<T>
}

export interface SaveOrder {
  _id: string
  index: number
}

export enum NumberColumns {
  ONE = "one",
  TWO = "two",
  ZERO = "zero",
}
