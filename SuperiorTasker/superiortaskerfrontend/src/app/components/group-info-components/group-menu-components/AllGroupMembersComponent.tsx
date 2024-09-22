/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useBreakpointValue, Text, Box, Button } from "@chakra-ui/react";
import React, { useState } from "react"
import MembersTableComponent from "../group-members-components/MembersTableComponent";
import MembersCardComponent from "../group-members-components/MembersCardComponent";
import Pagination from "../../profile-page-components/user-data-options/all-tasks-components/Pagination";
import { useTranslations } from "next-intl";
import AddUserModal from "../../modals/AddUserToGroupModal";

const ITEMS_PER_PAGE = 4;

export default function AllGroupMembersComponent({ members }: any) {
  const t = useTranslations('group-page');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  if (members.length === 0) {
    return <Text>No members available.</Text>;
  }

  const indexOfLastMember = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstMember = indexOfLastMember - ITEMS_PER_PAGE;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

  return (
    <Box>
      <Button 
        colorScheme="blue" 
        variant="solid" 
        size="md" 
        mb={4} 
        _hover={{ bg: "blue.600" }} 
        borderRadius="md"
        onClick={() => setIsAddUserModalOpen(true)}
      >
        {t('add-new-member')}
      </Button>
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUsers={(users) => {
          // Handle adding users logic here
          console.log('Users to add:', users);
          setIsAddUserModalOpen(false);
        }}
      />

      {isDesktop ? (
        <MembersTableComponent members={currentMembers} />
      ) : (
        <MembersCardComponent members={currentMembers} />
      )}
      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={members.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
}
