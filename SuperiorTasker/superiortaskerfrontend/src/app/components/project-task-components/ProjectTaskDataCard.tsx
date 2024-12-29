/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { VStack, Box, Heading, Text, Badge } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import TaskStatusModal from "../modals/TaskStatusModal";
import { ProjectTaskDataProps, Task } from "@/app/interfaces/types";

export default function ProjectTaskCards({ tasks, onTaskUpdate, accessToken }: ProjectTaskDataProps) {
  const t = useTranslations('project-tasks');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        {tasks.map((task: Task) => (
          <Box key={task.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Heading fontSize="xl">{task.name}</Heading>
            <Text mt={2}>{task.description}</Text>
            <Text mt={2} fontWeight="bold">
              {t('start-date')}: {formatDate(task.startDate)}
            </Text>
            <Text mt={2} fontWeight="bold">
              {t('end-date')}: {formatDate(task.endDate)}
            </Text>
            <Badge mt={2} colorScheme={task.taskStatus === "COMPLETED" ? "green" : "red"}>
              {task.taskStatus === "COMPLETED" ? `${t('done')}` : `${t('in-progress')}`}
            </Badge>
            <TaskStatusModal 
                  task={task}
                  onTaskUpdate={onTaskUpdate}
                  accessToken={accessToken}
                />
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
