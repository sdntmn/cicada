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

export interface DataColumn<T> {
  align?: TextAlign
  icon?: React.ReactNode
  isFilterable?: boolean
  isSortable: boolean
  name: keyof T
  render?: (value: T[keyof T], rowData: T, rowIndex: number) => React.ReactNode
  sorter?: SorterFn<T>
  title: string
  type: "data"
}

export interface VirtualColumn<T = any> {
  align?: TextAlign
  icon?: React.ReactNode
  isFilterable?: true
  name: string
  render?: (rowData: T, rowIndex: number) => React.ReactNode
  title: string
  type: "virtual"
}

export type Column<T> = VirtualColumn<T> | DataColumn<T>

export interface KeySort<T> {
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
