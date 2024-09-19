/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Badge, Box } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "../profile-page-components/user-data-options/all-tasks-components/Pagination";

export default function GroupProjectsTable({ projects }: any) { 
  const t = useTranslations('projects-page');
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getCompletionColor = (completion: any) => {
    const percentage = parseInt(completion);
    if (percentage < 25) return "red";
    if (percentage < 50) return "orange";
    if (percentage < 75) return "yellow";
    return "green";
  };

  // Get current projects
  const indexOfLastProject = currentPage * itemsPerPage;
  const indexOfFirstProject = indexOfLastProject - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const handleRowClick = (projectId: number) => {
    router.push(`/project-tasks?groupId=${groupId}&projectId=${projectId}`);
  };

  return (
    <Box>
      <Box overflowX="auto">
        <Table variant="simple" colorScheme="teal" size="md">
          <Thead>
            <Tr>
              <Th>{t('title')}</Th>
              <Th>{t('description')}</Th>
              <Th>{t('start-date')}</Th>
              <Th>{t('end-date')}</Th>
              <Th>{t('completion')}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentProjects.map((project: any) => (
              <Tr 
                key={project.id} 
                cursor="pointer" 
                onClick={() => handleRowClick(project.id)} // Make the row clickable
                _hover={{ bg: "xblue.100" }} // Add hover effect
              >
                <Td fontWeight="bold">{project.title}</Td>
                <Td>{project.description}</Td>
                <Td>{project.startDate}</Td>
                <Td>{project.endDate}</Td>
                <Td>
                  <Badge colorScheme={getCompletionColor(project.completion)} borderRadius="full" px={2}>
                    {project.completion}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Pagination 
        itemsPerPage={itemsPerPage} 
        totalItems={projects.length} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
}
