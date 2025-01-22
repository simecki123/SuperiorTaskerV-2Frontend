/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { VStack, Box, Text, Badge, useBreakpointValue, Flex, useToast } from "@chakra-ui/react";
import Pagination from "./all-tasks-components/Pagination";
import { useTranslations } from "next-intl";
import { Message, User } from "@/app/interfaces/types";
import { fetchMessagess } from "@/app/server-actions/fetchMessagess";
import { updateMessageOnServer } from "@/app/server-actions/updateMessage";
import { connectWebSocket, disconnectWebSocket } from "@/app/server-actions/setUpWebSocketConnection";

export default function UserMessagesComponent({ 
  user 
}: { 
  user: User 
}) {
  const t = useTranslations('user-messages');
  const [currentPage, setCurrentPage] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cardSize = useBreakpointValue({ base: "sm", md: "lg" });
  const toast = useToast();

  const handleNewMessage = (message: Message) => {
    // Add new message to the list if it's on the first page
    if (currentPage === 0) {
      setMessages(prevMessages => [message, ...prevMessages]);
    }
  };

  useEffect(() => {
    if (user?.id) {
      // Connect to WebSocket
      connectWebSocket(user.id, handleNewMessage);

      // Cleanup on unmount
      return () => {
        disconnectWebSocket();
      };
    }
  }, [user?.id]);

  const loadMessages = async (page: number) => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);

    try {
      const currentMessages = await fetchMessagess(user, page);
      const nextMessages = await fetchMessagess(user, page + 1);
      setMessages(currentMessages);
      setHasNextPage(nextMessages.length > 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages(currentPage);
  }, [currentPage, user?.id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!messages?.length) {
    return <Text>No messages available.</Text>;
  }

  const updateMessage = async (message: Message) => {
    if (message.messageStatus === 'UNREAD') {
      try {
        const updatedMessage = await updateMessageOnServer(user, message.id);

        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === message.id ? { ...msg, messageStatus: 'READ' } : msg
          )
        );
  
        toast({
          title: "Message updated.",
          description: "The message has been marked as read.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error updating message:", error);
  
        toast({
          title: "Error updating message.",
          description: "An error occurred while updating the message.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };
  
  return (
    <VStack spacing={4} align="stretch">
      {messages.map((message) => (
        <Box
          key={message.id}
          p={cardSize === "lg" ? 6 : 4}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
          bg={message.messageStatus === 'UNREAD' ? "xblue.100" : undefined} 
          onClick={() => updateMessage(message)}
        >
          <Flex justifyContent="space-between" alignItems="center" mb={2}>
            <Text fontWeight="bold" fontSize={cardSize === "lg" ? "xl" : "lg"}>
              {`${message.firstName} ${message.lastName}`}
            </Text>
            <Badge colorScheme={message.messageStatus === 'READ' ? "green" : "red"}>
              {message.messageStatus === 'READ' ? `${t('read')}` : `${t('unread')}`}
            </Badge>
          </Flex>
          <Text fontSize={cardSize === "lg" ? "md" : "sm"} mb={2}>
            {message.message}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {message.createdAt}
          </Text>
        </Box>      
      ))}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        hasNextPage={hasNextPage}
      />
    </VStack>
  );
}