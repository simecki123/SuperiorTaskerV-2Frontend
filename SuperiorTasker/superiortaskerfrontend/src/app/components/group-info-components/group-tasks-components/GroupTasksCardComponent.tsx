import { Box, Heading, VStack, Text, HStack, Button, Badge } from "@chakra-ui/react";
import React, { useState } from "react";
import TaskStatusModal from "../../modals/TaskStatusModal";
import UpdateTaskModal from "../../modals/UpdateTaskModal";
import DeleteTaskModal from "../../modals/DeleteTaskConfirmationModal";
import { useTranslations } from "next-intl";
import { Task, TaskTableComponentProps } from "@/app/interfaces/types";

export default function GroupTasksCardComponent({ 
  user, 
  tasks, 
  onTaskUpdate, 
  accessToken, 
  setTasks, 
  isUserAdmin, 
  handleUpdateTask 
}: TaskTableComponentProps) {
  const t = useTranslations('group-page');
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
            <Text fontWeight="bold">{t('start-date')}: {formatDate(task.startDate)}</Text>
            <Text fontWeight="bold">{t('end-date')}: {formatDate(task.endDate)}</Text>
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
              <>
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
                <Button
                  colorScheme="blue"
                  variant="outline"
                  size="sm"
                  _hover={{ bg: "blue.100"}}
                  borderRadius="md"
                  isLoading={isLoading}
                  onClick={() => {
                    setTaskToUpdate(task);
                    setIsUpdateTaskModalOpen(true);
                  }}
                >
                  {t('update-task')}
                </Button>
              </>
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

      {taskToUpdate && (
        <UpdateTaskModal
          user={user}
          isOpen={isUpdateTaskModalOpen}
          onClose={() => {
            setIsUpdateTaskModalOpen(false);
            setTaskToUpdate(null);
          }}
          task={taskToUpdate}
          onUpdateTask={handleUpdateTask}
          accessToken={accessToken}
        />
      )}
    </VStack>
  );
}