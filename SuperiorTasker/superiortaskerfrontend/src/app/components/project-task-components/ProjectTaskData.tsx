/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from "react";
import SearchbarForProjects from "@/app/components/group-projects/SearchBarForProjects";
import { Heading, VStack, useBreakpointValue } from "@chakra-ui/react";
import ProjectTasksTable from "./ProjectTasksTable";
import ProjectTaskCards from "./ProjectTaskDataCard";
import { useTranslations } from "next-intl";

export default function ProjectTaskData({ tasks }: any) {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const t = useTranslations('project-tasks');

  return (
    <VStack spacing={6} align="stretch">
      <Heading as="h1" size="xl" textAlign="center" mb={4}>
        {t('group-tasks')}
      </Heading>
      <SearchbarForProjects />
      
      {isDesktop ? (
        <ProjectTasksTable tasks={tasks} />
      ) : (
        <ProjectTaskCards tasks={tasks} />
      )}
    </VStack>
  );
}
