/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { VStack, Box, Heading, Text, Badge } from "@chakra-ui/react";

export default function TaskCards({ tasks }: any) {
  return (
    <VStack spacing={4} align="stretch">
      {tasks.map((task: any) => (
        <Box key={task.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading fontSize="xl">{task.title}</Heading>
          <Text mt={2}>{task.description}</Text>
          <Text mt={2} fontWeight="bold">
            Project: {task.projectName}
          </Text>
          <Badge mt={2} colorScheme={task.status === "done" ? "green" : "red"}>
            {task.status === "done" ? "Done" : "In Progress"}
          </Badge>
        </Box>
      ))}
    </VStack>
  );
}