/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Heading, VStack, Text, HStack, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import TaskStatusModal from "../../modals/TaskStatusModal";
import { useTranslations } from "next-intl";
import DeleteTaskModal from "../../modals/DeleteTaskConfirmationModal";

export default function GroupTasksCardComponent({ tasks }: any) {
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<any>(null);
  const t = useTranslations('group-page')
  return (
    <VStack spacing={4} align="stretch">
      {tasks.map((task: any) => (
        <Box key={task.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading fontSize="lg">{task.title}</Heading>
          <Text mt={2}>{task.description}</Text>
          <Text mt={2} fontWeight="bold">{t('project')}: {task.projectName}</Text>
          <Text mt={2} fontWeight="bold">{t('status')}: {task.status}</Text>
          <HStack mt={4} justifyContent="space-between">
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
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};
