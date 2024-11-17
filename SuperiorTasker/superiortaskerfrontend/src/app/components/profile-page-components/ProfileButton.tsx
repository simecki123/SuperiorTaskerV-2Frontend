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
import { User } from '@/app/interfaces/types';



export default function ProfileButton({ activeUser }: {activeUser: User}) {
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
            boxSize={14}
            src={activeUser.profileUri}
            name={`${activeUser.firstName} ${activeUser.lastName}`}
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
            {`${activeUser.firstName} ${activeUser.lastName}`}
          </Text>
          <Text fontSize="sm" color="blue.500">
            View Profile
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}