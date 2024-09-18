/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React from "react";
import CreateGroupForm from "../create-group-form/CreateGroupForm";
import { useTranslations } from "next-intl";

export default function CreateGroupModal({
  isOpen,
  onClose,
  state,
  formAction,
  joinState,
  joinFormAction,
}: any) {

  const t = useTranslations('create-group-modal');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg"> {/* Large size for better spacing */}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('create-group-title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateGroupForm
            onClose={onClose}
            state={state}
            formAction={formAction}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
