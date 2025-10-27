export const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
}
export const APIERROR_DEFAULT_CODE = 10000
export const APIERROR_DEFAULT_ERROR = new Error("Ошибка при выполнении запроса")
export const APIERROR_DEFAULT_DESCRIPTION = "Ошибка при выполнении запроса. Перезагрузите страницу или попробуйте позже"

export enum METHOD {
  DELETE = "DELETE",
  GET = "GET",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
}

export enum ACCOUNT_ACTION {
  add = "add",
  remove = "remove",
}
