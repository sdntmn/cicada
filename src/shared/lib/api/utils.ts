import { APIError } from "./Errors"
import { APIRequest, ErrorResponse } from "./types"

export const call = async <T>(rqst: APIRequest): Promise<T> => {
  let response: Response = null
  let result: ErrorResponse | T = null

  try {
    response = await fetch(rqst.url, rqst as RequestInit)
  } catch (exception) {
    throw new APIError("Ошибка при выполнении запроса", exception)
  }

  try {
    result = await response.json()
  } catch (exception) {
    throw new APIError("Ошибка получения данных", exception)
  }

  if (!response.ok) {
    result = result as ErrorResponse
    throw new APIError(result.message, new Error("Query response is not ok"), response.status, result.description)
  }

  return result as T
}
