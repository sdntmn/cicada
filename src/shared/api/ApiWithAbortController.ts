export class ApiWithAbortController {
  private controller: AbortController

  // Метод прерывающий запрос. Если запрос еще не вернул ответ и в нем есть сигнал - отменяется запрос.
  abortController = (): AbortController | null => {
    this.controller?.abort()
    return (this.controller = null)
  }

  // Метод создания нового контроллера. Возвращает новый сигнал для api запроса
  protected newControllerSignal = (): AbortSignal => {
    if (!this.controller) {
      this.controller = new AbortController()
      return this.controller?.signal
    }
  }

  constructor() {
    this.controller = null
  }
}
