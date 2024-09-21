/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Heading, VStack, Text, HStack, Button } from "@chakra-ui/react";
import React from "react";

export default function GroupProjectsCardComponent({ projects }: any) {
  return (
    <VStack spacing={4} align="stretch">
      {projects.map((project: any) => (
        <Box key={project.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading fontSize="lg">{project.title}</Heading>
          <Text mt={2}>{project.description}</Text>
          <Text mt={2} fontWeight="bold">Start Date: {project.startDate}</Text>
          <Text mt={2} fontWeight="bold">End Date: {project.endDate}</Text>
          <Text mt={2} fontWeight="bold">Completion: {project.completion}</Text>
          <HStack mt={4} justifyContent="flex-end">
            <Button 
              colorScheme="red" 
              size="sm"
              onClick={() => console.log(`Deleting project ${project.id}`)}
            >
              Delete Project
            </Button>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};
