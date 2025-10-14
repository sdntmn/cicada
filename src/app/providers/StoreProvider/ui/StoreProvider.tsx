import React, { FC } from "react"

import { Provider } from "react-redux"

import { store } from "@/shared/lib/store"

interface Props {
  children: React.ReactNode
}

export const StoreProvider: FC<Props> = ({ children }) => <Provider store={store}>{children}</Provider>
