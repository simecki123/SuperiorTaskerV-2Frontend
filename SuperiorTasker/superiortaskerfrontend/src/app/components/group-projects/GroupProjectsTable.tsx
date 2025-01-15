/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Badge, Box, Button, useToast } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { GroupCardAndTableProps, Project } from "@/app/interfaces/types";
import { deleteProject } from "@/app/server-actions/deleteProject";
import RemoveProjectModal from "../modals/RemoveProjectModal";


export default function GroupProjectsTable( {projects, setProjects, accessToken, isUserAdmin=true, userProjectRelations = []}: GroupCardAndTableProps ) { 
  const t = useTranslations('projects-page');
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");
  const [isRemoveProjectModalOpen, setIsRemoveProjectModalOpen] = useState(false);
  const [projectToRemove, setProjectToRemove] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

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

  const removeProject = async () => {
    if (!projectToRemove) return;
    
    setIsLoading(true);
    const result = await deleteProject(projectToRemove.id, accessToken);
    setIsLoading(false);
    setIsRemoveProjectModalOpen(false);

    if (result.success) {
      setProjects(prevProjects => 
        prevProjects.filter(project => project.id !== projectToRemove.id)
    );

      toast({
        title: "Success",
        description: result.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: result.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
              <Th>{t('delete-project')}</Th>
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
                <Td>
                {isUserAdmin && (
                <Button 
                  colorScheme="red" 
                  size="sm"
                  isLoading={isLoading} 
                  onClick={(e) => {
                    e.stopPropagation();
                    setProjectToRemove(project);
                    setIsRemoveProjectModalOpen(true);
                  }}
                >
                  {t('delete-project')}
                </Button>
              )}
              </Td>
              <RemoveProjectModal
                isOpen={isRemoveProjectModalOpen}
                onClose={() => {
                  setIsRemoveProjectModalOpen(false);
                  setProjectToRemove(null);
                }}
                onConfirm={removeProject}
                userName={projectToRemove ? `${projectToRemove.name}` : ''}
              />
              
              </Tr>
            );
          })}
        </Tbody>
        </Table>
      </Box>
      
    </Box>
  );
}
