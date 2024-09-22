/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react"
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import DeleteProjectModal from "../../modals/DeleteProjectConfirmation";

export default function GroupProjectsTableComponent({ projects }: any) {
  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<any>(null);
  const t = useTranslations('group-page')
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>{t('project-title')}</Th>
          <Th>{t('description')}</Th>
          <Th>{t('start-date')}</Th>
          <Th>{t('end-date')}</Th>
          <Th>{t('completion')}</Th>
          <Th>{t('delete-project')}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {projects.map((project: any) => (
          <Tr key={project.id}>
            <Td>{project.title}</Td>
            <Td>{project.description}</Td>
            <Td>{project.startDate}</Td>
            <Td>{project.endDate}</Td>
            <Td>{project.completion}</Td>
            <Td>
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
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
