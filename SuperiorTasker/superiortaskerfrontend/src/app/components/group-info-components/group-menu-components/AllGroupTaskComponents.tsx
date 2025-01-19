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
import { AllGroupMembersProps, Task, TaskBodySearch } from "@/app/interfaces/types";
import { useSearchParams } from "next/navigation";
import { fetchTasksFromServer } from "@/app/server-actions/fetchTasks";
import { fetchTasksFilter } from "@/app/server-actions/fetchTasksFilter";


export default function AllGroupTaskComponents({ user, accessToken }: AllGroupMembersProps) {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const t = useTranslations('group-page')
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [tasks, setTasks] = useState<Task[]>([]);
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
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

    setLoading(true);
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
        setLoading(false);
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
    // Add the new task to the beginning of the list
    setTasks(prevTasks => [newTask, ...prevTasks]);
    
    // Show success toast
    toast({
      title: t('task-created'),
      description: t('task-created-success'),
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    // Close the modal
    setIsCreateTaskModalOpen(false);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prevTasks => 
        prevTasks.map(task => 
            task.id === updatedTask.id ? updatedTask : task
        )
    );
  };

  if (loading) {
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
              onTaskUpdate={handleTaskUpdate}
              accessToken={accessToken}
              setTasks={setTasks}
              isUserAdmin={isUserAdmin}
              groupId={groupId}  
            />
          ) : (
            <GroupTasksCardComponent 
              user={user}
              tasks={tasks}
              onTaskUpdate={handleTaskUpdate}
              accessToken={accessToken}
              setTasks={setTasks}
              isUserAdmin={isUserAdmin}
              groupId={groupId}  
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