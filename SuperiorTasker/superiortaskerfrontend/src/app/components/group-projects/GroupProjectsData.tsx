/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useState } from "react"
import {  VStack, Heading, useBreakpointValue, Spinner, Text } from "@chakra-ui/react";
import GroupProjectsTable from "@/app/components/group-projects/GroupProjectsTable";
import ProjectCards from "@/app/components/group-projects/ProjectCards";
import SearchbarForProjects from "@/app/components/group-projects/SearchBarForProjects";
import { useTranslations } from "next-intl";
import { GroupProjectsAndTasksDataProps, Project, ProjectBodySearch } from "@/app/interfaces/types";
import { fetchProjectsFromServer } from "@/app/server-actions/fetchProjectsFromServer";
import { useSearchParams, useRouter } from "next/navigation";
import Pagination from "../profile-page-components/user-data-options/all-tasks-components/Pagination";
import GroupProjectsFilters from "./GroupProjectsFilters";



export default function GroupProjectsData({user, accessToken}: GroupProjectsAndTasksDataProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('projects-page');
  const isDesktop = useBreakpointValue({ base: false, md: true });

  // Use searchParams to initialize state
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '0'));
  const [searchByText, setSearchByText] = useState((searchParams.get('search') || '').replace(/\+/g, ' '));
  const [startCompletion, setStartCompletion] = useState(searchParams.get('startCompletion') || '' );
  const [endCompletion, setEndCompletion] = useState(searchParams.get('endCompletion') || '');
  const [includeCompleted, setIncludeCompleted] = useState(searchParams.get('includeComplete') === 'true');
  const [includeNotStarted, setIncludeNotStarted] = useState(searchParams.get('includeNotStarted') === 'true');
  const groupId = searchParams.get('groupId');
  

  const [projects, setProjects] = useState<Project[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  

  // Function to update URL parameters
  const updateURLParams = (newParams: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, value]) => {
          if (value === null) {
              params.delete(key);
          } else {
              params.set(key, value);
          }
      });
      router.push(`?${params.toString()}`);
  };

  const handleSearchProjects = async () => {
      if (!groupId || !user?.id) return;

      const searchConditions: ProjectBodySearch = {
          userId: user.id,
          groupId,
          startCompletion: startCompletion,
          endCompletion: endCompletion,
          includeComplete: includeCompleted,
          includeNotStarted: includeNotStarted,
          search: searchByText
      };

      // Update URL parameters
      updateURLParams({
          search: searchByText || null,
          startCompletion: startCompletion || null,
          endCompletion: endCompletion || null,
          includeComplete: includeCompleted ? 'true' : null,
          includeNotStarted: includeNotStarted ? 'true' : null,
          page: currentPage.toString()
      });
      
      setLoading(true);
      setError(null);

      try {
          const currentProjects = await fetchProjectsFromServer(searchConditions, user, accessToken, currentPage);
          const nextPageProjects = await fetchProjectsFromServer(searchConditions, user, accessToken, currentPage + 1);

          setProjects(currentProjects);
          setHasNextPage(nextPageProjects.length > 0);
      } catch(error) {
          setError(error instanceof Error ? error.message : "An unknown error occurred");
          setProjects([]);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
    handleSearchProjects();
}, [
    currentPage, 
    groupId,
    searchByText,
    startCompletion, 
    endCompletion,
    includeCompleted,
    includeNotStarted
]);

  return (
      <VStack spacing={6} align="stretch">
          <Heading as="h1" size="xl" textAlign="center" mb={4}>
              {t('group-projects')}
          </Heading>
          <SearchbarForProjects 
              handleSearchProjects={handleSearchProjects} 
              setSearchByText={setSearchByText}
              initialSearch={searchByText}
          />
          <GroupProjectsFilters
              handleSearchProjects={handleSearchProjects}
              innitialStartCompletion={startCompletion}
              setStartCompletion={setStartCompletion}
              initialEndCompletion={endCompletion}
              setEndCompletion={setEndCompletion}
              innitialIncludeCompleted={includeCompleted}
              setIncludeCompleted={setIncludeCompleted}
              innitialIncludeNotStarted={includeNotStarted}
              setIncludeNotStarted={setIncludeNotStarted}
          />
          {loading ? (
              <Spinner /> // Add loading indicator
          ) : error ? (
              <Text color="red.500">{error}</Text>
          ) : isDesktop ? (
              <GroupProjectsTable
                projects={projects}
                accessToken={accessToken}
                setProjects={setProjects}
              />
          ) : (
              <ProjectCards 
                projects={projects}
                accessToken={accessToken}
                setProjects={setProjects}
              />
          )}
          <Pagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasNextPage={hasNextPage}
          />
      </VStack>
  );
}
