/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react"
import { useBreakpointValue, Text, Box, Button } from "@chakra-ui/react";
import Pagination from "../../profile-page-components/user-data-options/all-tasks-components/Pagination";
import GroupTasksTableComponent from "../group-tasks-components/GroupTasksTableComponent";
import GroupTasksCardComponent from "../group-tasks-components/GroupTasksCardComponent";
import { useTranslations } from "next-intl";
import CreateTaskModal from "../../modals/CreateNewTaskModal";

const ITEMS_PER_PAGE = 4;

export default function AllGroupTaskComponents({tasks}: any) {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([
    {
      id: "1",
      name: "Website Redesign",
      description: "Revamp the company's main website to improve user experience and modernize the design."
    },
    {
      id: "2",
      name: "Website Redesign",
      description: "Revamp the company's main website to improve user experience and modernize the design."
    },
    {
      id: "3",
      name: "Website Redesign",
      description: "Revamp the company's main website to improve user experience and modernize the design."
    }
  ]);
  const t = useTranslations('group-page')
  const [currentPage, setCurrentPage] = useState(1);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  if (tasks.length === 0) {
    return <Text>No projects available.</Text>;
  }

  const indexOfLastTask = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstTask = indexOfLastTask - ITEMS_PER_PAGE;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <Box>
      <Button 
        colorScheme="blue" 
        variant="solid" 
        size="md" 
        mb={4} 
        _hover={{ bg: "blue.600" }} 
        borderRadius="md"
        onClick={() => setIsCreateTaskModalOpen(true)}
      >
        {t('create-new-task')}
      </Button>
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        onCreateTask={(taskData) => {
          // Handle creating task logic here
          console.log('New task data:', taskData);
          setIsCreateTaskModalOpen(false);
        }}
        projects={projects}
      />
      {isDesktop ? (
        <GroupTasksTableComponent tasks={currentTasks} />
      ) : (
        <GroupTasksCardComponent tasks={currentTasks} />
      )}
      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={tasks.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};

