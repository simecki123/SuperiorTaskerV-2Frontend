"use client";
import React, { useState } from "react";
import { Box, useBreakpointValue, Text } from "@chakra-ui/react";
import GroupTable from "./all-groups-component/GroupTable";
import GroupCard from "./all-groups-component/GroupCard";
import Pagination from "./all-tasks-components/Pagination";

const ITEMS_PER_PAGE = 4;

export default function MyGroupsComponent({ groups = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  if (groups.length === 0) {
    return <Text>No groups available.</Text>;
  }

  const indexOfLastGroups = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstGroups = indexOfLastGroups - ITEMS_PER_PAGE;
  const currentGroups = groups.slice(indexOfFirstGroups, indexOfLastGroups);

  return (
    <Box>
      {isDesktop ? (
        <GroupTable groups={currentGroups} /> 
      ) : (
        <GroupCard groups={currentGroups} />
      )}
      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={groups.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
}
