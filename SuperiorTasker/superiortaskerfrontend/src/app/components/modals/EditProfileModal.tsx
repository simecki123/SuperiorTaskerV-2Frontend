import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import EditProfileModalForm from "../profile-page-components/EditProfileModalForm";
import { User } from '@/app/interfaces/types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  setUser: (user: User) => void;
}

export default function EditProfileModal({ 
  isOpen, 
  onClose, 
  user,
  setUser 
}: EditProfileModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <EditProfileModalForm 
            user={user} 
            onClose={onClose} 
            setUser={setUser}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}