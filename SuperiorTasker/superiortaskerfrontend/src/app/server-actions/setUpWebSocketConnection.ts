/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/websocket-service.ts
"use server";

import { Client } from "@stomp/stompjs";
import { Message } from "@/app/interfaces/types";

export async function setupWebSocketConnection(
  onMessageReceived: (message: Message) => void
) {
  // This function will be a server action that sets up WebSocket connection logic
  return new Promise<() => void>((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error("WebSocket can only be set up on the client side"));
      return;
    }

    const client = new Client({
      brokerURL: `${process.env.NEXT_PUBLIC_WS_BACKEND}/ws`,
      onConnect: () => {
        const subscription = client.subscribe(
          `/topic/messages`,
          (message: any) => {
            const bodyObject = JSON.parse(message.body);
            const groupMessageObject: Message = {
              id: bodyObject.id,
              groupId: bodyObject.groupId,
              message: bodyObject.message,
              messageStatus: 'UNREAD',
              userProfileId: bodyObject.userProfileId,
              firstName: bodyObject.firstName,
              lastName: bodyObject.lastName,
              photoUri: bodyObject.photoUri,
              createdAt: bodyObject.createdAt,
              sender: `${bodyObject.firstName} ${bodyObject.lastName}`,
              content: bodyObject.message,
              read: false
            };

            onMessageReceived(groupMessageObject);
          }
        );

        // Resolve with a cleanup function
        resolve(() => {
          subscription.unsubscribe();
          client.deactivate();
        });
      },
      reconnectDelay: 5000,
      onDisconnect: () => {
        console.log("WebSocket Disconnected");
      },
      onStompError: (frame) => {
        console.error("WebSocket Error:", frame.headers["message"], frame.body);
        reject(new Error("WebSocket connection error"));
      },
    });

    client.activate();
  });
}