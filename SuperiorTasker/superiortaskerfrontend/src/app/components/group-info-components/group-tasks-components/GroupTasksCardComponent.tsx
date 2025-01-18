/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Heading, VStack, Text, HStack, Button, Badge } from "@chakra-ui/react";
import React, { useState } from "react";
import TaskStatusModal from "../../modals/TaskStatusModal";
import { useTranslations } from "next-intl";
import DeleteTaskModal from "../../modals/DeleteTaskConfirmationModal";
import { Task, TaskTableComponentProps } from "@/app/interfaces/types";

export default function GroupTasksCardComponent({ 
  user, 
  tasks, 
  onTaskUpdate, 
  accessToken, 
  setTasks, 
  isUserAdmin, 
  groupId 
}: TaskTableComponentProps) {
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const t = useTranslations('group-page');

  const handleTaskDelete = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const canManageTask = (task: Task) => {
    return isUserAdmin || user.id === task.userId;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <VStack spacing={4} align="stretch">
      {tasks.map((task: Task) => (
        <Box key={task.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading fontSize="lg">{task.name}</Heading>
          <Text mt={2}>{task.description}</Text>
          <HStack mt={2} spacing={4}>
            <Text fontWeight="bold">
              {t('start-date')}: {formatDate(task.startDate)}
            </Text>
            <Text fontWeight="bold">
              {t('end-date')}: {formatDate(task.endDate)}
            </Text>
          </HStack>
          <Box mt={2}>
            <Badge colorScheme={task.taskStatus === "COMPLETED" ? "green" : "yellow"}>
              {task.taskStatus === "COMPLETED" ? t('done') : t('in-progress')}
            </Badge>
          </Box>
          <HStack mt={4} spacing={4}>
            {canManageTask(task) && (
              <TaskStatusModal 
                task={task}
                onTaskUpdate={onTaskUpdate}
                accessToken={accessToken}
              />
            )}
            {isUserAdmin && (
              <Button 
                colorScheme="red" 
                variant="outline" 
                size="sm"
                _hover={{ bg: "red.100" }} 
                borderRadius="md"
                onClick={() => {
                  setTaskToDelete(task);
                  setIsDeleteTaskModalOpen(true);
                }}
              >
                {t('delete-task')}
              </Button>
            )}
          </HStack>
        </Box>
      ))}
      
      {taskToDelete && (
        <DeleteTaskModal
          isOpen={isDeleteTaskModalOpen}
          onClose={() => {
            setIsDeleteTaskModalOpen(false);
            setTaskToDelete(null);
          }}
          task={taskToDelete}
          accessToken={accessToken}
          onTaskDelete={handleTaskDelete}
        />
      )}
    </VStack>
  );
};