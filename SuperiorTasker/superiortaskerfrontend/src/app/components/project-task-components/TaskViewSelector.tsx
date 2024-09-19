/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from "react";
import { Select, Box } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export default function TaskViewSelector() {
  const t = useTranslations('project-tasks');

  return (
    <Box width={{ base: "100%", md: "50%" }} mx="auto" mt={4}>
      <Select
        size="lg"
        variant="outline"
        focusBorderColor="xblue.100"
        borderRadius="md"
        shadow="sm"
        defaultValue="allTasks"
      >
        <option value="myTasks">{t('my-tasks')}</option>
        <option value="allTasks">{t('all-tasks')}</option>
      </Select>
    </Box>
  );
}
