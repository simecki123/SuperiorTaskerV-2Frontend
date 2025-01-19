"use client";
import { Box, Grid, VStack, useColorModeValue, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import AllTasksComponent from "./AllTasksComponent";
import UserMessagesComponent from "./UserMessagesComponent";
import MyGroupsComponent from "./MyGroupsComponent";
import UserStatistics from "./UserStatistics";
import { User } from "@/app/interfaces/types";
import MenuCard from "../MenuCard";

export default function UsersImportantStatsComponent({user}: {user: User}) {
  const t = useTranslations('menu-items');
  const [selectedComponent, setSelectedComponent] = useState("All Tasks");

  const menuItems = [ 
    { name: "All Tasks", title: `${t('all-tasks')}`, component: AllTasksComponent },
    { 
      name: "Messages", 
      title: `${t('messages')}`, 
      component: UserMessagesComponent,
    },
    { name: "Stats", title: `${t('stats')}`, component: UserStatistics },
    { name: "My Groups", title: `${t('my-groups')}`, component: MyGroupsComponent },
  ];

  const renderSelectedComponent = () => {
    if (selectedComponent === "All Tasks") {
      return <AllTasksComponent user={user}/>;
    }
    if (selectedComponent === "Messages") {
      return <UserMessagesComponent user={user} />;
    }
    if (selectedComponent === "My Groups") {
        return <MyGroupsComponent user={user} />;
    }
    if (selectedComponent === "Stats") {
      return <UserStatistics user={user} />
    }

    return <Text>No component selected</Text>;
  };

  return (
    <VStack spacing={8} align="stretch">
      <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}>
        {menuItems.map((item) => (
          <MenuCard
            key={item.name}
            name={item.name}
            title={item.title}
            isSelected={selectedComponent === item.name}
            onClick={() => setSelectedComponent(item.name)}
          />
        ))}
      </Grid>
      <Box p={6} borderWidth={1} borderRadius="lg" bg={useColorModeValue("white", "gray.800")}>
        {renderSelectedComponent()}
      </Box>
    </VStack>
  );
}