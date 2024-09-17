/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";


export default function GroupTable({ groups }: any) {
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
        {groups.map((group: any) => (
          <Tr key={group.id}>
            <Td>{group.title}</Td>
            <Td>{group.description}</Td>
            <Td>{group.projectsCount}</Td>
            <Td>{group.usersCount}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
};

