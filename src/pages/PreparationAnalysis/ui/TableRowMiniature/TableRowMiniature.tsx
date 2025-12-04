import React from "react"

import { Flex } from "@/shared/ui/layout/Flex"

import { InitialData } from "../../lib/types/initialDataTypes"

import "./styles.scss"

interface Props {
  data: InitialData
  visibleFields?: {
    key: keyof InitialData
    label: string
    width?: number
  }[]
}

export const TableRowMiniature: React.FC<Props> = ({
  data,
  visibleFields = [
    { key: "name", label: "ФИО" },
    { key: "account", label: "ИНН" },
    { key: "city", label: "Город" },
    { key: "status", label: "Статус" },
  ],
}) => {
  const fields = visibleFields.filter((field) => data[field.key] != null)

  return (
    <div className="table-row-miniature">
      <div className="table-row-miniature__content">
        {fields.map((field, index) => (
          <React.Fragment key={field.key}>
            <div className="table-row-miniature__field">
              <span className="table-row-miniature__field-label">{field.label}:</span>
              <span className="table-row-miniature__field-value" title={String(data[field.key])}>
                {String(data[field.key])}
              </span>
            </div>
            {index < fields.length - 1 && <div className="table-row-miniature__divider" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
