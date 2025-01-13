/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react"
import { useBreakpointValue, Text, Box, Button } from "@chakra-ui/react";
import GroupProjetsTableComponents from "../group-projects-components/GroupProjectsTableComponent";
import Pagination from "../../profile-page-components/user-data-options/all-tasks-components/Pagination";
import GroupProjectsCardComponent from "../group-projects-components/GroupProjectsCardComponent";
import { useTranslations } from "next-intl";
import CreateProjectModal from "../../modals/CreateNewProjectModal";
import { useSearchParams } from "next/navigation";
import { AllGroupMembersProps, Project, ProjectBodySearch, UserProjectRelation } from "@/app/interfaces/types";
import { fetchProjectsFromServer } from "@/app/server-actions/fetchProjectsFromServer";
import GroupProjectsTable from "../../group-projects/GroupProjectsTable";
import ProjectCards from "../../group-projects/ProjectCards";
import { fetchUserProjectRelations } from "@/app/server-actions/fetchUserProject";





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
        userId: user.id,
        projectId: project.id,
        groupId: groupId
      }));

      console.log("UserPrRelationRequests ", relationRequests)

      const relations = await fetchUserProjectRelations(relationRequests, accessToken);
      setUserProjectRelations(relations);
      console.log("UserPrRelationResponse ", relations)
      
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
        <GroupProjectsTable 
            projects={projects}
            user={user}
            isUserAdmin={isUserAdmin} 
            userProjectRelations={userProjectRelations} />
      ) : (
        <ProjectCards 
            projects={projects}
            user={user}
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

