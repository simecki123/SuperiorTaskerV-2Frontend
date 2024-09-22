/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box } from "@chakra-ui/react";
import TaskStatusModal from "../../modals/TaskStatusModal";
import { useTranslations } from "next-intl";
import DeleteTaskModal from "../../modals/DeleteTaskConfirmationModal";

export default function GroupTasksTableComponent({ tasks }: any) {
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<any>(null);
  const t = useTranslations('group-page')

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>{t('title')}</Th>
          <Th>{t('description')}</Th>
          <Th>{t('project')}</Th>
          <Th>{t('status')}</Th>
          <Th>{t('actions')}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tasks.map((task: any) => (
          <Tr key={task.id}>
            <Td>{task.title}</Td>
            <Td>{task.description}</Td>
            <Td>{task.projectName}</Td>
            <Td>{task.status}</Td>
            <Td>
              <Box display="flex" alignItems="center" gap={4}> {/* Adds space between elements */}
                <TaskStatusModal />
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
                <DeleteTaskModal
                  isOpen={isDeleteTaskModalOpen}
                  onClose={() => setIsDeleteTaskModalOpen(false)}
                  onConfirm={() => {
                    // Handle delete task logic here
                    console.log('Deleting task:', taskToDelete);
                    setIsDeleteTaskModalOpen(false);
                    setTaskToDelete(null);
                  }}
                  taskName={taskToDelete ? taskToDelete.name : ''}
                />
              </Box>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
