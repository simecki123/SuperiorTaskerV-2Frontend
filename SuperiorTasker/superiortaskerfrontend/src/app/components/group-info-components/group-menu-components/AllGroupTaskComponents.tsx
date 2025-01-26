/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react"
import { useBreakpointValue, Text, Box, Button, useToast } from "@chakra-ui/react";
import Pagination from "../../profile-page-components/user-data-options/all-tasks-components/Pagination";
import GroupTasksTableComponent from "../group-tasks-components/GroupTasksTableComponent";
import GroupTasksCardComponent from "../group-tasks-components/GroupTasksCardComponent";
import { useTranslations } from "next-intl";
import CreateTaskModal from "../../modals/CreateNewTaskModal";
import { AllGroupMembersProps, Task, TaskBodySearch, TaskRequest } from "@/app/interfaces/types";
import { useSearchParams } from "next/navigation";
import { fetchTasksFilter } from "@/app/server-actions/fetchTasksFilter";
import { updateTask } from "@/app/server-actions/updateTask";


export default function AllGroupTaskComponents({ user, accessToken }: AllGroupMembersProps) {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const t = useTranslations('group-page')
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [tasks, setTasks] = useState<Task[]>([]);
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const groupId = searchParams.get('groupId') || '0';
  const isUserAdmin = user.groupMembershipData.some(
    membership => membership.groupId === groupId && membership.role === "ADMIN"
  );

  const handleSearchTasks = useCallback(async () => {
    if (!groupId || !user?.id) return;

    const searchConditions: TaskBodySearch = {
        userId: '',
        groupId,
        projectId: '',
        status: '',
        search: '',
    };

    setIsLoading(true);
    setError(null);

    try {
        const currentTasks = await fetchTasksFilter(searchConditions, user, accessToken, currentPage);
        const nextPageTasks = await fetchTasksFilter(searchConditions, user, accessToken, currentPage + 1);

        setTasks(currentTasks)
        setHasNextPage(nextPageTasks.length > 0);
    } catch(error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
        setTasks([]);
    } finally {
        setIsLoading(false);
    }
  }, [currentPage, groupId, user]);

  useEffect(() => {
    const controller = new AbortController();
    handleSearchTasks();
    return () => {
      controller.abort();
    };
  }, [handleSearchTasks]); 

  const handleTaskCreated = (newTask: Task) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setIsCreateTaskModalOpen(false);
  };

  const handleSetUpdatedTask = (updatedTask: Task) => {
    setTasks(prevTasks => 
        prevTasks.map(task => 
            task.id === updatedTask.id ? updatedTask : task
        )
    );
  };

  const handleTaskUpdate = async (taskToUpdate: TaskRequest, task: Task)=> {
    setIsLoading(true);
    try {
    
      const updatedTask = await updateTask(taskToUpdate,task.id, accessToken);
      
      handleSetUpdatedTask(updatedTask);

    
      toast({
        title: "Success",
        description: "Project updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update project",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isloading) {
    return <Text>{t('loading')}</Text>;
  }

  if (error) {
    return <Text>{t('error')}: {error}</Text>;
  }

  return (
    <Box>
      {isUserAdmin && (
        <Button 
          colorScheme="blue" 
          variant="solid" 
          size="md" 
          mb={4} 
          _hover={{ bg: "blue.600" }} 
          borderRadius="md"
          onClick={() => setIsCreateTaskModalOpen(true)}
        >
          {t('create-new-task')}
        </Button>
      )}

      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        user={user}
        accessToken={accessToken}
        groupId={groupId}
        onTaskCreated={handleTaskCreated}
      />

      {tasks.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Text fontSize="lg" color="gray.600">
            {t('no-tasks-available')}
          </Text>
        </Box>
      ) : (
        <>
          {isDesktop ? (
            <GroupTasksTableComponent 
              user={user}
              tasks={tasks}
              onTaskUpdate={handleSetUpdatedTask}
              accessToken={accessToken}
              setTasks={setTasks}
              isUserAdmin={isUserAdmin}
              handleUpdateTask={handleTaskUpdate}
            />
          ) : (
            <GroupTasksCardComponent 
              user={user}
              tasks={tasks}
              onTaskUpdate={handleSearchTasks}
              accessToken={accessToken}
              setTasks={setTasks}
              isUserAdmin={isUserAdmin}
              handleUpdateTask={handleTaskUpdate}
            />
          )}
          <Box mt={4}>
            <Pagination 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              hasNextPage={hasNextPage}
            />
          </Box>
        </>
      )}
    </Box>
  );
}