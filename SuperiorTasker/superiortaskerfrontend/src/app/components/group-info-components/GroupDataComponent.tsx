"use client"
import React, { useState, useEffect } from "react";
import { Image, Text, HStack, Button, VStack, useToast } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import UpdateGroupModal from "../modals/UpdateGroupModal";
import LeaveGroupModal from "../modals/LeaveGroupMoadal";
import { Group, User } from "@/app/interfaces/types";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchGroupById } from "@/app/server-actions/fetchGroupById";
import { handleUpdateGroup } from "@/app/server-actions/handleUpdateGroup";
import { handleLeaveGroup } from "@/app/server-actions/handleLeaveGroup";
import { useGroupStore } from "@/commons/zustandFiles/GroupUpdateStore";

interface GroupDataComponentProps {
  user: User;
  accessToken: string;
}

export default function GroupDataComponent({ user, accessToken }: GroupDataComponentProps) {
  const t = useTranslations('group-page');
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const groupId = searchParams.get('groupId') || '0';
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [group, setGroup] = useState<Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const loadGroup = async () => {
      try {
        const fetchedGroup = await fetchGroupById(user,accessToken, groupId);
        setGroup(fetchedGroup);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load group data",
          status: "error",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadGroup();
  }, [groupId, user, toast]);
  
  const isUserAdmin = user.groupMembershipData.some(
    membership => membership.groupId === groupId && membership.role === "ADMIN"
  );

  if (isLoading || !group) {
    return <div>Loading...</div>;
  }

  const updateGroupMethod = async (data: { name: string; description: string; file?: File }) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    if (data.file) {
      formData.append('file', data.file);
    }
  
    const result = await handleUpdateGroup(groupId, accessToken, formData);
    
    if (result.success && result.data) {
      setGroup(result.data);
      useGroupStore.getState().updateGroup(true); 
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        duration: 3000,
      });
    } else {
      toast({
        title: "Error",
        description: result.message,
        status: "error",
        duration: 3000,
      });
    }
    setIsUpdateModalOpen(false);
  };

  const leaveGroupMethod = async () => {
    if (isUserAdmin) {
      toast({
        title: "Cannot Leave Group",
        description: "Admins cannot leave the group. Please transfer admin rights to another member first or delete the group.",
        status: "warning",
        duration: 5000,
      });
      setIsLeaveModalOpen(false);
      return;
    }
  
    const result = await handleLeaveGroup(user.id, groupId, accessToken);
    
    if (result.success) {
      useGroupStore.getState().updateGroup(true); 
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        duration: 3000,
      });
      router.push('/profile');
    } else {
      toast({
        title: "Error",
        description: result.message,
        status: "error",
        duration: 3000,
      });
    }
    setIsLeaveModalOpen(false);
  };

  

  return (
    <HStack
      spacing={{ base: 4, md: 6 }}
      align="center"
      mb={8}
      flexDirection={{ base: "column", md: "row" }}
      textAlign={{ base: "center", md: "left" }}
    >
      <Image
        borderRadius="full"
        boxSize={{ base: "80px", sm: "100px", md: "120px" }}
        src={group.photoUri}
        fallbackSrc="/public/fallback-user.png"
        alt={`${group.name}`}
      />
      <VStack
        spacing={2}
        alignItems={{ base: "center", md: "flex-start" }}
      >
        <Text fontSize={{ base: "xl", sm: "2xl", md: "3xl" }} fontWeight="bold">
          {group.name}
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
          {group.description}
        </Text>
      </VStack>
      
      {isUserAdmin && (
        <Button 
          colorScheme="blue" 
          variant="solid" 
          size="md" 
          mb={4} 
          _hover={{ bg: "blue.600" }} 
          borderRadius="md"
          onClick={() => setIsUpdateModalOpen(true)}
        >
          {t('edit-group')}
        </Button>
      )}
      
      {!isUserAdmin && (
        <Button 
        colorScheme="blue" 
        variant="solid" 
        size="md" 
        mb={4} 
        _hover={{ bg: "blue.600" }} 
        borderRadius="md"
        onClick={() => setIsLeaveModalOpen(true)}
      >
        {t('leave-group')}
      </Button>
      )}
      

      <LeaveGroupModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onConfirm={leaveGroupMethod}
        groupName={group.name}
      />

      <UpdateGroupModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={updateGroupMethod}
        initialData={{
          name: group.name,
          description: group.description,
          photoUri: group.photoUri
        }}
      />
    </HStack>
  );
}