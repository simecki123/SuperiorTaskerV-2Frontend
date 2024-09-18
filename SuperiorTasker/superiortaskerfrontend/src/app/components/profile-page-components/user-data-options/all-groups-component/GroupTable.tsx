/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useTranslations } from "next-intl";


export default function GroupTable({ groups }: any) {
  const t = useTranslations('my-groups-table');
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

