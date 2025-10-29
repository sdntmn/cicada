export enum Menu {
  archive = "archive",
  cardIndex = "cardIndex",
  court = "court",
  dashboard = "dashboard",
  expertise = "expertise",
  monitoring = "monitoring",
}

export enum RowDensity {
  LARGE = "large",
  MEDIUM = "medium",
  SMALL = "small",
  X_LARGE = "xLarge",
}

export type FontSize = "normal" | "xlarge" | "small" | "large"

export enum MenuName {
  archive = "Архив",
  cardIndex = "Поиск",
  court = "Судебные",
  dashboard = "Дашборд",
  expertise = "Досудебка",
  monitoring = "Исполнительные",
}

export enum SelectedSearch {
  ACCOUNT = "Лицевой счет",
  ADDRESS = "Адрес",
  LIST_HOUSES = "Список домов",
}

export enum StatusDebtor {
  NEW = "Новый",
  PROCESS = "Процесс",
}

export enum StageName {
  END = "Последняя",
  START = "Первая стадия",
}

export type PositionType = "absolute" | "fixed"

export enum ALLOWED_POSITIONS {
  ABSOLUTE = "absolute",
  FIXED = "fixed",
}

export interface DocumentDimensions {
  documentHeight: number
  documentWidth: number
}

export interface ParentDimensions {
  parentBottom: number
  parentHeight: number
  parentLeft: number
  parentTop: number
  parentWidth: number
}

export interface ElementDimensions {
  elementHeight: number
  elementWidth: number
}

export enum HORIZONTAL_POSITION {
  CALCULATED = "calculated",
  CENTER = "center",
  LEFT = "left",
  RIGHT = "right",
}

export enum VERTICAL_POSITION {
  BOTTOM = "bottom",
  TOP = "top",
}

export interface GetHorizontalPositionArg {
  defaultParentWidth?: number
  distanceRight: number
  documentWidth: number
  elementWidth: number
  parentLeft: number
  parentWidth: number
  scrollbarWidth: number
}
