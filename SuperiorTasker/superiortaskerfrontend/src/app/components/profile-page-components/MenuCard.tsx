"use client";
import React from "react";
import { Box, VStack, Text, useColorModeValue } from "@chakra-ui/react";


interface MenuCardProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function MenuCard({ name, isSelected, onClick }: MenuCardProps) {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const selectedBg = useColorModeValue("blue.50", "blue.900");
  const selectedBorder = "blue.500";

  return (
    <Box
      as="button"
      p={4}
      borderWidth={1}
      borderRadius="lg"
      bg={isSelected ? selectedBg : bgColor}
      borderColor={isSelected ? selectedBorder : borderColor}
      boxShadow={isSelected ? "md" : "sm"}
      onClick={onClick}
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
      height="100%"
    >
      <VStack spacing={2}>
        <Text fontWeight="medium">{name}</Text>
      </VStack>
    </Box>
  );
}