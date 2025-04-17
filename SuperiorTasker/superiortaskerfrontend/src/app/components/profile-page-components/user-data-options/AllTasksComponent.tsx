"use client";
import React, { useEffect, useState } from "react";
import { Box, useBreakpointValue, Text } from "@chakra-ui/react";
import TaskTable from "./all-tasks-components/TaskTable";
import Pagination from "./all-tasks-components/Pagination";
import TaskCards from "./all-tasks-components/TaskCards";
import { User, Task } from "@/app/interfaces/types";
import { fetchTasksFromServer } from "@/app/server-actions/fetchTasks";

export default function AllTasksComponent({ user }: { user: User }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  useEffect(() => {
    const controller = new AbortController();

    const loadTasks = async () => {
      if (!user?.id) return;

      setLoading(true);
      setError(null);

      try {
        const currentTasks = await fetchTasksFromServer(user, currentPage);
        const nextTasks = await fetchTasksFromServer(user, currentPage + 1);

        setTasks(currentTasks);
        setHasNextPage(nextTasks.length > 0);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();

    return () => {
      controller.abort();
    };
  }, [currentPage, user, user?.id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!tasks?.length) {
    return <Text>No tasks available.</Text>;
  }

  return (
    <Box>
      {isDesktop ? <TaskTable tasks={tasks} /> : <TaskCards tasks={tasks} />}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        hasNextPage={hasNextPage}
      />
    </Box>
  );
}
