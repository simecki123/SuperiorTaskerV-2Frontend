import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Avatar,
  Checkbox,
  Box,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUsers: (users: User[]) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onAddUsers }) => {
  const t = useTranslations('group-page');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Mock function to simulate fetching users
  const fetchUsers = (term: string): User[] => {
    // In a real application, this would be an API call
    return [
      { id: "1", firstName: "John", lastName: "Doe", profilePicture: "/path-to-john.png" },
      { id: "2", firstName: "Jane", lastName: "Smith", profilePicture: "/path-to-jane.png" },
      // Add more mock users as needed
    ].filter(user => 
      user.firstName.toLowerCase().includes(term.toLowerCase()) || 
      user.lastName.toLowerCase().includes(term.toLowerCase())
    );
  };

  const users = fetchUsers(searchTerm);

  const handleUserToggle = (user: User) => {
    setSelectedUsers(prev => 
      prev.some(u => u.id === user.id)
        ? prev.filter(u => u.id !== user.id)
        : [...prev, user]
    );
  };

  const handleAddUsers = () => {
    onAddUsers(selectedUsers);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('add-new-member')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder={t('search-users')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mb={4}
          />
          <VStack spacing={4} align="stretch">
            {users.map((user) => (
              <Box key={user.id} p={3} shadow="md" borderWidth="1px" borderRadius="md">
                <HStack spacing={4}>
                  <Checkbox
                    isChecked={selectedUsers.some(u => u.id === user.id)}
                    onChange={() => handleUserToggle(user)}
                  />
                  <Avatar
                    size="md"
                    src={user.profilePicture}
                    name={`${user.firstName} ${user.lastName}`}
                  />
                  <Text fontWeight="bold">
                    {user.firstName} {user.lastName}
                  </Text>
                </HStack>
              </Box>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddUsers}>
            {t('add-selected-users')}
          </Button>
          <Button variant="ghost" onClick={onClose}>{t('cancel')}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;