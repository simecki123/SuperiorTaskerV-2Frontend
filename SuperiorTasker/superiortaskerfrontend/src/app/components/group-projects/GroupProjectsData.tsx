/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from "react"
import {  VStack, Heading, useBreakpointValue } from "@chakra-ui/react";
import GroupProjectsTable from "@/app/components/group-projects/GroupProjectsTable";
import ProjectCards from "@/app/components/group-projects/ProjectCards";
import SearchbarForProjects from "@/app/components/group-projects/SearchBarForProjects";
import { useTranslations } from "next-intl";

export default function GroupProjectsData({mockProjects}: any) {
    const t = useTranslations('projects-page');
    const isDesktop = useBreakpointValue({ base: false, md: true });
    return (
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" mb={4}>
          {t('group-projects')}
        </Heading>
        <SearchbarForProjects />
        
        {isDesktop ? (
          <GroupProjectsTable projects={mockProjects} />
        ) : (
          <ProjectCards projects={mockProjects} />
        )}
      </VStack>
    );
};

