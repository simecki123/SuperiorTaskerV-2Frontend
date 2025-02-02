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



const RemoveUserModal: React.FC<RemoveUserAndProjectModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userName,
}) => {
  const t = useTranslations('group-page');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('remove-member-confirmation')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            {t('remove-member-message', { userName })}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button colorScheme="red" onClick={onConfirm}>
            {t('confirm-remove')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RemoveUserModal;