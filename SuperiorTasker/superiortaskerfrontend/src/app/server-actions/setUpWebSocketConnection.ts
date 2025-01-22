/* eslint-disable @typescript-eslint/no-unused-vars */
// app/utils/websocket.ts
import { Client } from '@stomp/stompjs';
import { Message } from '../interfaces/types';
import SockJS from 'sockjs-client';

let stompClient: Client | null = null;

export const connectWebSocket = (userId: string, onMessageReceived: (message: Message) => void) => {
  if (stompClient) {
    return stompClient;
  }

  stompClient = new Client({
    webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    debug: function (str) {
      console.log('STOMP: ' + str);
    },
  });

  stompClient.onConnect = () => {
    console.log('Connected to WebSocket for user:', userId);
    
    // Subscribe to user-specific topic
    const subscription = stompClient?.subscribe(`/topic/messages.${userId}`, (message) => {
      console.log('Received message:', message.body);
      try {
        const receivedMessage = JSON.parse(message.body);
        onMessageReceived(receivedMessage);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });
    
    console.log('Subscribed to:', `/topic/messages.${userId}`);
  };

  stompClient.onDisconnect = () => {
    console.log('Disconnected from WebSocket');
  };

  stompClient.onStompError = (frame) => {
    console.error('STOMP error', frame);
  };

  stompClient.onWebSocketError = (event) => {
    console.error('WebSocket error:', event);
  };

  console.log('Activating WebSocket connection...');
  stompClient.activate();

  return stompClient;
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    console.log('Deactivating WebSocket connection...');
    stompClient.deactivate();
    stompClient = null;
  }
};