import React from "react"

export interface Props {
  section: React.ReactNode
}

export const Section = React.memo<Props>(({ section }) => <>{section}</>)
