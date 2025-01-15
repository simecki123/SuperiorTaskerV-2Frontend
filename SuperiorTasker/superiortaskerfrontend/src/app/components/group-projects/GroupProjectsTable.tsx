/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Badge, Box } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { GroupCardAndTableProps, Project } from "@/app/interfaces/types";


export default function GroupProjectsTable( {projects, user, isUserAdmin=true, userProjectRelations = []}: GroupCardAndTableProps ) { 
  const t = useTranslations('projects-page');
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");

  const getCompletionColor = (completion: any) => {
    const percentage = parseInt(completion);
    if (percentage < 25) return "red";
    if (percentage < 50) return "orange";
    if (percentage < 75) return "yellow";
    return "green";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleRowClick = (projectId: string) => {
    router.push(`/project-tasks?groupId=${groupId}&projectId=${projectId}`);
  };

  const hasProjectAccess = (projectId: string) => {
    return isUserAdmin || userProjectRelations.some(relation => relation.projectId === projectId);
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
          {projects.map((project: Project) => {
            const isClickable = hasProjectAccess(project.id);
            return (
              <Tr 
                key={project.id} 
                cursor={isClickable ? "pointer" : "default"} 
                onClick={() => isClickable && handleRowClick(project.id)}
                _hover={{ bg: isClickable ? "xblue.100" : "inherit" }}
              >
                <Td fontWeight="bold">{project.name}</Td>
                <Td>{project.description}</Td>
                <Td>{formatDate(project.startDate)}</Td>
                <Td>{formatDate(project.endDate)}</Td>
                <Td>
                  <Badge colorScheme={getCompletionColor(project.completion)} borderRadius="full" px={2}>
                    {project.completion} %
                  </Badge>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
        </Table>
      </Box>
      
    </Box>
  );
}
