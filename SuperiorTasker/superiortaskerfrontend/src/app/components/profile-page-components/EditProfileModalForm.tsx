/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useTransition } from "react";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Box,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { User } from "@/app/interfaces/types";
import { handleUserUpdate } from "@/app/server-actions/handleUserUpdate";
import { useUserStore } from "@/commons/zustandFiles/userUpdatedStore";

interface EditProfileModalFormProps {
  user: User;
  onClose: () => void;
  setUser: (user: User) => void;
}

export default function EditProfileModalForm({ user, onClose, setUser }: EditProfileModalFormProps) {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  const { setUser: setZustandUser } = useUserStore();
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    description: user?.description || "",
    profileImage: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string>(user?.profileUri || "");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("description", formData.description);
    form.append("accessToken", user.accessToken); // This will now come from the injected accessToken
    if (formData.profileImage) {
      form.append("file", formData.profileImage);
    }
  
    startTransition(async () => {
      const result = await handleUserUpdate(null, form);
  
      if (result.errors) {
        toast({
          title: "Error",
          description: result.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
  
      console.log("NewUser ",result)
      setUser({
        ...user,
        ...result.data,
      });
      
      setZustandUser({
        ...user,
        ...result.data,
      });
      
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    });
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <VStack spacing={6} align="stretch">
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter a short bio"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Profile Image</FormLabel>
          <Box
            borderWidth={2}
            borderStyle="dashed"
            borderColor={borderColor}
            borderRadius="md"
            p={4}
            textAlign="center"
            cursor="pointer"
            onClick={() => document.getElementById("file-input")?.click()}
            bg={bgColor}
            _hover={{ bg: useColorModeValue("gray.200", "gray.600") }}
            transition="background-color 0.2s"
          >
            <Input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
            {previewUrl ? (
              <Box boxSize="150px" mx="auto">
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "md",
                  }}
                />
              </Box>
            ) : (
              <VStack spacing={2}>
                <Text fontWeight="medium">Click to upload picture</Text>
                <Text fontSize="sm" color="gray.500">
                  or drag and drop
                </Text>
              </VStack>
            )}
          </Box>
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          width="full"
          isLoading={isPending}
        >
          Save Changes
        </Button>
      </VStack>
    </form>
  );
}