import React, { useEffect, useMemo, useState } from "react"

import { getUser } from "@/entities/User"
import Logo from "@/shared/assets/logo.svg"
import { Menu, MenuName } from "@/shared/constants"
import { getSectionFromUrl } from "@/shared/lib/helpers"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { MainLayout } from "@/shared/ui/MainLayout"
import { Profile } from "@/shared/ui/Profile/Profile"
import { Section } from "@/shared/ui/Section"
import { Navbar } from "@/widgets/Navbar"

import { sections } from "./lib/constants/constants"

export const App: React.FC = () => {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector((state) => state.user)

  const [currentSection, setCurrentSection] = useState<Menu>(getSectionFromUrl())

  const switchSection = (newSection: Menu): void => {
    setCurrentSection(newSection)
    window.location.hash = newSection
  }

  const sectionName = useMemo(
    () =>
      ({
        [Menu.archive]: MenuName.archive,
        [Menu.cardIndex]: MenuName.cardIndex,
        [Menu.court]: MenuName.court,
        [Menu.dashboard]: MenuName.dashboard,
        [Menu.expertise]: MenuName.expertise,
        [Menu.monitoring]: MenuName.monitoring,
      })[currentSection] || MenuName.dashboard,
    [currentSection]
  )

  const renderSection = (): React.ReactNode => {
    const SectionComponent = sections[currentSection]
    return SectionComponent ? <SectionComponent /> : null
  }

  useEffect(() => {
    dispatch(getUser("1"))
  }, [])

  return (
    <MainLayout
      header={
        <>
          <img alt="Логотип" className="app__logo" src={Logo} />
          <Navbar currentSection={currentSection} switchSection={switchSection} />
          <Profile userName={user} />
        </>
      }
      className="app app_default_theme"
      content={<Section section={renderSection()} sectionName={sectionName} />}
    />
  )
}
