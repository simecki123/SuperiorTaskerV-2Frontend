/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Box,
  Text,
  Avatar,
  Flex,
  useToast,
  Spinner,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { NotYetGroupMember, Project, ProjectBodySearch, Task, TaskRequest, User } from "@/app/interfaces/types";
import { fetchProjectsFromServer } from "@/app/server-actions/fetchProjectsFromServer";
import { createNewTask } from "@/app/server-actions/createNewTask";
import Pagination from "../profile-page-components/user-data-options/all-tasks-components/Pagination";
import { fetchGroupUsersFromServerWithSearchFilter } from "@/app/server-actions/fetchGroupUsersFromServerWithSearchFilter";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  accessToken: string;
  groupId: string;
  onTaskCreated: (newTask: Task) => void;
}

export default function CreateTaskModal({
  isOpen,
  onClose,
  user,
  accessToken,
  groupId,
  onTaskCreated,
}: CreateTaskModalProps) {
  const t = useTranslations('group-page');
  const toast = useToast();

  // Basic task data
  const [taskData, setTaskData] = useState<TaskRequest>({
    userId: "",
    projectId: "",
    groupId: groupId,
    name: "",
    description: "",
    endDate: "",
    startDate: "",
  });

  // User search state
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [userSearchResults, setUserSearchResults] = useState<NotYetGroupMember[]>([]);
  const [userCurrentPage, setUserCurrentPage] = useState(0);
  const [userHasNextPage, setUserHasNextPage] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const userTypingTimeoutRef = useRef<NodeJS.Timeout>();

  // Project search state
  const [projectSearchTerm, setProjectSearchTerm] = useState("");
  const [projectSearchResults, setProjectSearchResults] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectCurrentPage, setProjectCurrentPage] = useState(0);
  const [projectHasNextPage, setProjectHasNextPage] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const projectTypingTimeoutRef = useRef<NodeJS.Timeout>();

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateDates = useCallback(() => {
    if (!taskData.startDate || !taskData.endDate || !selectedProject) return;

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
      setTaskData(prev => ({ ...prev, endDate: '' }));
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

  const searchUsers = useCallback(async () => {
    if (!accessToken) return;
    
    setLoadingUsers(true);
    try {
      const users = await fetchGroupUsersFromServerWithSearchFilter(
        user,
        accessToken,
        groupId,
        userCurrentPage,
        userSearchTerm 
      );
      const nextUsers = await fetchGroupUsersFromServerWithSearchFilter(
        user,
        accessToken,
        groupId,
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
  }, [accessToken, groupId, userCurrentPage, userSearchTerm, toast, t, user]);

  const searchProjects = useCallback(async () => {
    if (!accessToken) return;
    
    setLoadingProjects(true);
    try {
      const searchBody: ProjectBodySearch = {
        userId: '',
        groupId,
        startCompletion: '',
        endCompletion: '',
        includeComplete: false,
        includeNotStarted: false,
        search: projectSearchTerm
      };
      
      const projects = await fetchProjectsFromServer(
        searchBody,
        user,
        accessToken,
        projectCurrentPage
      );
      const nextProjects = await fetchProjectsFromServer(
        searchBody,
        user,
        accessToken,
        projectCurrentPage + 1
      );
      
      setProjectSearchResults(projects);
      setProjectHasNextPage(nextProjects.length > 0);
    } catch (error) {
      toast({
        title: t('error'),
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoadingProjects(false);
    }
  }, [accessToken, groupId, projectSearchTerm, projectCurrentPage, user]);

  useEffect(() => {
    if(isOpen) {
      searchUsers();
    }
  }, [isOpen, searchUsers ]);

  useEffect(() => {
    if(isOpen) {
      searchProjects();
    }
  }, [isOpen, searchProjects]);

  useEffect(() => {
    validateDates();
  }, [taskData.startDate, taskData.endDate, selectedProject, validateDates]);

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

  const handleProjectSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectSearchTerm(e.target.value);
    setProjectCurrentPage(0);

    if (projectTypingTimeoutRef.current) {
      clearTimeout(projectTypingTimeoutRef.current);
    }

    projectTypingTimeoutRef.current = setTimeout(() => {
      searchProjects();
    }, 500);
  };

  const handleProjectSelect = (projectId: string) => {
    const project = projectSearchResults.find(p => p.id === projectId);
    setSelectedProject(project || null);
    setTaskData(prev => ({ ...prev, projectId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskData.userId || !taskData.projectId) {
      toast({
        title: t('warning'),
        description: t('select-user-and-project'),
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    if (!validateDates()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const newTask = await createNewTask(taskData, accessToken);
      onTaskCreated(newTask);
      toast({
        title: t('success'),
        description: t('task-created-success'),
        status: 'success',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: t('error'),
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent  display="flex" flexDirection="column">
        <form onSubmit={handleSubmit}>
          <ModalHeader>{t('create-new-task')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody flex="1" overflow="auto">
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
                  placeholder={t('search-users')}
                  value={userSearchTerm}
                  onChange={handleUserSearchChange}
                  mb={2}
                  form=""
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

              {/* Project selection section */}
              <FormControl isRequired>
                <FormLabel>{t('select-project')}</FormLabel>
                <Input
                  placeholder={t('search-projects')}
                  value={projectSearchTerm}
                  onChange={handleProjectSearchChange}
                  mb={2}
                  form=""
                />
                <Box maxH="200px" overflowY="auto" borderWidth={1} borderRadius="md" p={2}>
                  {loadingProjects ? (
                    <Flex justify="center" p={4}>
                      <Spinner />
                    </Flex>
                  ) : (
                    <RadioGroup
                      value={taskData.projectId}
                      onChange={handleProjectSelect}
                    >
                      <VStack align="stretch" spacing={2}>
                        {projectSearchResults.map((project) => (
                          <Box
                            key={project.id}
                            p={2}
                            borderWidth={1}
                            borderRadius="md"
                            _hover={{ bg: "gray.50" }}
                          >
                            <Radio value={project.id}>
                              <Box>
                                <Text fontWeight="bold">{project.name}</Text>
                                <Text fontSize="sm">{project.description}</Text>
                                <Text fontSize="xs" color="gray.600">
                                  {t('project-date-range')}: {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                                </Text>
                              </Box>
                            </Radio>
                          </Box>
                        ))}
                      </VStack>
                    </RadioGroup>
                  )}
                </Box>
                {projectSearchResults.length > 0 && !loadingProjects && (
                  <Box mt={2}>
                    <Pagination
                      currentPage={projectCurrentPage}
                      setCurrentPage={setProjectCurrentPage}
                      hasNextPage={projectHasNextPage}
                    />
                  </Box>
                )}
              </FormControl>
              {selectedProject && (
                <Box w="100%" p={2} bg="blue.50" borderRadius="md">
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
              {t('create-task')}
            </Button>
            <Button onClick={onClose}>{t('cancel')}</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}