import { Box, Heading, VStack, Text, Avatar, HStack, Button, useToast, Badge } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import RemoveUserModal from "../../modals/RemoveUserModal";
import { GroupMember, User } from "@/app/interfaces/types";
import { kickUserFromGroup } from "@/app/server-actions/kickUserFromGroup";

interface MembersCardComponentProps {
  user: User;
  members: GroupMember[];
  setMembers: (members: GroupMember[]) => void;
  isUserAdmin: boolean;
  groupId: string;
}

export default function MembersCardComponent({ 
  user, 
  members, 
  setMembers, 
  isUserAdmin,
  groupId 
}: MembersCardComponentProps) {
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
    <VStack spacing={4} align="stretch">
      {members.map((member: GroupMember) => (
        <Box 
          key={member.userId} 
          p={5} 
          shadow="md" 
          borderWidth="1px" 
          borderRadius="md"
        >
          <HStack spacing={4} align="start">
            <Avatar 
              size="lg" 
              src={member.photoUri || "/path-to-default-profile.png"} 
              name={`${member.firstName} ${member.lastName}`} 
            />
            <Box flex="1">
              <Heading fontSize="lg">{member.firstName} {member.lastName}</Heading>
              <Text mt={2} color="gray.600">{member.description}</Text>
              <Text mt={1} fontWeight="medium" color="blue.600">
              <Badge colorScheme={member.role === 'ADMIN' ? 'yellow' : 'blue'}>
                {member.role}
              </Badge>
              </Text>
            </Box>
          </HStack>
          
          {isUserAdmin && (
            <HStack mt={4} justifyContent="flex-end">
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
            </HStack>
          )}
        </Box>
      ))}

      <RemoveUserModal
        isOpen={isRemoveUserModalOpen}
        onClose={() => {
          setIsRemoveUserModalOpen(false);
          setUserToRemove(null);
        }}
        onConfirm={removeUser}
        userName={userToRemove ? `${userToRemove.firstName} ${userToRemove.lastName}` : ''}
      />
    </VStack>
  );
}