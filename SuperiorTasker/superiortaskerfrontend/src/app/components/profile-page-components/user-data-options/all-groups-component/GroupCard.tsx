/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { VStack, Box, Heading, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";


export default function GroupCard({ groups }: any) {
  const t = useTranslations('my-groups-table')
  return (
    <VStack spacing={4} align="stretch">
      {groups.map((group: any) => (
        <Box key={group.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <Heading fontSize="xl">{group.title}</Heading>
          <Text mt={2}>{group.description}</Text>
          <Text mt={2} fontWeight="bold">
            {t('number-of-projects')}: {group.projectsCount}
          </Text>
          <Text mt={2} fontWeight="bold">
            {t('number-of-members')}: {group.usersCount}
          </Text>
        </Box>
      ))}
    </VStack>
  )
};

