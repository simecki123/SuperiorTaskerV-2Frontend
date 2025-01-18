/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Modal,
  Text,
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
  Box,
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Project } from "@/app/interfaces/types";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (taskData: TaskData) => void;
}

interface TaskData {
  name: string;
  description: string;
  endDate: string;
  projectId: string | null;
}



const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
  onCreateTask,
}) => {
  const t = useTranslations('group-page');
  const [taskData, setTaskData] = useState<TaskData>({
    name: "",
    description: "",
    endDate: "",
    projectId: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleProjectSelect = (projectId: string) => {
    setTaskData(prev => ({ ...prev, projectId: projectId === prev.projectId ? null : projectId }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateTask(taskData);
    onClose();
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>{t('create-new-task')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>{t('task-name')}</FormLabel>
                <Input
                  name="name"
                  value={taskData.name}
                  onChange={handleInputChange}
                  placeholder={t('enter-task-name')}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('task-description')}</FormLabel>
                <Textarea
                  name="description"
                  value={taskData.description}
                  onChange={handleInputChange}
                  placeholder={t('enter-task-description')}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('end-date')}</FormLabel>
                <Input
                  name="endDate"
                  type="date"
                  value={taskData.endDate}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>{t('select-project')}</FormLabel>
                <Input
                  placeholder={t('search-projects')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  mb={2}
                />
                <Box maxHeight="200px" overflowY="auto" borderWidth={1} borderRadius="md" p={2}>
                  <VStack align="stretch" spacing={2}>
                    {filteredProjects.map((project) => (
                      <Box 
                        key={project.id} 
                        p={2} 
                        borderWidth={1} 
                        borderRadius="md"
                        bg={taskData.projectId === project.id ? "blue.50" : "white"}
                        _hover={{ bg: "gray.50" }}
                        transition="background-color 0.2s"
                      >
                        <HStack>
                          <Checkbox
                            isChecked={taskData.projectId === project.id}
                            onChange={() => handleProjectSelect(project.id)}
                          />
                          <Box>
                            <Text fontWeight="bold">{project.name}</Text>
                            <Text fontSize="sm" noOfLines={2}>{project.description}</Text>
                          </Box>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              {t('create-task')}
            </Button>
            <Button variant="ghost" onClick={onClose}>{t('cancel')}</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateTaskModal;