/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Textarea,
  Box,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import  FiUpload  from "@/../public/fallback-group.png";

export default function CreateGroupForm({ onClose, state, formAction }: any) {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <form action={formAction}>
      <VStack spacing={6} align="stretch">
        {/* Image Upload */}
        <FormControl>
          <FormLabel>Group Image</FormLabel>
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
              onChange={handleImageChange}
              hidden
            />
            {previewUrl ? (
              <Box boxSize="150px" mx="auto">
                <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'md' }} />
              </Box>
            ) : (
              <VStack spacing={2}>
                
                <Text fontWeight="medium">Click to upload image</Text>
                <Text fontSize="sm" color="gray.500">
                  or drag and drop
                </Text>
              </VStack>
            )}
          </Box>
        </FormControl>

        {/* Group Name Input */}
        <FormControl isRequired>
          <FormLabel>Group Name</FormLabel>
          <Input
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </FormControl>

        {/* Group Description Input */}
        <FormControl>
          <FormLabel>Group Description</FormLabel>
          <Textarea
            resize="none"
            placeholder="Add a short description for the group"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          colorScheme="blue"
          onClick={onClose}
          isDisabled={!groupName || !image}
          size="lg"
          width="full"
        >
          Create Group
        </Button>
      </VStack>
    </form>
  );
}