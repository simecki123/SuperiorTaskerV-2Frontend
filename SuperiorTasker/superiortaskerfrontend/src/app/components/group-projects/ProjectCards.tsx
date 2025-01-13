"use client";
import React from "react";
import { VStack, Box, Heading, Text, Badge, HStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { GroupCardAndTableProps, Project } from "@/app/interfaces/types";

export default function ProjectCards({projects, user, isUserAdmin=true, userProjectRelations = [] }: GroupCardAndTableProps) {
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

 const handleClick = (projectId: string) => {
   router.push(`/project-tasks?groupId=${groupId}&projectId=${projectId}`);
 };

 const hasProjectAccess = (projectId: string) => {
  return isUserAdmin || userProjectRelations.some(relation => relation.projectId === projectId);
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
         </Box>
       );
     })}
   </VStack>
 );
}