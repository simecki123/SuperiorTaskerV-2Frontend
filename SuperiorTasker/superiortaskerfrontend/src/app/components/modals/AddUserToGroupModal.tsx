import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
 Modal,
 ModalOverlay,
 ModalContent,
 ModalHeader,
 ModalBody,
 ModalFooter,
 Button,
 Input,
 Checkbox,
 VStack,
 useToast,
 Box,
 Text,
 Spinner,
 Avatar,
 Flex
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { fetchUsersToAddToGroup } from '@/app/server-actions/fetchUsersToAddToGroup';
import { NotYetGroupMember, User } from '@/app/interfaces/types';
import { addUsersToGroup } from '@/app/server-actions/addUserToGroup';
import Pagination from '../profile-page-components/user-data-options/all-tasks-components/Pagination';

interface AddUserModalProps {
 isOpen: boolean;
 accessToken: string;
 onClose: () => void;
 groupId: string;
 user: User;
 onSuccess?: () => void;
}

export default function AddUserModal({ 
 isOpen, 
 accessToken,
 onClose, 
 groupId,
 user,
 onSuccess
}: AddUserModalProps) {
 const MAX_SELECTED_USERS = 5;
 const [searchTerm, setSearchTerm] = useState<string>('');
 const [searchResults, setSearchResults] = useState<NotYetGroupMember[]>([]);
 const [selectedUsers, setSelectedUsers] = useState<NotYetGroupMember[]>([]);
 const [loading, setLoading] = useState<boolean>(false);
 const [adding, setAdding] = useState<boolean>(false);
 const [hasNextPage, setHasNextPage] = useState(true);
 const [currentPage, setCurrentPage] = useState<number>(0);
 
 const typingTimeoutRef = useRef<NodeJS.Timeout>();
 const toast = useToast();
 const t = useTranslations('group-page');

 const displayUsers = React.useMemo(() => {
   const searchResultIds = new Set(searchResults.map(user => user.userId));
   const selectedNotInSearch = selectedUsers.filter(user => !searchResultIds.has(user.userId));
   return [...searchResults, ...selectedNotInSearch];
 }, [searchResults, selectedUsers]);

 const searchUsers = useCallback(async (term: string) => {
   if (!accessToken) return;
   
   setLoading(true);
   try {
     const users = await fetchUsersToAddToGroup(
       term,
       groupId,
       user,
       accessToken,
       currentPage
     );
     const nextUsers = await fetchUsersToAddToGroup(
       term,
       groupId,
       user,
       accessToken,
       currentPage + 1
     );
     setHasNextPage(nextUsers.length > 0);
     setSearchResults(users);
   } catch (error) {
     toast({
       title: t('error'),
       description: error instanceof Error ? error.message : 'An unknown error occurred',
       status: 'error',
       duration: 3000,
     });
   } finally {
     setLoading(false);
   }
 }, [accessToken, currentPage, groupId, toast, t, user]);

 useEffect(() => {
   if (isOpen) {
     searchUsers('');
   }
 }, [isOpen, searchUsers]);

 useEffect(() => {
   if (isOpen) {
     searchUsers(searchTerm);
   }
 }, [currentPage, isOpen, searchUsers, searchTerm]);

 const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
   const value = e.target.value;
   setSearchTerm(value);
   setCurrentPage(0);

   if (typingTimeoutRef.current) {
     clearTimeout(typingTimeoutRef.current);
   }

   typingTimeoutRef.current = setTimeout(() => {
     searchUsers(value);
   }, 500);
 }, [searchUsers]);

 const handleCheckUser = (selectedUser: NotYetGroupMember) => {
   setSelectedUsers(prev => {
     const isSelected = prev.some(user => user.userId === selectedUser.userId);
     if (isSelected) {
       return prev.filter(user => user.userId !== selectedUser.userId);
     } else if (prev.length >= MAX_SELECTED_USERS) {
       toast({
         title: t('warning'),
         description: t('max-users-selected', { count: MAX_SELECTED_USERS }),
         status: 'warning',
         duration: 3000,
       });
       return prev;
     }
     return [...prev, selectedUser];
   });
 };

 const handleAddUsers = async () => {
   if (selectedUsers.length === 0) {
     toast({
       title: t('warning'),
       description: t('select-users-warning'),
       status: 'warning',
       duration: 3000,
     });
     return;
   }

   setAdding(true);
   try {
     await addUsersToGroup(user, groupId, accessToken, selectedUsers);
     toast({
       title: t('success'),
       description: t('users-added-success'),
       status: 'success',
       duration: 3000,
     });
     onSuccess?.();
     onClose();
     setSelectedUsers([]);
   } catch (error) {
     toast({
       title: t('error'),
       description: error instanceof Error ? error.message : 'An unknown error occurred',
       status: 'error',
       duration: 3000,
     });
   } finally {
     setAdding(false);
   }
 };

 useEffect(() => {
   if (!isOpen) {
     setSelectedUsers([]);
     setSearchTerm('');
     setSearchResults([]);
     setCurrentPage(0);
   }
 }, [isOpen]);

 return (
   <Modal isOpen={isOpen} onClose={onClose} size="xl">
     <ModalOverlay />
     <ModalContent maxH="90vh" display="flex" flexDirection="column">
       <ModalHeader>{t('add-users-to-group')}</ModalHeader>
       <ModalBody flex="1" overflow="hidden" display="flex" flexDirection="column">
         <Input
           placeholder={t('search-users')}
           value={searchTerm}
           onChange={handleSearchChange}
           mb={4}
         />
         
         <VStack 
           align="stretch" 
           spacing={2} 
           flex="1"
           overflowY="auto"
           css={{
             '&::-webkit-scrollbar': {
               width: '4px',
             },
             '&::-webkit-scrollbar-track': {
               backgroundColor: '#f1f1f1',
             },
             '&::-webkit-scrollbar-thumb': {
               backgroundColor: '#888',
               borderRadius: '2px',
             }
           }}
         >
           {loading ? (
             <Box textAlign="center" py={4}>
               <Spinner />
             </Box>
           ) : displayUsers.length === 0 ? (
             <Text textAlign="center">{t('no-users-found')}</Text>
           ) : (
             displayUsers.map(user => (
               <Box 
                 key={user.userId} 
                 p={2} 
                 borderWidth={1} 
                 borderRadius="md"
                 _hover={{ backgroundColor: 'gray.50' }}
               >
                 <Checkbox
                   isChecked={selectedUsers.some(u => u.userId === user.userId)}
                   onChange={() => handleCheckUser(user)}
                 >
                   <Flex align="center" gap={3}>
                     <Avatar
                       size="md"
                       src={user.photoUri}
                       name={`${user.firstName} ${user.lastName}`}
                     />
                     <Box>
                       <Text fontWeight="medium">
                         {user.firstName} {user.lastName}
                       </Text>
                       {user.description && (
                         <Text fontSize="sm" color="gray.600">
                           {user.description}
                         </Text>
                       )}
                     </Box>
                   </Flex>
                 </Checkbox>
               </Box>
             ))
           )}
         </VStack>
         
         {displayUsers.length > 0 && !loading && (
           <Box mt={4}>
             <Pagination
               currentPage={currentPage}
               setCurrentPage={setCurrentPage}
               hasNextPage={hasNextPage}
             />
           </Box>
         )}
       </ModalBody>

       <ModalFooter>
         <Button 
           colorScheme="blue" 
           mr={3} 
           onClick={handleAddUsers}
           isLoading={adding}
           isDisabled={selectedUsers.length === 0}
         >
           {t('add-selected')} ({selectedUsers.length})
         </Button>
         <Button onClick={onClose}>{t('cancel')}</Button>
       </ModalFooter>
     </ModalContent>
   </Modal>
 );
}