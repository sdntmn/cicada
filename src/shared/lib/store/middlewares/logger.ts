import { Action, Middleware } from "redux"

declare let DEBUG: boolean

export const logger: Middleware =
  ({ getState }) =>
  (next) =>
  (action: Action): Action => {
    try {
      if (DEBUG) {
        console.log("[redux] Do", action, "on state", getState())
      }
    } catch (error) {
      if (!(error instanceof ReferenceError)) {
        throw error
      }
    }
    return next(action) as Action
  }
