/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Image, Text, HStack, Box } from "@chakra-ui/react";
import React from "react";

export default function ProfileDataComponent({ user }: any) {
  return (
    <HStack
      spacing={6}  // Space between the image and the text
      align="center"  // Align items vertically centered
      mb={8}
    >
      <Image
        borderRadius="full"
        boxSize="120px"
        src={user.profileImage}
        fallbackSrc="/public/fallback-user.png"
        alt={`${user.firstName} ${user.lastName}`}
      />
      <Box>
        <Text fontSize="2xl" fontWeight="bold">
          {user.firstName} {user.lastName}
        </Text>
        {/* Optionally, add more user info here */}
      </Box>
    </HStack>
  );
}
