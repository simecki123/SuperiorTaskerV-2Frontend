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

const ITEMS_PER_PAGE = 4;

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

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prevTasks => 
        prevTasks.map(task => 
            task.id === updatedTask.id ? updatedTask : task
        )
    );
  };

 

  return (
    <Box>
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
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        onCreateTask={(taskData) => {
          // Handle creating task logic here
          console.log('New task data:', taskData);
          setIsCreateTaskModalOpen(false);
        }}
      />
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
      <Pagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasNextPage={hasNextPage}
          />
    </Box>
  );
};

