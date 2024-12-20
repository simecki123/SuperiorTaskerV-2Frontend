/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Box, Grid, VStack, useColorModeValue, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import AllTasksComponent from "./AllTasksComponent";
import UserMessagesComponent from "./UserMessagesComponent";
import MyGroupsComponent from "./MyGroupsComponent";
import MenuCard from "../MenuCard";
import UserStatistics from "./UserStatistics";
import { State, User } from "@/app/interfaces/types";
import { useGroups } from "@/commons/custom-hooks/useGroupHook";
import { useMessagess } from "@/commons/custom-hooks/useMessagessHook";

const groupState: State = {
  message: null,
  errors: null,
};
const messageState: State = {
  message: null,
  errors: null,
};


export default function UsersImportantStatsComponent({user}: {user: User}) {
  const t = useTranslations('menu-items');
  const { groups} = useGroups(user, groupState);
  const {messagess} = useMessagess(user, messageState);
  const menuItems = [
    { name: "All Tasks", title: `${t('all-tasks')}`, component: AllTasksComponent },
    { name: "Messages", title: `${t('messages')}`,  component: UserMessagesComponent },
    { name: "Stats", title: `${t('stats')}`, component: UserStatistics },
    { name: "My Groups", title: `${t('my-groups')}`, component: MyGroupsComponent },
  ];
  const [selectedComponent, setSelectedComponent] = useState("All Tasks");

  const renderSelectedComponent = () => {
    if (selectedComponent === "All Tasks") {
      return <AllTasksComponent user={user}/>;
    }
    if (selectedComponent === "Messages") {
      return <UserMessagesComponent messages={messagess} />;
    }
    if (selectedComponent === "My Groups") {
        return <MyGroupsComponent user={user} />;
    }

    const Component = menuItems.find((item) => item.name === selectedComponent)?.component;
    if (Component) {
      return <Component messages={[]} user={user} />;
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