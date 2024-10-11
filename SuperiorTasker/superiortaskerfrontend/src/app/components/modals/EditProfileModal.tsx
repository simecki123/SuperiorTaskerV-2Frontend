/* eslint-disable @typescript-eslint/no-explicit-any */
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
  
  export default function EditProfileModal({ isOpen, onClose, user }: any) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditProfileModalForm user={user} onClose={onClose} /> {/* Pass user and onClose */}
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  