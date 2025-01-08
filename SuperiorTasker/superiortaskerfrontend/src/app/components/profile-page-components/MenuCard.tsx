import React from "react";
import { Box, Text, Badge } from "@chakra-ui/react";

interface MenuCardProps {
  name: string;
  title: string;
  isSelected: boolean;
  onClick: () => void;
  unreadCount?: number;
}

export default function MenuCard({ 
  name, 
  title, 
  isSelected, 
  onClick, 
  unreadCount = 0 
}: MenuCardProps) {
  return (
    <Box
      position="relative"
      onClick={onClick}
      borderWidth={2}
      borderColor={isSelected ? "blue.500" : "gray.200"}
      borderRadius="md"
      p={4}
      textAlign="center"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ 
        bg: "gray.500",
        transform: "scale(1.05)"
      }}
    >
      <Text fontWeight={isSelected ? "bold" : "normal"}>{title}</Text>
      {unreadCount > 0 && (
        <Badge 
          position="absolute" 
          top="-10px" 
          right="-10px" 
          colorScheme="red"
          borderRadius="full"
        >
          {unreadCount}
        </Badge>
      )}
    </Box>
  );
}