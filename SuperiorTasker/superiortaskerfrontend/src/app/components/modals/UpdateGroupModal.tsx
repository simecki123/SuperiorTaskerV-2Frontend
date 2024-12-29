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
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

interface UpdateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string; file?: File }) => void;
  initialData: {
    name: string;
    description: string;
    photoUri: string;
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
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string>(initialData.photoUri);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, file: file || undefined });
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
            <FormControl mt={4}>
              <FormLabel>{t('group-image')}</FormLabel>
              <Box
                borderWidth={2}
                borderStyle="dashed"
                borderRadius="md"
                p={4}
                textAlign="center"
                cursor="pointer"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <Input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  hidden
                />
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    maxH="200px"
                    mx="auto"
                  />
                ) : (
                  <Text>{t('click-to-upload')}</Text>
                )}
              </Box>
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