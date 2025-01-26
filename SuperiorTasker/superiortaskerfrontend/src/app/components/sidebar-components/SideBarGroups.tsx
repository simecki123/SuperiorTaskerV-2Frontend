/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { handleGroupCreate } from "@/app/server-actions/handleGroupCreate";
import { AddIcon } from "@chakra-ui/icons";
import { Box, useDisclosure, Image, IconButton, Spinner, Text, VStack, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import SideBarGroupDrawer from "./SideBarGroupDrawer";
import CreateGroupModal from "../modals/CreateGroupModal";
import ProfileButton from "../profile-page-components/ProfileButton";
import { Group, User, State } from "../../interfaces/types";
import Pagination from "../profile-page-components/user-data-options/all-tasks-components/Pagination";
import { fetchGroupsFromServer } from "@/app/server-actions/fetchGroups";
import { useUserStore } from "@/commons/zustandFiles/userUpdatedStore";
import { useGroupStore } from "@/commons/zustandFiles/GroupUpdateStore";
import { fetchMeClient } from "@/app/server-actions/fetchMeClient";

const initialState: State = {
  message: null,
  errors: null,
};

export default function SideBarGroups({ activeUser, initialUser }: { activeUser: User, initialUser: User }) {
  const { updatedGroup } = useGroupStore();
  const [state, formAction] = useFormState(handleGroupCreate, initialState);
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);
  const [joinState, joinFormAction] = useFormState(handleGroupCreate, initialState);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [groupLoading, setGroupLoading] = useState(false);
  const [groupError, setGroupError] = useState<string | null>(null);
  const { user: updatedUser, setUser: setUpdatedUser } = useUserStore();
  const [currentUser, setCurrentUser] = useState(initialUser);

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

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await fetchMeClient(activeUser.accessToken);
        setCurrentUser(user);
        setUpdatedUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (updatedUser) {
      setCurrentUser(updatedUser);
    }
  }, [updatedUser]);

  useEffect(() => {
    console.log("UpdatedGroup ", updatedGroup);
    if (updatedGroup) {
      loadGroups();
    }
  }, [updatedGroup]);

  useEffect(() => {
    loadGroups();
  }, [currentPage, updatedUser, activeUser, currentUser]);

  const loadGroups = async () => {
    const thiscurrentUser = updatedUser || initialUser;
    
    if (!thiscurrentUser?.id) return;
    
    setGroupLoading(true);
    setGroupError(null);

    try {
      const currentGroups = await fetchGroupsFromServer(activeUser, currentPage);
      const nextGroups = await fetchGroupsFromServer(activeUser, currentPage+1);
      
      setGroups(currentGroups);
      setHasNextPage(nextGroups.length > 0); 
    } catch (err) {
      setGroupError(err instanceof Error ? err.message : "An unknown error occurred");
      setGroups([]);
    } finally {
      setGroupLoading(false);
    }
  };

  if (groupLoading) {
    return (
      <Center h="full" w="full">
        <VStack spacing={2}>
          <Spinner size="md" color="blue.500" />
          <Text>Loading groups...</Text>
        </VStack>
      </Center>
    );
  }

  if (groupError) {
    return (
      <Center h="full" w="full">
        <Text color="red.500">Error loading groups: {groupError}</Text>
      </Center>
    );
  }

  if (!groups?.length) {
    return (
      <VStack w="full" spacing={4} align="center">
        <Text>No groups available.</Text>
        <IconButton
          aria-label="Add Group"
          icon={<AddIcon />}
          colorScheme="xblue"
          isRound={true}
          boxSize={14}
          className="hover:opacity-80 transition-opacity"
          onClick={onGroupModalOpen}
        />
        <ProfileButton activeUser={updatedUser || currentUser} /> 
      </VStack>
    );
  }

  return (
    <VStack 
      spacing={4} 
      align="center" 
      w="full"
      p={2}
    >
      <VStack spacing={2} w="full" align="center">
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
      </VStack>

      <Box w="full">
        <Pagination 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          hasNextPage={hasNextPage}
        />
      </Box>

      <VStack spacing={2} w="full" align="center">
        <IconButton
          aria-label="Add Group"
          icon={<AddIcon />}
          colorScheme="xblue"
          isRound={true}
          boxSize={14}
          className="hover:opacity-80 transition-opacity"
          onClick={onGroupModalOpen}
        />
        <ProfileButton activeUser={updatedUser || activeUser} />
      </VStack>

      <CreateGroupModal 
            state={state}
            user={updatedUser || activeUser}
            formAction={formAction}
            joinState={joinState}
            joinFormAction={joinFormAction}
            isOpen={isGroupModalOpen}
            onClose={onGroupModalClose} 
          />

      {activeGroup && (
          <SideBarGroupDrawer
            group={activeGroup}
            isOpen={isDrawerOpen}
            onClose={onDrawerClose}
          />
      )}
    </VStack>
  );
}