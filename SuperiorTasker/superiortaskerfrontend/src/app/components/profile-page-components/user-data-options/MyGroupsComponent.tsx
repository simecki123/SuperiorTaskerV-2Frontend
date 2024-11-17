/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Box, useBreakpointValue, Text } from "@chakra-ui/react";
import GroupTable from "./all-groups-component/GroupTable";
import GroupCard from "./all-groups-component/GroupCard";
import Pagination from "./all-tasks-components/Pagination";
import { Group, User } from "@/app/interfaces/types";
import { fetchGroupsFromServer } from "@/app/server-actions/fetchGroups";


export default function MyGroupsComponent({ user }: {user: User}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [groups, setGroups] = useState<Group[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  useEffect(() => {
    const controller = new AbortController();

    const loadGroups = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      setError(null);

      try {
        const currentGroups = await fetchGroupsFromServer(user, currentPage);
        const nextGroups = await fetchGroupsFromServer(user, currentPage+1);
        
        setGroups(currentGroups);
        setHasNextPage(nextGroups.length > 0); 
        
      } catch (err) {
        
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setGroups([]);
        
      } finally {
        
        setLoading(false);
        
      }
    };

    loadGroups();

    return () => {
      controller.abort();
    };
  }, [currentPage, user, user?.id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!groups?.length) {
    return <Text>No groups available.</Text>;
  }

  return (
    <Box>
      {isDesktop ? <GroupTable groups={groups} /> : <GroupCard tasks={groups} />}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        hasNextPage={hasNextPage}
      />
    </Box>
  );
}
