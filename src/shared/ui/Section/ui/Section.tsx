import React from "react"

import { useWindowSize } from "itpc-ui-kit"

import { WIDTH } from "@/shared/constants"

export interface Props {
  section: React.ReactNode
  sectionName: React.ReactNode
}

export const Section = React.memo<Props>(({ section, sectionName }) => {
  const { windowWidth } = useWindowSize()
  const isSection: boolean = windowWidth <= WIDTH.SCREEN_800
  return (
    <div className="section">
      <div className="section__content">
        {isSection && <h2 className="section__title">{sectionName}</h2>}
        {section}
      </div>
    </div>
  )
})
