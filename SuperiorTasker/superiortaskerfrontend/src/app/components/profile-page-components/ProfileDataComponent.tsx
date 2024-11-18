"use client";
import { Avatar, Text, HStack, Box, Button, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import EditProfileModal from "../modals/EditProfileModal";
import { User } from "@/app/interfaces/types";

interface ProfileDataComponentProps {
  user: User;
  accessToken: string;
}

export default function ProfileDataComponent({ 
  user: initialUser, 
  accessToken 
}: ProfileDataComponentProps) {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(initialUser);

  return (
    <>
      <HStack spacing={6} align="center" mb={8}>
        <Avatar
          name={`${user.firstName} ${user.lastName}`}
          src={user.profileUri}
          size="2xl"
        />
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            {user.firstName} {user.lastName}
          </Text>
          <Text fontStyle={user.description ? "normal" : "italic"} color="gray.500">
            {user.description || "Description goes here..."}
          </Text>
        </Box>

        <Button onClick={onOpen}>Edit profile</Button>
      </HStack>

      <EditProfileModal 
        isOpen={isOpen} 
        onClose={onClose} 
        user={{...user, accessToken}} 
        setUser={setUser}
      />
    </>
  );
}