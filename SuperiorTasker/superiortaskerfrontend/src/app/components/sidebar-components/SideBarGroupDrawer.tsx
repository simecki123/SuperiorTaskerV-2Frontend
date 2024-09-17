/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Link,
  VStack,
  Divider,
  Box,
  Icon,
} from "@chakra-ui/react";
import React from "react";

export default function SideBarGroupDrawer({ isOpen, onClose, group }: any) {
  if (!group) {
    return null;
  }

  const { name, groupId, description } = group;

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
      <DrawerOverlay />
      <DrawerContent
        boxShadow="lg"
        borderTopRightRadius="lg"
        borderBottomRightRadius="lg"
      >
        <DrawerCloseButton color="white" _hover={{ color: "gray.400" }} />
        <DrawerHeader
          borderBottomWidth="1px"
          borderBottomColor="gray.700"
          fontSize="lg"
          fontWeight="bold"
        >
          {name}
          <Box fontSize="sm" color="gray.400">
            {description || "Group description goes here"}
          </Box>
        </DrawerHeader>

        <DrawerBody>
          <VStack align="start" spacing={4} mt={4}>
            <Link
              href={`projects?groupId=${groupId}`}
              _hover={{ textDecoration: "none", color: "xblue.400" }}
              display="flex"
              alignItems="center"
              onClick={onClose}
            >
              Projects
            </Link>
            <Divider />
            <Link
              href={`mytasks?groupId=${groupId}`}
              _hover={{ textDecoration: "none", color: "xblue.400" }}
              display="flex"
              alignItems="center"
              onClick={onClose}
            >
              My Tasks
            </Link>
            <Divider />
            <Link
              href={`group-info?groupId=${groupId}`}
              _hover={{ textDecoration: "none", color: "xblue.400" }}
              display="flex"
              alignItems="center"
              onClick={onClose}
            >
              Group Info
            </Link>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
