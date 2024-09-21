/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Heading, VStack, Text, HStack, Button } from "@chakra-ui/react";
import React from "react";
import TaskStatusModal from "../../modals/TaskStatusModal";

export default function GroupTasksCardComponent({ tasks }: any) {
  return (
    <VStack spacing={4} align="stretch">
      {tasks.map((task: any) => (
        <Box key={task.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading fontSize="lg">{task.title}</Heading>
          <Text mt={2}>{task.description}</Text>
          <Text mt={2} fontWeight="bold">Project: {task.projectName}</Text>
          <Text mt={2} fontWeight="bold">Status: {task.status}</Text>
          <HStack mt={4} justifyContent="space-between">
            <TaskStatusModal />
            <Button 
              colorScheme="red" 
              size="sm"
              onClick={() => console.log(`Deleting task ${task.id}`)}
            >
              Delete Task
            </Button>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};
