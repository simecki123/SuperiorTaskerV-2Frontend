/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Box } from "@chakra-ui/react";
import TaskStatusModal from "../../modals/TaskStatusModal";

export default function GroupTasksTableComponent({ tasks }: any) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Description</Th>
          <Th>Project</Th>
          <Th>Status</Th>
          <Th>Actions</Th>
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
                  onClick={() => console.log(`Deleting task ${task.id}`)}
                >
                  Delete Task
                </Button>
              </Box>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
