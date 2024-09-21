/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Avatar, Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export default function MembersTableComponent({ members }: any) {

  const t = useTranslations('group-page')

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>{t('profile-picture')}</Th>
          <Th>{t('first-name')}</Th>
          <Th>{t('last-name')}</Th>
          <Th>{t('remove-user-options')}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {members.map((member: any) => (
          <Tr key={member.id}>
            <Td>
              <Avatar 
                size="md" 
                src={member.profilePicture || "/path-to-default-profile.png"} 
                name={`${member.firstName} ${member.lastName}`} 
              />
            </Td>
            <Td>{member.firstName}</Td>
            <Td>{member.lastName}</Td>
            <Td>
              <Button 
                colorScheme="red" 
                variant="outline" 
                size="sm"
                _hover={{ bg: "red.100" }} 
                borderRadius="md"
              >
                {t('remove-member')}
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}