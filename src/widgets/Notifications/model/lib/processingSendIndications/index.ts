import { type NotificationType, NotificationTypes } from "../../types/types"

export const getNotificationType = (status: boolean, failed: string[], passed: string[]): NotificationType => {
  if (!status || (failed.length > 0 && !passed.length)) {
    return NotificationTypes.error
  }
  if (failed.length > 0 && passed.length > 0) {
    return NotificationTypes.warning
  }
  return NotificationTypes.success
}
