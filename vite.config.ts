import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  base: "/cicada/",
  define: {
    __API__: JSON.stringify("http://localhost:8080"),
    __IS_DEV__: JSON.stringify(true),
  },
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "shared", replacement: "/src/shared" },
      { find: "widgets", replacement: "/src/widgets" },
    ],
  },
})
