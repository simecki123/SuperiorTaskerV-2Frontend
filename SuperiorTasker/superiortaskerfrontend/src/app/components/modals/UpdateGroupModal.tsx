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
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

interface UpdateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string }) => void;
  initialData: {
    name: string;
    description: string;
  };
}

const UpdateGroupModal: React.FC<UpdateGroupModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const t = useTranslations('group-page');
  const [name, setName] = React.useState(initialData.name);
  const [description, setDescription] = React.useState(initialData.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>{t('update-group')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>{t('group-name')}</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('enter-group-name')}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>{t('group-description')}</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('enter-group-description')}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button colorScheme="blue" type="submit">
              {t('save-changes')}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateGroupModal;