/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";

export default function GroupProjectsTableComponent({ projects }: any) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Project Title</Th>
          <Th>Description</Th>
          <Th>Start Date</Th>
          <Th>End Date</Th>
          <Th>Completion</Th>
          <Th>Delete Project</Th>
        </Tr>
      </Thead>
      <Tbody>
        {projects.map((project: any) => (
          <Tr key={project.id}>
            <Td>{project.title}</Td>
            <Td>{project.description}</Td>
            <Td>{project.startDate}</Td>
            <Td>{project.endDate}</Td>
            <Td>{project.completion}</Td>
            <Td>
              <Button 
                colorScheme="red" 
                variant="outline" 
                size="sm"
                _hover={{ bg: "red.100" }} 
                borderRadius="md"
                onClick={() => console.log(`Deleting project ${project.id}`)}
              >
                Delete Project
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
