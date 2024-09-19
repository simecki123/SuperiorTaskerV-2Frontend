/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { VStack, Box, Heading, Text, Badge } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Pagination from "../profile-page-components/user-data-options/all-tasks-components/Pagination";
import TaskStatusModal from "../modals/TaskStatusModal";

export default function ProjectTaskCards({ tasks }: any) {
  const t = useTranslations('project-tasks');
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        {currentTasks.map((task: any) => (
          <Box key={task.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Heading fontSize="xl">{task.title}</Heading>
            <Text mt={2}>{task.description}</Text>
            <Text mt={2} fontWeight="bold">
              {t('project')}: {task.projectName}
            </Text>
            <Badge mt={2} colorScheme={task.status === "done" ? "green" : "red"}>
              {task.status === "done" ? `${t('done')}` : `${t('in-progress')}`}
            </Badge>
            <TaskStatusModal /> {/* Modal button */}
          </Box>
        ))}
      </VStack>
      <Pagination 
        itemsPerPage={itemsPerPage} 
        totalItems={tasks.length} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
}
