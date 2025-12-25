import React, { useEffect, useMemo } from "react"

import { getUser } from "@/entities/User"
import { GlobalSearch } from "@/features/GlobalSearch"
import Logo from "@/shared/assets/logo.svg"
import { DetailType, ViewType } from "@/shared/constants"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { Flex } from "@/shared/ui/layout/Flex"
import { MainLayout } from "@/shared/ui/MainLayout"
import { Profile } from "@/shared/ui/Profile/Profile"
import { NotificationList } from "@/widgets/Notifications"
import { SubNav } from "@/widgets/SubNav"
import { TopNav } from "@/widgets/TopNav"

import { renderContent } from "./lib/helpers/renderContent/renderContent"
import { useAppNavigation } from "./lib/hooks/useAppNavigation/useAppNavigation"

export const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)

  const { activeMainMenuSection, currentView, navigateToItem, switchSection, switchSubSection } = useAppNavigation()

  useEffect(() => {
    dispatch(getUser("1"))
  }, [dispatch])

  const content = useMemo(() => {
    if (currentView.type === ViewType.DETAIL) {
      if (currentView.detailType === DetailType.CASE) {
        // return <CaseDetailPage caseId={currentView.caseId} />
        return <div> Карточка долга </div>
      }
      if (currentView.detailType === DetailType.DEBTOR) {
        // return <DebtorDetailPage debtorId={currentView.debtorId} />
        return <div> Карточка дела</div>
      }
    }

    if (currentView.type === ViewType.MAIN) {
      return renderContent({
        caseId: currentView.caseId,
        onNavigateToItem: navigateToItem,
        section: currentView.section,
        subSection: currentView.subSection,
      })
    }

    return <div>Недопустимое состояние</div>
  }, [currentView, navigateToItem])

  return (
    <MainLayout
      header={
        <>
          <Flex className="app__header">
            <img alt="Логотип" className="app__logo" src={Logo} />
            <TopNav currentSection={activeMainMenuSection} onSectionChange={switchSection} />
            <Flex className="app__search" gap={16}>
              <GlobalSearch />
              <Profile userName={user} />
            </Flex>

            <NotificationList />
          </Flex>
          <SubNav currentView={currentView} onSectionChange={switchSection} onSubSectionChange={switchSubSection} />
        </>
      }
      className="app app_default_theme"
      content={content}
    />
  )
}
