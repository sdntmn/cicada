// Базовые (реальные поля в данных)
export enum BaseColumnKey {
  ADDRESS = "address",
  DEBT = "debt",
  PENALTY = "penalty",
  TERM_DEBT = "debt-term-mounts",
}

export enum VirtualColumnInitialDataTableKey {
  ACTION = "action",
  DEBTS = "debts",
  DOCUMENTS = "documents",
  DEBTOR = "debtor",
  PREMISES_DATA = "premisesData",
  STAGE = "stage",
}

export enum BaseColumnInitialDataTableKey {
  INDEX = "rowIndex",
  TERM_DEBT = "debt-term-mounts",
}
