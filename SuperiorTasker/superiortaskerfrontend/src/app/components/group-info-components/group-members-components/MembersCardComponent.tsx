/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Heading, VStack, Text, Avatar, HStack, Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import RemoveUserModal from "../../modals/RemoveUserModal";

export default function MembersCardComponent({ members }: any) {

  const t = useTranslations('group-page')
  const [isRemoveUserModalOpen, setIsRemoveUserModalOpen] = useState(false);
  const [userToRemove, setUserToRemove] = useState<any>(null);
  

  return (
    <VStack spacing={4} align="stretch">
      {members.map((member: any) => (
        <Box key={member.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <HStack spacing={4}>
            <Avatar 
              size="lg" 
              src={member.profilePicture || "/path-to-default-profile.png"} 
              name={`${member.firstName} ${member.lastName}`} 
            />
            <Box>
              <Heading fontSize="lg">{member.firstName} {member.lastName}</Heading>
              <Text mt={2} fontWeight="bold">{t('member-id')} {member.id}</Text>
            </Box>
          </HStack>
          <HStack mt={4} justifyContent="flex-end">
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
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};
