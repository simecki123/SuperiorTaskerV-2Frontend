/* eslint-disable @typescript-eslint/no-unused-vars */
import { io, Socket } from 'socket.io-client';
import { Message } from '../interfaces/types';

let socket: Socket | null = null;

export const connectSocketIo = (userId: string, onMessageReceived: (message: Message) => void) => {
  if (socket) {
    return socket;
  }

  // Create socket.io connection
  socket = io(process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || 'http://localhost:8080', {
    withCredentials: true,
    transports: ['websocket', 'polling'],
  });

  const socketInstance = socket;

  socketInstance.on('connect', () => {
    console.log('Socket.io connected with ID:', socketInstance.id);
    
    socketInstance.emit('join', userId);
    console.log('Joined room for user:', userId);
  });

  socketInstance.on('new-message', (message: Message) => {
    console.log('Received message via Socket.io:', message);
    onMessageReceived(message);
  });

  socketInstance.on('connect_error', (error) => {
    console.error('Socket.io connection error:', error);
  });

  socketInstance.on('disconnect', (reason) => {
    console.log('Socket.io disconnected:', reason);
  });

  socketInstance.on('error', (error) => {
    console.error('Socket.io error:', error);
  });

  return socketInstance;
};

export const disconnectSocketIo = () => {
  if (socket) {
    console.log('Disconnecting Socket.io...');
    socket.disconnect();
    socket = null;
  }
};