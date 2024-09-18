"use client";
import React, { useState } from "react";
import { VStack, Box, Text, Badge, useBreakpointValue, Flex } from "@chakra-ui/react";
import Pagination from "./all-tasks-components/Pagination";
import { useTranslations } from "next-intl";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
}

const ITEMS_PER_PAGE = 2; // Number of messages per page

export default function UserMessagesComponent({ messages }: { messages: Message[] }) {
  const t = useTranslations('user-messages');
  const [currentPage, setCurrentPage] = useState(1);
  const cardSize = useBreakpointValue({ base: "sm", md: "lg" });

  // Pagination logic
  const indexOfLastMessage = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstMessage = indexOfLastMessage - ITEMS_PER_PAGE;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  if (messages.length === 0) {
    return <Text>No messages available.</Text>;
  }

  return (
    <VStack spacing={4} align="stretch">
      {currentMessages.map((message) => (
        <Box
          key={message.id}
          p={cardSize === "lg" ? 6 : 4}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          bg={message.read ? "default" : "xblue.100"}
        >
          <Flex justifyContent="space-between" alignItems="center" mb={2}>
            <Text fontWeight="bold" fontSize={cardSize === "lg" ? "xl" : "lg"}>
              {message.sender}
            </Text>
            <Badge colorScheme={message.read ? "green" : "red"}>
              {message.read ? `${t('read')}` : `${t('unread')}`}
            </Badge>
          </Flex>
          <Text fontSize={cardSize === "lg" ? "md" : "sm"} mb={2}>
            {message.content}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {new Date(message.timestamp).toLocaleString()}
          </Text>
        </Box>
      ))}

      {/* Adding Pagination Component */}
      <Pagination
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={messages.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </VStack>
  );
}
