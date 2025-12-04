export enum Menu {
  archive = "archive",
  case = "case",
  caseDetail = "caseDetail",
  court = "court",
  dashboard = "dashboard",
  debtorDetail = "debtorDetail",
  debtors = "debtors",
  monitoring = "monitoring",
  preparation = "preparation",
  selection = "selection",
}

export enum DetailType {
  CASE = "case",
  DEBTOR = "debtor",
  DOCUMENT = "document",
}

export enum ViewType {
  DETAIL = "detail",
  MAIN = "main",
}

export enum RowDensity {
  LARGE = "large",
  MEDIUM = "medium",
  SMALL = "small",
  X_LARGE = "xLarge",
}

export enum MenuName {
  archive = "Архив",
  court = "Суд",
  dashboard = "Дашборд",
  debtors = "Должники",
  monitoring = "Исполнение",
  preparation = "Подготовка", // Формирование
  selection = "Отбор", // Кандидаты
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
  ANALYSIS = "Анализ и сбор данных",
  CLAIM = "Претензия",
  COURT = "Судебное производство",
  PRE_TRIAL = "Подготовка к суду",
  SETTLEMENT = "Урегулирование",
}

export enum ALLOWED_POSITIONS {
  ABSOLUTE = "absolute",
  FIXED = "fixed",
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
  CENTER = "center",
  TOP = "top",
}

export enum DebtStage {
  CANDIDATE = "candidate",
  CLAIM = "claim",
  NEW = "new",
}

export enum BaseColumnKey {
  INDEX = "index",
}
