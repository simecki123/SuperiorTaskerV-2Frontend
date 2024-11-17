/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Badge } from "@chakra-ui/react";
import { useTranslations, useLocale } from "next-intl";

export default function TaskTable({ tasks }: any) {
  const t = useTranslations('all-tasks-table');
  const locale = useLocale();

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(locale, options);
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
        </Tr>
      </Thead>
      <Tbody>
        {tasks.map((task: any) => (
          <Tr key={task.id}>
            <Td>{task.name}</Td>
            <Td>{task.description}</Td>
            <Td>{formatDate(task.startDate)}</Td>
            <Td>{formatDate(task.endDate)}</Td>
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