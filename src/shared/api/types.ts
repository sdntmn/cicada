export interface APIRequest extends RequestInit {
  url: RequestInfo
}

export interface ErrorResponse {
  code?: number
  description?: string
  message: string
}
