/* eslint-disable react-hooks/exhaustive-deps */
import { useBreakpointValue, Text, Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState, useCallback } from "react"
import MembersTableComponent from "../group-members-components/MembersTableComponent";
import MembersCardComponent from "../group-members-components/MembersCardComponent";
import Pagination from "../../profile-page-components/user-data-options/all-tasks-components/Pagination";
import { useTranslations } from "next-intl";
import AddUserModal from "../../modals/AddUserToGroupModal";
import { AllGroupMembersProps, GroupMember } from "@/app/interfaces/types";
import { fetchGroupUsersFromServer } from "@/app/server-actions/fetchGroupUsersFromServer";
import { useSearchParams } from "next/navigation";


export default function AllGroupMembersComponent({ user, accessToken }: AllGroupMembersProps ) {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0); 
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const t = useTranslations('group-page');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const groupId = searchParams.get('groupId') || '0';
  const isUserAdmin = user.groupMembershipData.some(
    membership => membership.groupId === groupId && membership.role === "ADMIN"
  );

  const loadMembers = useCallback(async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);

    try {
      const currentMembers = await fetchGroupUsersFromServer(user, accessToken, groupId, currentPage );
      const nextMembers = await fetchGroupUsersFromServer(user, accessToken, groupId, currentPage + 1 );
      
      setMembers(currentMembers);
      setHasNextPage(nextMembers.length > 0); 
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, groupId, user]);
  
  useEffect(() => {
    const controller = new AbortController();
    loadMembers();
    return () => {
      controller.abort();
    };
  }, [loadMembers]); 

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <Box>
      {isUserAdmin && (
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
      )}
      
      <AddUserModal
        isOpen={isAddUserModalOpen}
        accessToken={accessToken}
        onClose={() => setIsAddUserModalOpen(false)}
        groupId={groupId}
        user={user}
        onSuccess={() => {
          loadMembers();
        }}
      />

      {members.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Text fontSize="lg" color="gray.600">
            {t('no-members-available')}
          </Text>
        </Box>
      ) : (
        <Box>
          {isDesktop ? (
            <MembersTableComponent 
              user={user} 
              members={members} 
              setMembers={setMembers} 
              isUserAdmin={isUserAdmin} 
              groupId={groupId}
            />
          ) : (
            <MembersCardComponent 
              user={user} 
              members={members} 
              setMembers={setMembers} 
              isUserAdmin={isUserAdmin} 
              groupId={groupId} 
            />
          )}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasNextPage={hasNextPage}
          />
        </Box>
      )}
    </Box>
  );
}