export const NotificationTypes = {
  error: "error",
  info: "info",
  success: "success",
  warning: "warning",
} as const

export type NotificationType = (typeof NotificationTypes)[keyof typeof NotificationTypes]

export interface NotificationsStorage {
  notifications: Notification[]
}

export interface Notification {
  closeDelay?: number
  id: string
  text: string
  title: string
  type: NotificationType
}

export interface AddNotification {
  closeDelay?: number
  isError: boolean
  text: string
  title: string
}
