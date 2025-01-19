"use server";

import { User } from "../interfaces/types";

export async function sendMessage(user: User, accessToken: string, groupId: string, message: string) {
    if (!accessToken) {
        throw new Error("No token provided");
    }

    const messageRequest = {
        groupId: groupId,
        userId: user.id,
        message: message
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages/create-message`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(messageRequest),
                cache: 'no-store', 
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch(error) {
        console.error('Error creating new message:', error);
        throw error;
    }
    
}