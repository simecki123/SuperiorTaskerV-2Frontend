/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from "react";
import { Image, Text, HStack, Button, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import UpdateGroupModal from "../modals/UpdateGroupModal";
import LeaveGroupModal from "../modals/LeaveGroupMoadal";


export default function GroupDataComponent({ group }: any) {

  const [isLeaveModalOpen, setIsLeaveModalOpen] = React.useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);

  const t = useTranslations('group-page')

  return (
    <HStack
      spacing={{ base: 4, md: 6 }} // Responsive spacing
      align="center"
      mb={8}
      flexDirection={{ base: "column", md: "row" }} // Stack items vertically on small screens
      textAlign={{ base: "center", md: "left" }} // Center text on small screens, left-align on larger ones
    >
      <Image
        borderRadius="full"
        boxSize={{ base: "80px", sm: "100px", md: "120px" }} // Responsive image size
        src={group.groupImage}
        fallbackSrc="/public/fallback-user.png"
        alt={`${group.name}`}
      />
      <VStack
        spacing={2} // Space between the name and description
        alignItems={{ base: "center", md: "flex-start" }} // Align text to center on small, start on medium+
      >
        <Text fontSize={{ base: "xl", sm: "2xl", md: "3xl" }} fontWeight="bold">
          {group.name}
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
          {group.description}
        </Text>
      </VStack>
      
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

      <LeaveGroupModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onConfirm={() => {
          // Handle leave group logic here
          setIsLeaveModalOpen(false);
        }}
        groupName={group.name}
      />

      <UpdateGroupModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={(data) => {
          // Handle update group logic here
          console.log('Updated group data:', data);
          setIsUpdateModalOpen(false);
        }}
        initialData={{
          name: group.name,
          description: group.description,
        }}
      />
    </HStack>
  );
}
