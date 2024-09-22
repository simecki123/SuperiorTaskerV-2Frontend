/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Heading, VStack, Text, HStack, Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import DeleteProjectModal from "../../modals/DeleteProjectConfirmation";

export default function GroupProjectsCardComponent({ projects }: any) {
  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<any>(null);
  const t = useTranslations('group-page')

  return (
    <VStack spacing={4} align="stretch">
      {projects.map((project: any) => (
        <Box key={project.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading fontSize="lg">{project.title}</Heading>
          <Text mt={2}>{project.description}</Text>
          <Text mt={2} fontWeight="bold">{t('start-date')}: {project.startDate}</Text>
          <Text mt={2} fontWeight="bold">{t('end-date')}: {project.endDate}</Text>
          <Text mt={2} fontWeight="bold">{t('completion')}: {project.completion}</Text>
          <HStack mt={4} justifyContent="flex-end">
            <Button 
              colorScheme="red" 
              variant="outline" 
              size="sm"
              _hover={{ bg: "red.100" }} 
              borderRadius="md"
              onClick={() => {
                setProjectToDelete(project);
                setIsDeleteProjectModalOpen(true);
              }}
            >
              {t('delete-project')}
            </Button>
            <DeleteProjectModal
              isOpen={isDeleteProjectModalOpen}
              onClose={() => setIsDeleteProjectModalOpen(false)}
              onConfirm={() => {
                // Handle delete project logic here
                console.log('Deleting project:', projectToDelete);
                setIsDeleteProjectModalOpen(false);
                setProjectToDelete(null);
              }}
              projectName={projectToDelete ? projectToDelete.title : ''}
            />
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};
