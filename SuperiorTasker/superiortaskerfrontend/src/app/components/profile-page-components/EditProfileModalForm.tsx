/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
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
} from "@chakra-ui/react";

export default function EditProfileModalForm({ user, onClose }: any) {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    description: user?.description || "",
    profileImage: null,  // for storing the new profile image
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = () => {
    // Handle form submission (API call here)
    console.log(formData);
    onClose();  // Close modal after submission
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <form>
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

        {/* Profile Image Upload */}
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

        <Button colorScheme="blue" onClick={handleSubmit} width="full">
          Save Changes
        </Button>
      </VStack>
    </form>
  );
}
