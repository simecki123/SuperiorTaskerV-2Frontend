"use client";
import React, { useState } from "react";
import { Box, useBreakpointValue, Text } from "@chakra-ui/react";
import TaskTable from "./all-tasks-components/TaskTable";
import Pagination from "./all-tasks-components/Pagination";
import TaskCards from "./all-tasks-components/TaskCards";

const ITEMS_PER_PAGE = 4;

export default function AllTasksComponent({ tasks = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  if (tasks.length === 0) {
    return <Text>No tasks available.</Text>;
  }

  const indexOfLastTask = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstTask = indexOfLastTask - ITEMS_PER_PAGE;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <Box>
      {isDesktop ? (
        <TaskTable tasks={currentTasks} />
      ) : (
        <TaskCards tasks={currentTasks} />
      )}
      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={tasks.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
}