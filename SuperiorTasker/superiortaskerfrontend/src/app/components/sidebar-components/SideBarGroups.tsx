'use client'
import { handleGroupCreate } from "@/app/server-actions/handleGroupCreate";
import { useGroups } from "@/commons/custom-hooks/useGroupHook";
import { AddIcon } from "@chakra-ui/icons";
import { Box, useDisclosure, Image, IconButton, Spinner, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import SideBarGroupDrawer from "./SideBarGroupDrawer";
import CreateGroupModal from "../modals/CreateGroupModal";
import ProfileButton from "../profile-page-components/ProfileButton";
import { Group, User, State } from "../../interfaces/types";

const initialState: State = {
  message: null,
  errors: null,
};

export default function SideBarGroups({ activeUser }: { activeUser: User }) {
  const [state, formAction] = useFormState(handleGroupCreate, initialState);
  const { groups, loading, error } = useGroups(activeUser, initialState);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [joinState, joinFormAction] = useFormState(handleGroupCreate, initialState);

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

  if (loading) {
    return (
      <Box className="flex flex-col items-center justify-center p-4">
        <Spinner size="md" color="blue.500" />
        <Text mt={2}>Loading groups...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex flex-col items-center justify-center p-4 text-red-500">
        <Text>Error loading groups: {error.message}</Text>
      </Box>
    );
  }

  return (
    <Box className="flex flex-col space-y-2 p-2">
      {groups.map((group) => (
        <Image
          key={group.id}
          className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
          objectFit="cover"
          src={group.photoUri}
          fallbackSrc="/fallback-group.png"
          boxSize={14}
          alt={`${group.name} group`}
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
        className="hover:opacity-80 transition-opacity"
        onClick={onGroupModalOpen}
      />

      <ProfileButton activeUser={activeUser} />

      {/* Only render modals if there's an active group */}
      {activeGroup && (
        <>
          <CreateGroupModal 
            state={state}
            formAction={formAction}
            joinState={joinState}
            joinFormAction={joinFormAction}
            isOpen={isGroupModalOpen}
            onClose={onGroupModalClose} 
          />

          <SideBarGroupDrawer
            group={activeGroup}
            isOpen={isDrawerOpen}
            onClose={onDrawerClose}
          />
        </>
      )}
    </Box>
  );
}