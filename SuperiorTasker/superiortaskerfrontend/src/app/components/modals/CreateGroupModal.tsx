/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React from "react";
import CreateGroupForm from "../create-group-form/CreateGroupForm";

export default function CreateGroupModal({
  isOpen,
  onClose,
  state,
  formAction,
  joinState,
  joinFormAction,
}: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg"> {/* Large size for better spacing */}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a New Group</ModalHeader>
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
