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
  useToast,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useUserStore } from "@/commons/zustandFiles/userUpdatedStore";
import { User } from "@/app/interfaces/types";

type CreateGroupFormParams = {
  user: User,
  onClose: any,
  state: any,
  formAction: any
}

export default function CreateGroupForm({ user, onClose, state, formAction }: CreateGroupFormParams) {
  const t = useTranslations('create-group-modal');
  const toast = useToast();
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

  const handleFormSubmit = async (formData: FormData) => {
    try {
      formData.set("name", groupName);
      formData.set("description", description);
      if (image) {
        formData.set("file", image);
      }
  
      const result = await formAction(formData);
      
      if (result?.errors) {
        toast({
          title: "Error",
          description: result.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
  
      
      toast({
        title: "Success",
        description: "Group created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create group",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error submitting form:", error);
    }
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <form action={handleFormSubmit}>
      <VStack spacing={6} align="stretch">
        <FormControl>
          <FormLabel>{t('group-image')}</FormLabel>
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
                
                <Text fontWeight="medium">{t('click-to-upload-picture')}</Text>
                <Text fontSize="sm" color="gray.500">
                  {t('or-drag-and-drop')}
                </Text>
              </VStack>
            )}
          </Box>
        </FormControl>

        {/* Group Name Input */}
        <FormControl isRequired>
          <FormLabel>{t('group-name')}</FormLabel>
          <Input
            placeholder={t('group-name')}
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t('group-description')}</FormLabel>
          <Textarea
            resize="none"
            placeholder={t('a-short-description-for-group')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          onClick={onClose}
          isDisabled={!groupName || !image}
          size="lg"
          width="full"
        >
          {t('create-group')}
        </Button>
      </VStack>
    </form>
  );
}