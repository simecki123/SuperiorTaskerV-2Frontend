/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, Button,
  FormControl, FormLabel, Input, Textarea, VStack,
  Box, Text, Avatar, Flex, useToast, Spinner,
  Radio, RadioGroup
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { NotYetGroupMember, Project, TaskRequest, UpdateTaskModalProps } from "@/app/interfaces/types";
import Pagination from "../profile-page-components/user-data-options/all-tasks-components/Pagination";
import { fetchGroupUsersFromServerWithSearchFilter } from "@/app/server-actions/fetchGroupUsersFromServerWithSearchFilter";
import { fetchProjectById } from "@/app/server-actions/fetchProjectById";

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({
    user,
    isOpen,
    onClose,
    task,
    onUpdateTask,
    accessToken
}) => {
  const t = useTranslations('group-page');
  const toast = useToast();

  // User search state
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [userSearchResults, setUserSearchResults] = useState<NotYetGroupMember[]>([]);
  const [userCurrentPage, setUserCurrentPage] = useState(0);
  const [userHasNextPage, setUserHasNextPage] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const userTypingTimeoutRef = useRef<NodeJS.Timeout>();

  const [taskData, setTaskData] = useState<TaskRequest>({
    userId: task?.userId || '',
    projectId: task?.projectId || '',
    groupId: task?.groupId || '',
    name: task?.name || '',
    description: task?.description || '',
    startDate: task?.startDate?.split('T')[0] || '',
    endDate: task?.endDate?.split('T')[0] || ''
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchUsers = useCallback(async () => {
    if (!accessToken || !task?.groupId) return;
    
    setLoadingUsers(true);
    try {
      const users = await fetchGroupUsersFromServerWithSearchFilter(
        user,
        accessToken,
        task.groupId,
        userCurrentPage,
        userSearchTerm 
      );
      const nextUsers = await fetchGroupUsersFromServerWithSearchFilter(
        user,
        accessToken,
        task.groupId,
        userCurrentPage + 1,
        userSearchTerm
      );
      
      setUserSearchResults(users);
      setUserHasNextPage(nextUsers.length > 0);
    } catch (error) {
      toast({
        title: t('error'),
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoadingUsers(false);
    }
  }, [accessToken, task?.groupId, task?.userId, userCurrentPage, userSearchTerm, toast, t]);

  useEffect(() => {
    if (isOpen && task) {
      searchUsers();
      // Load project data
      const fetchProject = async () => {
        try {
          const response = await fetchProjectById(task.projectId, accessToken);
          setSelectedProject(response);
        } catch (error) {
          toast({
            title: t('error'),
            description: t('project-fetch-error'),
            status: 'error',
            duration: 3000,
          });
        }
      };
      fetchProject();
    }
  }, [isOpen, task, searchUsers]);

  const handleUserSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearchTerm(e.target.value);
    setUserCurrentPage(0);

    if (userTypingTimeoutRef.current) {
      clearTimeout(userTypingTimeoutRef.current);
    }

    userTypingTimeoutRef.current = setTimeout(() => {
      searchUsers();
    }, 500);
  };

  const validateDates = useCallback(() => {
    if (!taskData.startDate || !taskData.endDate || !selectedProject) return true;

    const taskStart = new Date(taskData.startDate);
    const taskEnd = new Date(taskData.endDate);
    const projectStart = new Date(selectedProject.startDate);
    const projectEnd = new Date(selectedProject.endDate);

    if (taskEnd < taskStart) {
      toast({
        title: t('warning'),
        description: t('end-date-before-start-date'),
        status: 'warning',
        duration: 3000,
      });
      return false;
    }

    if (taskStart < projectStart || taskEnd > projectEnd) {
      toast({
        title: t('warning'),
        description: t('task-dates-outside-project-range'),
        status: 'warning',
        duration: 3000,
      });
      return false;
    }

    return true;
  }, [taskData.startDate, taskData.endDate, selectedProject, toast, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateDates()) return;
    setIsSubmitting(true);
    try {
        await onUpdateTask(taskData, task);
        onClose(); 
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>{t('update-task')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>{t('task-name')}</FormLabel>
                <Input
                  name="name"
                  value={taskData.name}
                  onChange={(e) => setTaskData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={t('enter-task-name')}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('task-description')}</FormLabel>
                <Textarea
                  name="description"
                  value={taskData.description}
                  onChange={(e) => setTaskData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder={t('enter-task-description')}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('start-date')}</FormLabel>
                <Input
                  name="startDate"
                  type="date"
                  value={taskData.startDate}
                  onChange={(e) => setTaskData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>{t('end-date')}</FormLabel>
                <Input
                  name="endDate"
                  type="date"
                  value={taskData.endDate}
                  onChange={(e) => setTaskData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </FormControl>

              {/* User selection section */}
              <FormControl isRequired>
                <FormLabel>{t('select-user')}</FormLabel>
                <Input
                  required={false}
                  placeholder={t('search-users')}
                  value={userSearchTerm}
                  onChange={handleUserSearchChange}
                  mb={2}
                />
                <Box maxH="200px" overflowY="auto" borderWidth={1} borderRadius="md" p={2}>
                  {loadingUsers ? (
                    <Flex justify="center" p={4}>
                      <Spinner />
                    </Flex>
                  ) : (
                    <RadioGroup
                      value={taskData.userId}
                      onChange={(value) => setTaskData(prev => ({ ...prev, userId: value }))}
                    >
                      <VStack align="stretch" spacing={2}>
                        {userSearchResults.map((member) => (
                          <Box
                            key={member.userId}
                            p={2}
                            borderWidth={1}
                            borderRadius="md"
                            _hover={{ bg: "gray.50" }}
                          >
                            <Radio value={member.userId}>
                              <Flex align="center" gap={3}>
                                <Avatar
                                  size="sm"
                                  src={member.photoUri}
                                  name={`${member.firstName} ${member.lastName}`}
                                />
                                <Box>
                                  <Text>
                                    {member.firstName} {member.lastName}
                                  </Text>
                                </Box>
                              </Flex>
                            </Radio>
                          </Box>
                        ))}
                      </VStack>
                    </RadioGroup>
                  )}
                </Box>
                {userSearchResults.length > 0 && !loadingUsers && (
                  <Box mt={2}>
                    <Pagination
                      currentPage={userCurrentPage}
                      setCurrentPage={setUserCurrentPage}
                      hasNextPage={userHasNextPage}
                    />
                  </Box>
                )}
              </FormControl>

              {selectedProject && (
                <Box w="100%" p={2} bg="blue.blue.200" borderRadius="md">
                  <Text fontSize="sm">
                    {t('task-date-constraints')}: {new Date(selectedProject.startDate).toLocaleDateString()} - {new Date(selectedProject.endDate).toLocaleDateString()}
                  </Text>
                </Box>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              isLoading={isSubmitting}
            >
              {t('update-task')}
            </Button>
            <Button onClick={onClose}>{t('cancel')}</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateTaskModal;