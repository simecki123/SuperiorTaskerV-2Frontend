// app/components/NotificationBell.tsx
'use client';
import { useEffect, useState } from 'react';
import { Box, useColorModeValue, useToast } from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Message, User } from '@/app/interfaces/types';
import { useRouter } from 'next/navigation';

interface NotificationBellProps {
  user: User;
}

export default function NotificationBell({ user }: NotificationBellProps) {
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const bellColor = useColorModeValue('gray.600', 'gray.200');
  const activeBellColor = useColorModeValue('blue.500', 'blue.300');

  useEffect(() => {
    if (!user?.id) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ws`),
      reconnectDelay: 5000,
      debug: (str) => {
        console.log('STOMP: ' + str);
      },
    });

    client.onConnect = () => {
      console.log('Connected to WebSocket');
      
      client.subscribe(`/topic/messages.${user.id}`, (message) => {
        try {
          const receivedMessage: Message = JSON.parse(message.body);
          console.log('Received message:', receivedMessage);
          
          setHasNewMessages(true);
          
          toast({
            title: 'New Message',
            description: `${receivedMessage.firstName} ${receivedMessage.lastName}: ${receivedMessage.message}`,
            status: 'info',
            duration: 5000,
            isClosable: true,
            position: 'top-right'
          });
        } catch (error) {
          console.error('Error processing message:', error);
        }
      });
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [user?.id, toast]);

  const handleBellClick = () => {
    setHasNewMessages(false);
    router.push('/profile');
  };

  return (
    <Box
      onClick={handleBellClick}
      cursor="pointer"
      position="relative"
      padding={2}
    >
      <BellIcon
        w={6}
        h={6}
        color={hasNewMessages ? activeBellColor : bellColor}
        className={hasNewMessages ? 'animate-bounce' : ''}
      />
      {hasNewMessages && (
        <Box
          position="absolute"
          top={0}
          right={0}
          width={3}
          height={3}
          borderRadius="full"
          bg="red.500"
        />
      )}
    </Box>
  );
}