import React from "react"

import { useAppSelector } from "@/shared/lib/store"

import { Notification } from "../../model/types/types"
import { NotificationItem } from "../NotificationItem/NotificationItem"

import "./styles.scss"

export const NotificationList: React.FC = () => {
  const { notifications } = useAppSelector((state) => state.notifications)

  return (
    <div className="notifications toast-container">
      {notifications?.map((notification: Notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  )
}
