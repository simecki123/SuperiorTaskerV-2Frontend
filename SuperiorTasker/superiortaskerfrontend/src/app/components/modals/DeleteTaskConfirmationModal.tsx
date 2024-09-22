/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskName: string;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  taskName,
}) => {
  const t = useTranslations('group-page');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('delete-task-confirmation')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            {t('delete-task-message')}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button colorScheme="red" onClick={onConfirm}>
            {t('confirm-delete')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTaskModal;