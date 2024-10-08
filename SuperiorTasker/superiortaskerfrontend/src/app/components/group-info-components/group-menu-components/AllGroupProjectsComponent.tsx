/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react"
import { useBreakpointValue, Text, Box, Button } from "@chakra-ui/react";
import GroupProjetsTableComponents from "../group-projects-components/GroupProjectsTableComponent";
import Pagination from "../../profile-page-components/user-data-options/all-tasks-components/Pagination";
import GroupProjectsCardComponent from "../group-projects-components/GroupProjectsCardComponent";
import { useTranslations } from "next-intl";
import CreateProjectModal from "../../modals/CreateNewProjectModal";


const ITEMS_PER_PAGE = 4;


export default function AllGroupProjectsComponent({projects}: any) {
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const t = useTranslations('group-page')
  const [currentPage, setCurrentPage] = useState(1);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  if (projects.length === 0) {
    return <Text>No projects available.</Text>;
  }

  const indexOfLastProject = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProject = indexOfLastProject - ITEMS_PER_PAGE;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <Box>
      <Button 
        colorScheme="blue"
        variant="solid"
        size="md"
        mb={4}
        _hover={{ bg: "blue.600" }}
        borderRadius="md"
        onClick={() => setIsCreateProjectModalOpen(true)}
      >
        {t('create-new-project')}
      </Button>
      <CreateProjectModal
        isOpen={isCreateProjectModalOpen}
        onClose={() => setIsCreateProjectModalOpen(false)}
        onCreateProject={(projectData) => {
          // Handle creating project logic here
          console.log('New project data:', projectData);
          setIsCreateProjectModalOpen(false);
        }}
      />
      {isDesktop ? (
        <GroupProjetsTableComponents projects={currentProjects} />
      ) : (
        <GroupProjectsCardComponent projects={currentProjects} />
      )}
      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={projects.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};

