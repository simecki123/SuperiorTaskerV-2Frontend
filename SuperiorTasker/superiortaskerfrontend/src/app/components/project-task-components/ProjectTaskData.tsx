/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from "react";
import { Heading, Spinner, VStack, useBreakpointValue, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { GroupProjectsAndTasksDataProps, Task, TaskBodySearch } from "@/app/interfaces/types";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchTasksFilter } from "@/app/server-actions/fetchTasksFilter";
import SearchbarForTasks from "./SearchBarForTasks";
import ProjectTasksTable from "./ProjectTasksTable";
import ProjectTaskCards from "./ProjectTaskDataCard";
import Pagination from "../profile-page-components/user-data-options/all-tasks-components/Pagination";
import ProjectTaskFilter from "./ProjectTaskFilter";

export default function ProjectTaskData({user, accessToken}: GroupProjectsAndTasksDataProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const t = useTranslations('project-tasks');

  // Use searchParams to initialize state
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '0'));
  const [searchByText, setSearchByText] = useState((searchParams.get('search') || '').replace(/\+/g, ' '));
  const projectId = searchParams.get('projectId') || '';
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const groupId = searchParams.get('groupId') || '0';

  const [tasks, setTasks] = useState<Task[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to update URL parameters
  const updateURLParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
        if (value === null) {
            params.delete(key);
        } else {
            params.set(key, value);
        }
    });
    router.push(`?${params.toString()}`);
  };

  const handleSearchTasks = async () => {
    if (!groupId || !user?.id) return;

    const searchConditions: TaskBodySearch = {
        userId: user.id,
        groupId,
        projectId: projectId,
        status: status,
        search: searchByText,
    };

    // Update URL parameters
    updateURLParams({
        search: searchByText || null,
        status: status || null,
        page: currentPage.toString()
    });
    
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
  };

  // Effect to fetch projects when URL parameters change
  useEffect(() => {
    handleSearchTasks();
    }, [
      currentPage, 
      groupId,
      searchByText,
      projectId,
      status,
  ]);

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prevTasks => 
        prevTasks.map(task => 
            task.id === updatedTask.id ? updatedTask : task
        )
    );
};

  

  return (
    <VStack spacing={6} align="stretch">
      <Heading as="h1" size="xl" textAlign="center" mb={4}>
        {t('group-tasks')}
      </Heading>
      <SearchbarForTasks
        handleSearchTasks={handleSearchTasks}
        setSearchByText={setSearchByText}
        initialSearch={searchByText}
      />
      <ProjectTaskFilter initialStatus={status} setStatus={setStatus}></ProjectTaskFilter>
      
      {loading ? (
              <Spinner /> // Add loading indicator
          ) : error ? (
              <Text color="red.500">{error}</Text>
          ) : isDesktop ? (
              <ProjectTasksTable
                tasks={tasks}
                onTaskUpdate={handleTaskUpdate}
                accessToken={accessToken}
              />
          ) : (
              <ProjectTaskCards
                tasks={tasks}
                onTaskUpdate={handleTaskUpdate}
                accessToken={accessToken}
              />
          )}
          <Pagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasNextPage={hasNextPage}
          />
    </VStack>
  );
}
