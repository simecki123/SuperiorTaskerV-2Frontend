import React from 'react';
import {
  Box,
  Avatar,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from 'next/navigation';

const user = {
  id: "123",
  firstName: "John",
  lastName: "Doe",
  profileImage: "/api/placeholder/100/100",
};

export default function ProfileButton() {
  const router = useRouter();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleClick = () => {
    router.push('/profile');
  };

  return (
    <Popover placement="bottom-end" trigger="hover">
      <PopoverTrigger>
        <Box
          as="button"
          onClick={handleClick}
          position="relative"
          transition="all 0.2s"
          _hover={{ transform: "scale(1.05)" }}
        >
          <Avatar
            size="md"
            src={user.profileImage}
            name={`${user.firstName} ${user.lastName}`}
            border="2px"
            borderColor={borderColor}
          />
        </Box>
      </PopoverTrigger>
      <PopoverContent
        width="200px"
        bg={bgColor}
        borderColor={borderColor}
        _focus={{ boxShadow: "md" }}
      >
        <PopoverBody>
          <Text fontWeight="bold" color={textColor}>
            {`${user.firstName} ${user.lastName}`}
          </Text>
          <Text fontSize="sm" color="blue.500">
            View Profile
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}