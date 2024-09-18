"use client";
import React from "react";
import {  VStack, Heading, useMediaQuery } from "@chakra-ui/react";
import GroupProjectsTable from "@/app/components/group-projects/GroupProjectsTable";
import ProjectCards from "@/app/components/group-projects/ProjectCards";
import SearchbarForProjects from "@/app/components/group-projects/SearchBarForProjects";
import { useTranslations } from "next-intl";

const mockProjects = [
  { id: 1, title: "Website Redesign", description: "Overhaul company website", startDate: "2024-10-01", endDate: "2024-12-31", completion: "25%" },
  { id: 2, title: "Mobile App Development", description: "Create a new mobile app", startDate: "2024-09-15", endDate: "2025-03-31", completion: "10%" },
  { id: 3, title: "Data Migration", description: "Migrate data to new system", startDate: "2024-11-01", endDate: "2025-01-31", completion: "0%" },
  { id: 4, title: "AI Integration", description: "Implement AI features", startDate: "2025-01-01", endDate: "2025-06-30", completion: "5%" },
  { id: 5, title: "Security Audit", description: "Conduct annual security audit", startDate: "2024-12-01", endDate: "2024-12-31", completion: "50%" },
  // Add more mock projects here to test pagination
];

export default function Projects() {
  const t = useTranslations('projects-page');
  const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");

  return (
    <VStack spacing={6} align="stretch">
      <Heading as="h1" size="xl" textAlign="center" mb={4}>
        {t('group-projects')}
      </Heading>
      <SearchbarForProjects />
      
      {isLargerThanMd ? (
        <GroupProjectsTable projects={mockProjects} />
      ) : (
        <ProjectCards projects={mockProjects} />
      )}
    </VStack>
  );
}