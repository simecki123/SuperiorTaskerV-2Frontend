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
import { useTranslations } from "next-intl";
import React from "react";

export default function SideBarGroupDrawer({ isOpen, onClose, group }: any) {

  const t = useTranslations('side-bar-group-drawer');

  const { name, id, description } = group;

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
      <DrawerOverlay />
      <DrawerContent
        boxShadow="lg"
        borderTopRightRadius="lg"
        borderBottomRightRadius="lg"
      >
        <DrawerCloseButton _hover={{ color: "gray.400" }} />
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
              href={`projects?groupId=${id}`}
              _hover={{ textDecoration: "none", color: "xblue.400" }}
              display="flex"
              alignItems="center"
              onClick={onClose}
            >
              {t('projects')}
            </Link>
            <Divider />
            <Link
              href={`project-tasks?groupId=${id}`}
              _hover={{ textDecoration: "none", color: "xblue.400" }}
              display="flex"
              alignItems="center"
              onClick={onClose}
            >
              {t('my-tasks')}
            </Link>
            <Divider />
            <Link
              href={`group-info?groupId=${id}`}
              _hover={{ textDecoration: "none", color: "xblue.400" }}
              display="flex"
              alignItems="center"
              onClick={onClose}
            >
              {t('group-info')}
            </Link>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
