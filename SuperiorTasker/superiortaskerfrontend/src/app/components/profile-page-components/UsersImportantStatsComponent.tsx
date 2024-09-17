"use client";
import { Box, Grid, VStack, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import AllTasksComponent from "./user-data-options/AllTasksComponent";
import UserMessagesComponent from "./user-data-options/UserMessagesComponent";
import UserStatistics from "./user-data-options/UserStatistics";
import MyGroupsComponent from "./user-data-options/MyGroupsComponent";
import MenuCard from "./MenuCard";

const menuItems = [
  { name: "All Tasks", component: AllTasksComponent },
  { name: "Messages", component: UserMessagesComponent },
  { name: "Stats", component: UserStatistics },
  { name: "My Groups" , component: MyGroupsComponent },
];

export default function UsersImportantStatsComponent() {
  const [selectedComponent, setSelectedComponent] = useState("All Tasks");

  return (
    <VStack spacing={8} align="stretch">
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
        gap={4}
      >
        {menuItems.map((item) => (
          <MenuCard
            key={item.name}
            name={item.name}
            isSelected={selectedComponent === item.name}
            onClick={() => setSelectedComponent(item.name)}
          />
        ))}
      </Grid>

      <Box p={6} borderWidth={1} borderRadius="lg" bg={useColorModeValue("white", "gray.800")}>
        {menuItems.find((item) => item.name === selectedComponent)?.component()}
      </Box>
    </VStack>
  );
}