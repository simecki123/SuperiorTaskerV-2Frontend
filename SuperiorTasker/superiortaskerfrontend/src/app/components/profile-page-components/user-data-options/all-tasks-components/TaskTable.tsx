/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Badge } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export default function TaskTable({ tasks }: any) {
  const t = useTranslations('all-tasks-table')
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>{t('title')}</Th>
          <Th>{t('description')}</Th>
          <Th>{t('project')}</Th>
          <Th>{t('status')}</Th>
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
                {task.status === "done" ? `${t('done')}` : `${t('in-progress')}` }
              </Badge>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}