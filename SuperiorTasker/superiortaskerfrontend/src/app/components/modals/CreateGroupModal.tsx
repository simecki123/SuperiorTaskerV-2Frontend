/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React from "react";
import CreateGroupForm from "../create-group-form/CreateGroupForm";
import { useTranslations } from "next-intl";
import { User } from "@/app/interfaces/types";

type GroupModalParams = {
  isOpen: any,
  onClose: any,
  user: User,
  state: any,
  formAction: any,
  joinState: any,
  joinFormAction: any,
}

export default function CreateGroupModal({
  isOpen,
  onClose,
  user,
  state,
  formAction,
  joinState,
  joinFormAction,
}: GroupModalParams) {

  const t = useTranslations('create-group-modal');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg"> {/* Large size for better spacing */}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('create-group-title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateGroupForm
            user={user}
            onClose={onClose}
            state={state}
            formAction={formAction}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
