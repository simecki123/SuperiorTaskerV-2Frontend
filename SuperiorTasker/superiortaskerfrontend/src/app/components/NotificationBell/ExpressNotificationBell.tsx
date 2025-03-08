/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { Box, useColorModeValue, useToast } from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import { io, Socket } from 'socket.io-client';
import { Message, User } from '@/app/interfaces/types';
import { useRouter } from 'next/navigation';

interface NotificationBellProps {
  user: User;
}

export default function ExpressNotificationBell({ user }: NotificationBellProps) {
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const toast = useToast();
  const router = useRouter();
  const bellColor = useColorModeValue('gray.600', 'gray.200');
  const activeBellColor = useColorModeValue('blue.500', 'blue.300');

  useEffect(() => {
    if (!user?.id) return;

    // Initialize Socket.io connection
    const newSocket = io(process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || 'http://localhost:8080', {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });

    newSocket.on('connect', () => {
      console.log('Socket.io connected with ID:', newSocket.id);
      
      newSocket.emit('join', user.id);
      console.log(`Joined room for user: ${user.id}`);
    });

    newSocket.on('new-message', (receivedMessage: Message) => {
      console.log('Received message via Socket.io:', receivedMessage);
      
      setHasNewMessages(true);
      
      toast({
        title: 'New Message',
        description: `${receivedMessage.firstName} ${receivedMessage.lastName}: ${receivedMessage.message}`,
        status: 'info',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
    });

    newSocket.on('connect_error', (error: any) => {
      console.error('Socket.io connection error:', error);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        console.log('Disconnecting Socket.io...');
        newSocket.disconnect();
      }
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