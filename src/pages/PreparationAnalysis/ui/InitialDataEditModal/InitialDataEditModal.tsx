import React from "react"

import { Button, Modal, ModalContent } from "itpc-ui-kit"

import type { Column } from "@/shared/lib/types/table"
import { TableRowPreview } from "@/shared/ui/Table/ui/TableRowPreview/TableRowPreview"

import type { InitialData } from "../../lib/types/initialDataTypes"

interface Props {
  children: React.ReactNode
  isLoading?: boolean
  isOpen: boolean
  onClose: () => void
  onSave?: () => void
  rowData?: InitialData | null
  title?: string
  visibleColumns?: Column<InitialData>[]
}

export const InitialDataEditModal: React.FC<Props> = ({
  children,
  isLoading = false,
  isOpen,
  onClose,
  onSave,
  rowData,
  title = "Редактирование",
  visibleColumns,
}) => {
  // Если есть rowData и колонки — используем их в заголовке

  console.info(rowData)
  console.info(visibleColumns)
  const renderHeaderContent = () => {
    if (rowData) {
      return <TableRowPreview<InitialData> columns={visibleColumns} rowData={rowData} rowIndex={rowData.rowIndex} />
    }
    return <span>{title}</span>
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={""}>
      {renderHeaderContent()}
      <ModalContent>{children}</ModalContent>

      <Button disabled={isLoading} onPress={onClose}>
        Отмена
      </Button>
      {onSave && (
        <Button disabled={isLoading} onClick={onSave} variant="primary">
          Сохранить
        </Button>
      )}
    </Modal>
  )
}
