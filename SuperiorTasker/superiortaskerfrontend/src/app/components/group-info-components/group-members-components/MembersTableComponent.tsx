/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Avatar, Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import RemoveUserModal from "../../modals/RemoveUserModal";

export default function MembersTableComponent({ members }: any) {

  const t = useTranslations('group-page')
  const [isRemoveUserModalOpen, setIsRemoveUserModalOpen] = useState(false);
  const [userToRemove, setUserToRemove] = useState<any>(null);

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
              size="sm" 
              onClick={() => {
                setUserToRemove(member);
                setIsRemoveUserModalOpen(true);
              }}
            >
              {t('remove-member')}
            </Button>
            <RemoveUserModal
              isOpen={isRemoveUserModalOpen}
              onClose={() => setIsRemoveUserModalOpen(false)}
              onConfirm={() => {
                // Handle remove user logic here
                console.log('Removing user:', userToRemove);
                setIsRemoveUserModalOpen(false);
                setUserToRemove(null);
              }}
              userName={userToRemove ? `${userToRemove.firstName} ${userToRemove.lastName}` : ''}
            />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}