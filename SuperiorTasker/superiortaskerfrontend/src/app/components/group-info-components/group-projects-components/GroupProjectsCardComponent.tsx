/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Heading, VStack, Text, HStack, Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React from "react";

export default function GroupProjectsCardComponent({ projects }: any) {
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
              size="sm"
              onClick={() => console.log(`Deleting project ${project.id}`)}
            >
              {t('delete-project')}
            </Button>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};
