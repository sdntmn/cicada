import { Menu } from "../../../constants"

export const getSectionFromUrl = (): Menu => {
  const location = window.location.hash.split("#")

  switch (location[1]) {
    case Menu.dashboard:
      return Menu.dashboard
    case Menu.archive:
      return Menu.archive
    case Menu.cardIndex:
      return Menu.cardIndex
    case Menu.court:
      return Menu.court
    case Menu.expertise:
      return Menu.expertise
    case Menu.monitoring:
      return Menu.monitoring

    default:
      return Menu.dashboard
  }
}
