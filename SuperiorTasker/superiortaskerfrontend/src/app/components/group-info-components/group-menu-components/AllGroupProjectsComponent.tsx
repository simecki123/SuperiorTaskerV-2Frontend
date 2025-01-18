/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react"
import { useBreakpointValue, Text, Box, Button, useToast } from "@chakra-ui/react";
import GroupProjetsTableComponents from "../group-projects-components/GroupProjectsTableComponent";
import Pagination from "../../profile-page-components/user-data-options/all-tasks-components/Pagination";
import GroupProjectsCardComponent from "../group-projects-components/GroupProjectsCardComponent";
import { useTranslations } from "next-intl";
import CreateProjectModal from "../../modals/CreateNewProjectModal";
import { useSearchParams } from "next/navigation";
import { AllGroupMembersProps, Project, ProjectBodySearch, ProjectData, ProjectRequest, UserProjectRelation } from "@/app/interfaces/types";
import { fetchProjectsFromServer } from "@/app/server-actions/fetchProjectsFromServer";
import GroupProjectsTable from "../../group-projects/GroupProjectsTable";
import ProjectCards from "../../group-projects/ProjectCards";
import { fetchUserProjectRelations } from "@/app/server-actions/fetchUserProjectRelations";
import { createNewProject } from "@/app/server-actions/createNewProject";


export default function AllGroupProjectsComponent({ user, accessToken }: AllGroupMembersProps) {
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const t = useTranslations('group-page');
  const [projects, setProjects] = useState<Project[]>([]);
  const [userProjectRelations, setUserProjectRelations] = useState<UserProjectRelation[]>([]);
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const toast = useToast();
  const groupId = searchParams.get('groupId') || '0';
  const isUserAdmin = user.groupMembershipData.some(
    membership => membership.groupId === groupId && membership.role === "ADMIN"
  );


  const loadGroupProjects = useCallback(async () => {
    if (!user?.id) return;

    const searchConditions: ProjectBodySearch = {
      userId: '',
      groupId,
      startCompletion: '',
      endCompletion: '',
      includeComplete: false,
      includeNotStarted: false,
      search: ''
    };
    
    setLoading(true);
    setError(null);

    try {
      const currentProjects = await fetchProjectsFromServer(searchConditions, user, accessToken, currentPage);
      const nextPageProjects = await fetchProjectsFromServer(searchConditions, user, accessToken, currentPage + 1);

      setProjects(currentProjects);
      setHasNextPage(nextPageProjects.length > 0); 

      const relationRequests = currentProjects.map(project => ({
        projectId: project.id,
        userId: user.id,
        groupId: groupId
      }));


      const relations = await fetchUserProjectRelations(relationRequests, accessToken);
      setUserProjectRelations(relations);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setProjects([]);
      setUserProjectRelations([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, groupId, user, accessToken]);
  
  useEffect(() => {
    const controller = new AbortController();
    loadGroupProjects();
    return () => {
      controller.abort();
    };
  }, [loadGroupProjects]); 

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const handleCreateProject = async (projectData: ProjectData) => {
    try {
      const projectRequest: ProjectRequest = {
        userId: user.id,
        groupId: groupId,
        name: projectData.name,
        description: projectData.description,
        startDate: projectData.startDate,
        endDate: projectData.endDate
      };
      const newProject = await createNewProject(projectRequest, accessToken);
      
      setProjects(prevProjects => [newProject, ...prevProjects]);
      
      const newRelation = await fetchUserProjectRelations([{
        projectId: newProject.id,
        userId: user.id,
        groupId: groupId
      }], accessToken);
      
      setUserProjectRelations(prev => [...newRelation, ...prev]);

      toast({
        title: "Project created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setIsCreateProjectModalOpen(false);
    } catch (error) {
      toast({
        title: "Error creating project",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      {isUserAdmin && (
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
      )}
      {isUserAdmin && (
        <CreateProjectModal
        isOpen={isCreateProjectModalOpen}
        onClose={() => setIsCreateProjectModalOpen(false)}
        onCreateProject={handleCreateProject}
      />
      )}
      {isDesktop ? (
        <GroupProjectsTable 
            projects={projects}
            accessToken={accessToken}
            setProjects={setProjects}
            isUserAdmin={isUserAdmin} 
            userProjectRelations={userProjectRelations} />
      ) : (
        <ProjectCards 
            projects={projects}
            accessToken={accessToken}
            setProjects={setProjects}
            isUserAdmin={isUserAdmin} 
            userProjectRelations={userProjectRelations} />
      )}
      <Pagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasNextPage={hasNextPage}
          />
    </Box>
  );
};

