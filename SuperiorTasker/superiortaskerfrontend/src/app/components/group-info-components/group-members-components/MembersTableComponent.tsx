import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Avatar, Button, useToast, Badge } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import RemoveUserModal from "../../modals/RemoveUserModal";
import { GroupMember, User } from "@/app/interfaces/types";
import { kickUserFromGroup } from "@/app/server-actions/kickUserFromGroup";

interface MemberTableComponentProps {
  user: User;
  members: GroupMember[];
  setMembers: (members: GroupMember[]) => void;
  isUserAdmin: boolean,
  groupId: string
}

export default function MembersTableComponent({ user, members, setMembers, isUserAdmin, groupId }: MemberTableComponentProps) {
  const t = useTranslations('group-page');
  const toast = useToast();
  const [isRemoveUserModalOpen, setIsRemoveUserModalOpen] = useState(false);
  const [userToRemove, setUserToRemove] = useState<GroupMember | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const removeUser = async () => {
    if (!userToRemove) return;
    
    setIsLoading(true);
    const result = await kickUserFromGroup(userToRemove, user, groupId);
    setIsLoading(false);
    setIsRemoveUserModalOpen(false);

    if (result.success) {
      const updatedMembers = members.filter(
        member => member.userId !== userToRemove.userId
      );
      setMembers(updatedMembers);

      toast({
        title: "Success",
        description: result.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: result.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>{t('profile-picture')}</Th>
          <Th>{t('first-name')}</Th>
          <Th>{t('last-name')}</Th>
          <Th>{t('description')}</Th>
          <Th>{t('role')}</Th>
          {isUserAdmin && (
            <Th>{t('remove-user-options')}</Th>
          )}
          
        </Tr>
      </Thead>
      <Tbody>
        {members.map((member: GroupMember) => (
          <Tr key={member.userId}>
            <Td>
              <Avatar 
                size="md" 
                src={member.photoUri || "/path-to-default-profile.png"} 
                name={`${member.firstName} ${member.lastName}`} 
              />
            </Td>
            <Td>{member.firstName}</Td>
            <Td>{member.lastName}</Td>
            <Td>
              {member.description || t('no-description')}
            </Td>
            <Td>
            <Badge colorScheme={member.role === 'ADMIN' ? 'yellow' : 'blue'}>
              {member.role}
            </Badge>
            </Td>
            <Td>
              {isUserAdmin && (
                <Button 
                  colorScheme="red" 
                  size="sm"
                  isLoading={isLoading} 
                  onClick={() => {
                    setUserToRemove(member);
                    setIsRemoveUserModalOpen(true);
                  }}
                >
                  {t('remove-member')}
                </Button>
              )}
              
              <RemoveUserModal
                isOpen={isRemoveUserModalOpen}
                onClose={() => {
                  setIsRemoveUserModalOpen(false);
                  setUserToRemove(null);
                }}
                onConfirm={removeUser}
                userName={userToRemove ? `${userToRemove.firstName} ${userToRemove.lastName}` : ''}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}