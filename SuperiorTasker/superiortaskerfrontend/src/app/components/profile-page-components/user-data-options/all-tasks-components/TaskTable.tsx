/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Badge } from "@chakra-ui/react";

export default function TaskTable({ tasks }: any) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Description</Th>
          <Th>Project</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tasks.map((task: any) => (
          <Tr key={task.id}>
            <Td>{task.title}</Td>
            <Td>{task.description}</Td>
            <Td>{task.projectName}</Td>
            <Td>
              <Badge colorScheme={task.status === "done" ? "green" : "red"}>
                {task.status === "done" ? "Done" : "In Progress"}
              </Badge>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}