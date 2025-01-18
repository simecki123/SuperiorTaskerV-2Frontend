/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box, Badge } from "@chakra-ui/react";
import TaskStatusModal from "../../modals/TaskStatusModal";
import { useTranslations } from "next-intl";
import DeleteTaskModal from "../../modals/DeleteTaskConfirmationModal";
import { Task, TaskTableComponentProps } from "@/app/interfaces/types";

export default function GroupTasksTableComponent({ 
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
  const t = useTranslations('project-tasks');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const canManageTask = (task: Task) => {
    return isUserAdmin || user.id === task.userId;
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>{t('title')}</Th>
          <Th>{t('description')}</Th>
          <Th>{t('start-date')}</Th>
          <Th>{t('end-date')}</Th>
          <Th>{t('status')}</Th>
          <Th>{t('actions')}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tasks.map((task: Task) => (
          <Tr key={task.id}>
            <Td>{task.name}</Td>
            <Td>{task.description}</Td>
            <Td>{formatDate(task.startDate)}</Td>
            <Td>{formatDate(task.endDate)}</Td>
            <Td>
              <Badge colorScheme={task.taskStatus === "COMPLETED" ? "green" : "yellow"}>
                {task.taskStatus === "COMPLETED" ? t('done') : t('in-progress')}
              </Badge>
            </Td>
            <Td>
              <Box display="flex" alignItems="center" gap={4}>
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
              </Box>
            </Td>
          </Tr>
        ))}
      </Tbody>
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
    </Table>
  );
};