/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { Table, Thead, Tbody, Tr, Th, Td, Image } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { GroupTableProps } from "@/app/interfaces/types";

export default function GroupTable({ groups }: GroupTableProps) {
  const t = useTranslations('my-groups-table');
  
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>{t('image')}</Th>
          <Th>{t('title')}</Th>
          <Th>{t('description')}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {groups?.map((group: any) => (
          <Tr key={group.id}>
            <Td>
              <Image
                className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                objectFit="cover"
                src={group.photoUri}
                fallbackSrc="/fallback-group.png"
                boxSize={14}
                alt={`${group.name} group`}
              />
            </Td>
            <Td>{group.name}</Td>
            <Td>{group.description}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}