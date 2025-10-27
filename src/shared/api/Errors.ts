import { APIERROR_DEFAULT_CODE, APIERROR_DEFAULT_DESCRIPTION, APIERROR_DEFAULT_ERROR } from "./constants"

export class APIError extends Error {
  code: number
  description: string
  error: Error
  constructor(message: string)
  constructor(message: string, error: Error)
  constructor(message: string, error: Error, code: number)
  constructor(message: string, error: Error, code: number, description: string)
  constructor(
    message: string,
    error: Error = APIERROR_DEFAULT_ERROR,
    code: number = APIERROR_DEFAULT_CODE,
    description: string = APIERROR_DEFAULT_DESCRIPTION
  ) {
    super()
    this.message = message
    this.error = error || APIERROR_DEFAULT_ERROR
    this.code = code || APIERROR_DEFAULT_CODE
    this.description = description === "" ? APIERROR_DEFAULT_DESCRIPTION : description
  }
}
