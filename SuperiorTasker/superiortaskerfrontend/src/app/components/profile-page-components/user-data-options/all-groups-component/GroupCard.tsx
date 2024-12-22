/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { VStack, Box, Heading, Text, Image } from "@chakra-ui/react";


export default function GroupCard({ groups }: any) {
  return (
    <VStack spacing={4} align="stretch">
      {groups.map((group: any) => (
        <Box key={group.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Image
              key={group.id}
              className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
              objectFit="cover"
              src={group.photoUri}
              fallbackSrc="/fallback-group.png"
              boxSize={14}
              alt={`${group.name} group`}
            />
          <Heading fontSize="xl">{group.title}</Heading>
          <Text mt={2}>{group.description}</Text>
        </Box>
      ))}
    </VStack>
  )
};

