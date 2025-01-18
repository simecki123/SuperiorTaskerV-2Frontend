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
  useToast,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { deleteTask } from "@/app/server-actions/deleteTask";
import { Task } from "@/app/interfaces/types";

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  accessToken: string;
  onTaskDelete: (taskId: string) => void;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  isOpen,
  onClose,
  task,
  accessToken,
  onTaskDelete,
}) => {
  const t = useTranslations('group-page');
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await deleteTask(task.userId, accessToken, task.id);
      
      onTaskDelete(task.id);
      
      toast({
        title: t('task-deleted'),
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      toast({
        title: t('delete-error'),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('delete-task-confirmation')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            {t('delete-task-message')} {task.name}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button colorScheme="red" onClick={handleDelete}>
            {t('confirm-delete')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTaskModal;