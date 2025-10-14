export interface Contact<T> {
  confirmed: boolean
  oid: T
}

export interface Mobile extends Contact<number> {
  __brand: "mobile"
}

export interface Email extends Contact<string> {
  __brand: "email"
}
