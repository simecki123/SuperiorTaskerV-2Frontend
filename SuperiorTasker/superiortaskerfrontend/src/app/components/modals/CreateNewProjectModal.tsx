import React, { useState } from "react";
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
  VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (projectData: ProjectData) => void;
}

interface ProjectData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateProject,
}) => {
  const t = useTranslations('group-page');
  const [projectData, setProjectData] = useState<ProjectData>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateProject(projectData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>{t('create-new-project')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>{t('project-name')}</FormLabel>
                <Input
                  name="name"
                  value={projectData.name}
                  onChange={handleInputChange}
                  placeholder={t('enter-project-name')}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('project-description')}</FormLabel>
                <Textarea
                  name="description"
                  resize="none"
                  value={projectData.description}
                  onChange={handleInputChange}
                  placeholder={t('enter-project-description')}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('start-date')}</FormLabel>
                <Input
                  name="startDate"
                  type="date"
                  value={projectData.startDate}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('end-date')}</FormLabel>
                <Input
                  name="endDate"
                  type="date"
                  value={projectData.endDate}
                  onChange={handleInputChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              {t('create-project')}
            </Button>
            <Button variant="ghost" onClick={onClose}>{t('cancel')}</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateProjectModal;