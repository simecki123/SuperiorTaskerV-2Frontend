"use client"
import React, { useState } from "react";
import { 
  Box, 
  Button, 
  Textarea, 
  HStack, 
  Icon,
  useToast
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { useTranslations } from "next-intl";
import { User } from "@/app/interfaces/types";
import { useSearchParams } from "next/navigation";
import { sendMessage } from "@/app/server-actions/sendMessage";

interface SendMessageComponentProps {
  user: User;
  accessToken: string;
}

export default function SendMessageComponent({ user, accessToken }: SendMessageComponentProps) {
  const searchParams = useSearchParams();
  const t = useTranslations('group-page');
  const toast = useToast();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const groupId = searchParams.get('groupId') || '0';

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast({
        title: t('message-empty'),
        description: t('please-enter-message'),
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      await sendMessage(user, accessToken, groupId, message);
      
      toast({
        title: t('message-sent'),
        description: t('message-sent-successfully'),
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      setMessage("");
    } catch (error) {
      toast({
        title: t('error'),
        description: error instanceof Error ? error.message : t('failed-to-send-message'),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={5} borderRadius="md">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t('type-your-message-here')}
        size="sm"
        resize="none"
        mb={4}
      />
      <HStack justify="flex-end">
        <Button
          colorScheme="teal"
          leftIcon={<Icon as={EmailIcon} />}
          variant="solid"
          isLoading={isLoading}
          onClick={handleSendMessage}
          disabled={!message.trim() || isLoading}
        >
          {t('send-message')}
        </Button>
      </HStack>
    </Box>
  );
}