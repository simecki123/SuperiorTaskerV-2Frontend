/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { VStack, Box, Heading, Text, Badge, HStack, useToast, Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { GroupCardAndTableProps, Project } from "@/app/interfaces/types";
import { deleteProject } from "@/app/server-actions/deleteProject";
import RemoveProjectModal from "../modals/RemoveProjectModal";

export default function ProjectCards({projects,setProjects, accessToken, isUserAdmin=true, userProjectRelations = [] }: GroupCardAndTableProps) {
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

 const handleClick = (projectId: string) => {
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
   <VStack spacing={4} align="stretch">
     {projects.map((project: Project) => {
       const isClickable = hasProjectAccess(project.id);
       return (
         <Box
           key={project.id}
           p={5}
           shadow="md"
           borderWidth="1px"
           borderRadius="md"
           cursor={isClickable ? "pointer" : "default"}
           onClick={() => isClickable && handleClick(project.id)}
           _hover={isClickable ? { bg: "gray.100", shadow: "lg" } : {}}
         >
           <Heading fontSize="xl">{project.name}</Heading>
           <Text mt={2}>{project.description}</Text>
           <HStack mt={2} justify="space-between">
             <Text fontWeight="bold">{t('start-date')}: {project.startDate}</Text>
             <Text fontWeight="bold">{t('end-date')}: {project.endDate}</Text>
           </HStack>
           <Badge mt={2} colorScheme={getCompletionColor(project.completion)}>
             {t('completion')}: {project.completion}
           </Badge>
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
              <RemoveProjectModal
                isOpen={isRemoveProjectModalOpen}
                onClose={() => {
                  setIsRemoveProjectModalOpen(false);
                  setProjectToRemove(null);
                }}
                onConfirm={removeProject}
                userName={projectToRemove ? `${projectToRemove.name}` : ''}
              />
         </Box>
       );
     })}
   </VStack>
 );
}