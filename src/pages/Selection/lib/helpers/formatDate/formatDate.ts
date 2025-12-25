// export const formatDate = (date: Date): string =>
//   date.toLocaleString("ru-RU", {
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     month: "2-digit",
//   })

export const formatDate = (date: Date): string => {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 1) {
    return "только что"
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} мин назад`
  } else if (diffInHours < 24) {
    return `${diffInHours} ч назад`
  } else if (diffInDays === 1) {
    return "вчера"
  } else if (diffInDays < 7) {
    return `${diffInDays} дн назад`
  } else {
    // Форматируем дату: 15 дек, 12:30
    const day = date.getDate()
    const month = date.toLocaleString("ru-RU", { month: "short" })
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    return `${day} ${month}, ${hours}:${minutes}`
  }
}
