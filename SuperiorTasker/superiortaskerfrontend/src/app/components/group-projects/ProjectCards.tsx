/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { VStack, Box, Heading, Text, Badge, HStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import Pagination from "../profile-page-components/user-data-options/all-tasks-components/Pagination";

export default function ProjectCards({ projects }: any) {
  const t = useTranslations('projects-page');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastProject = currentPage * itemsPerPage;
  const indexOfFirstProject = indexOfLastProject - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const getCompletionColor = (completion: any) => {
    const percentage = parseInt(completion);
    if (percentage < 25) return "red";
    if (percentage < 50) return "orange";
    if (percentage < 75) return "yellow";
    return "green";
  };

  return (
    <VStack spacing={4} align="stretch">
      {currentProjects.map((project: any) => (
        <Box key={project.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading fontSize="xl">{project.title}</Heading>
          <Text mt={2}>{project.description}</Text>
          <HStack mt={2} justify="space-between">
            <Text fontWeight="bold">{t('start-date')}: {project.startDate}</Text>
            <Text fontWeight="bold">{t('end-date')}: {project.endDate}</Text>
          </HStack>
          <Badge mt={2} colorScheme={getCompletionColor(project.completion)}>
            {t('completion')}: {project.completion}
          </Badge>
        </Box>
      ))}
      <Pagination 
        itemsPerPage={itemsPerPage} 
        totalItems={projects.length} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </VStack>
  );
}