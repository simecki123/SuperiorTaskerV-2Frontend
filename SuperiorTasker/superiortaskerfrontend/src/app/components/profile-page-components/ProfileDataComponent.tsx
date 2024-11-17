/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Avatar, Text, HStack, Box, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import EditProfileModal from "../modals/EditProfileModal";
import { User } from "@/app/interfaces/types";

export default function ProfileDataComponent({ user }: {user: User}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack
        spacing={6}  // Space between the image and the text
        align="center"  // Align items vertically centered
        mb={8}
      >
        <Avatar
          name={`${user.firstName} ${user.lastName}`}  // This will display initials if no image
          src={user.profileUri}  // User's image
          size="2xl"  // Size of the avatar
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

      {/* Modal for editing profile */}
      <EditProfileModal isOpen={isOpen} onClose={onClose} user={user} />
    </>
  );
}
