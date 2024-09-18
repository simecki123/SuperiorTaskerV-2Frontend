/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { VStack, Box, Heading, Text, Badge } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export default function TaskCards({ tasks }: any) {
  const t = useTranslations('all-tasks-table');
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
            {task.status === "done" ? `${t('done')}` : `${t('in-progress')}`}
          </Badge>
        </Box>
      ))}
    </VStack>
  );
}