import React from "react"

import { Modal, ModalContent } from "itpc-ui-kit"

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const EditDataModal: React.FC<Props> = ({ isOpen, onClose }) => (
  <Modal
    iconClose={<i className="fa-regular fa-xmark report-modal__icon" onClick={onClose} />}
    isOpen={isOpen}
    onClose={onClose}
    title={"Скачать акт"}
  >
    <ModalContent className="report-modal">Контент</ModalContent>
  </Modal>
)
