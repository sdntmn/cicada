import { createContext } from "react"

export interface RowContextState {
  gap?: [number, number] | number
}

export const RowContext = createContext<RowContextState>({})
