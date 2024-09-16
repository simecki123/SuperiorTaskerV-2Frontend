/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { handleGroupCreate } from "@/app/server-actions/handleGroupCreate";
import { useGroups } from "@/commons/custom-hooks/useGroupHook";
import { AddIcon } from "@chakra-ui/icons";
import { Box, useDisclosure, Image, IconButton, Button } from "@chakra-ui/react";
import React, { useState } from "react"
import { useFormState } from "react-dom";
import SideBarGroupDrawer from "./SideBarGroupDrawer";

const initialState: any = {
    message: null,
    errors: null,
  };

export default function SideBarGroups({ accessToken }: any) {
    const [state, formAction] = useFormState(handleGroupCreate, initialState);
    const { groups, error } = useGroups(accessToken, state);
    const [activeGroup, setActiveGroup] = useState(null);

    const {
        isOpen: isDrawerOpen,
        onOpen: onDrawerOpen,
        onClose: onDrawerClose,
      } = useDisclosure();
      const {
        isOpen: isGroupModalOpen,
        onOpen: onGroupModalOpen,
        onClose: onGroupModalClose,
      } = useDisclosure();

  return (
    <Box className="flex flex-col space-y-2 p-2">
      
      {groups.map((group: any, index: number) => (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image
          key={index}
          className="rounded-full"
          objectFit="cover"
          src={group.photoUrl}
          fallbackSrc="/public/fallback-group.png"
          boxSize={14}
          onClick={() => {
            setActiveGroup(group);
            onDrawerOpen();
          }}
        />
      ))}
      <IconButton
        aria-label="Add Group"
        icon={<AddIcon />}
        colorScheme="xblue"
        isRound={true}
        boxSize={14}
        onClick={onGroupModalOpen}
      />
      <SideBarGroupDrawer
        group={activeGroup}
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
      />
    </Box>
  )
};

