/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Badge, Box, Button, useToast, HStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { GroupCardAndTableProps, Project, ProjectData, ProjectRequest } from "@/app/interfaces/types";
import { deleteProject } from "@/app/server-actions/deleteProject";
import RemoveProjectModal from "../modals/RemoveProjectModal";
import { updateProject } from "@/app/server-actions/updateProject";
import UpdateProjectModal from "../modals/UpdateProjectModal";


export default function GroupProjectsTable( {projects, setProjects, accessToken, isUserAdmin=true, userProjectRelations = []}: GroupCardAndTableProps ) { 
  const t = useTranslations('projects-page');
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");
  const [isRemoveProjectModalOpen, setIsRemoveProjectModalOpen] = useState(false);
  const [isUpdateProjectModalOpen, setIsUpdateProjectModalOpen] = useState(false);
  const [projectToRemove, setProjectToRemove] = useState<Project | null>(null);
  const [projectToUpdate, setProjectToUpdate] = useState<Project | null>(null);
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
    console.log("user project relations ", userProjectRelations);
    console.log("projectId ", projectId);
    console.log("is user admin ", isUserAdmin);
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

  const handleUpdateProject = async (projectData: ProjectData) => {
    if (!projectToUpdate) return;

    setIsLoading(true);
    try {
      const projectRequest: ProjectRequest = {
        userId: projectToUpdate.userId,
        groupId: projectToUpdate.groupId,
        name: projectData.name,
        description: projectData.description,
        startDate: projectData.startDate,
        endDate: projectData.endDate
      };

      const updatedProject = await updateProject(projectRequest,projectToUpdate.id, accessToken);
      
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === projectToUpdate.id ? updatedProject : project
        )
      );

      setIsUpdateProjectModalOpen(false);
      setProjectToUpdate(null);

      toast({
        title: "Success",
        description: "Project updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update project",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
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
              {isUserAdmin && (
              <Th>{t('actions')}</Th>
              )}
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
                _hover={{ bg: isClickable ? "teal.500" : "inherit" }}
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
                  <HStack spacing={2}>
                    <Button 
                      colorScheme="blue" 
                      variant="outline" 
                      size="sm"
                      _hover={{ bg: "blue.100" }} 
                      borderRadius="md"
                      isLoading={isLoading}
                      onClick={(e) => {
                        e.stopPropagation();
                        setProjectToUpdate(project);
                        setIsUpdateProjectModalOpen(true);
                      }}
                    >
                      {t('edit')}
                    </Button>
                    <Button 
                      colorScheme="red" 
                      variant="outline" 
                      size="sm"
                      _hover={{ bg: "red.100" }} 
                      borderRadius="md"
                      isLoading={isLoading} 
                      onClick={(e) => {
                        e.stopPropagation();
                        setProjectToRemove(project);
                        setIsRemoveProjectModalOpen(true);
                      }}
                    >
                      {t('delete-project')}
                    </Button>
                  </HStack>
                )}
              </Td>
              {projectToUpdate && (
                <UpdateProjectModal
                  isOpen={isUpdateProjectModalOpen}
                  onClose={() => {
                    setIsUpdateProjectModalOpen(false);
                    setProjectToUpdate(null);
                  }}
                  project={projectToUpdate}
                  onUpdateProject={handleUpdateProject}
                />
              )}
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
