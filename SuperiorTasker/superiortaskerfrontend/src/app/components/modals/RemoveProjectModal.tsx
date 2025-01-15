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
import { RemoveUserAndProjectModalProps } from "@/app/interfaces/types";

const RemoveProjectModal: React.FC<RemoveUserAndProjectModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    userName,
}) => {
    const t = useTranslations('group-page');

    return(
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('delete-project-message')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            {t('delete-project-confirmation', { userName })}
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
}

export default RemoveProjectModal;