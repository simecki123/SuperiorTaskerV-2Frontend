/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from "react"
import { Box, Grid, VStack, useColorModeValue, Text } from "@chakra-ui/react";
import MenuCard from "../profile-page-components/MenuCard";
import AllGroupMembersComponent from "./group-menu-components/AllGroupMembersComponent";
import AllGroupProjectsComponent from "./group-menu-components/AllGroupProjectsComponent";
import AllGroupTaskComponents from "./group-menu-components/AllGroupTaskComponents";
import SendMessageComponent from "./group-menu-components/SendMessageComponent";
import { useTranslations } from "next-intl";


export default function GroupImportantStatsComponent({members, group, projects, tasks}: any) {

  const t = useTranslations('group-page')

    const menuItems = [
        { name: "All Members", title: `${t('all-members')}`, component: AllGroupMembersComponent },
        { name: "All Projects", title: `${t('all-projects')}`,  component: AllGroupProjectsComponent },
        { name: "All Tasks", title: `${t('all-tasks')}`, component: AllGroupTaskComponents },
        { name: "Send Message", title: `${t('send-message')}`, component: SendMessageComponent },
      ];

      const [selectedComponent, setSelectedComponent] = useState("All Members");
      console.log(group)

  const renderSelectedComponent = () => {
    if (selectedComponent === "All Members") {
      return <AllGroupMembersComponent members={members} />;
    }
    if (selectedComponent === "All Projects") {
      return <AllGroupProjectsComponent projects={projects} />;
    }
    if (selectedComponent === "All Tasks") {
        return <AllGroupTaskComponents tasks={tasks} />;
    }
    if (selectedComponent == "Send Message") {
        return <SendMessageComponent />
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
  )
};

