import React, { useEffect } from "react"

import cn from "classnames"

import { closeIcon, DELAY } from "@/shared/constants"
import { useAppDispatch } from "@/shared/lib/store"
import { Icon } from "@/shared/ui/Icon"

import { notificationsActions } from "../../model/slice/notificationsSlice"
import { Notification, NotificationTypes } from "../../model/types/types"

import "./styles.scss"

interface Props {
  notification: Notification
}

export const NotificationItem: React.FC<Props> = ({ notification }) => {
  const dispatch = useAppDispatch()

  const deleteNotification = (oid: string): void => {
    dispatch(notificationsActions.delete(oid))
  }

  useEffect(() => {
    if (notification.closeDelay && notification.closeDelay < 0) {
      return
    }

    const timerShowNotification = setTimeout(() => {
      deleteNotification(notification.id)
    }, notification.closeDelay ?? DELAY.TIME_5000)
    return () => clearTimeout(timerShowNotification)
  }, [])

  return (
    <div
      className={cn(
        "notification toast show",
        notification.type === NotificationTypes.error && "notification_error",
        notification.type === NotificationTypes.success && "notification__success",
        notification.type === NotificationTypes.warning && "notification__warning"
      )}
    >
      <div className="toast-header">
        <strong className="me-auto">{notification.title}</strong>

        <button className="notification__button" onClick={() => deleteNotification(notification.id)} type="button">
          <Icon className={cn(closeIcon, "fa-regular fa-times")} />
        </button>
      </div>

      <div className="toast-body">{notification.text}</div>
    </div>
  )
}
