/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { Table, Thead, Tbody, Tr, Th, Td, Image } from "@chakra-ui/react";
import { useTranslations } from "next-intl";


export default function GroupTable({ groups }: any) {
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
            <Image
              key={group.id}
              className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
              objectFit="cover"
              src={group.photoUri}
              fallbackSrc="/fallback-group.png"
              boxSize={14}
              alt={`${group.name} group`}
            />
            <Td>{group.name}</Td>
            <Td>{group.description}</Td>
            
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
};

