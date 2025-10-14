import React from "react"

import { ConfigProvider } from "itpc-ui-kit"
import "itpc-ui-kit/dist/index.css"
import { createRoot } from "react-dom/client"

import { App } from "./app/App"
import { StoreProvider } from "./app/providers/StoreProvider"

const container = document.getElementById("root")

const root = createRoot(container ?? document.body)
root.render(
  <StoreProvider>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </StoreProvider>
)
