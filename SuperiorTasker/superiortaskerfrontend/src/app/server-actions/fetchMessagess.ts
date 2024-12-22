import { User, Message } from '../interfaces/types';

export async function fetchMessagess(user: User, page: number): Promise<Message[]> {
    if (!user?.id || !user?.accessToken) {
        throw new Error("No active user or token");
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages/get-messages?userProfileId=${user.id}&page=${page}`,
            {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.accessToken}`,
                },
                cache: 'no-store', 
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Message[] = await response.json();

        return data.map((message) => ({
            ...message,
            sender: `${message.firstName} ${message.lastName}`,
            content: message.message,
            timestamp: message.createdAt,
            read: message.messageStatus === 'READ'
        })).filter(message => message.id);
    } catch (error) {
        console.error("Error fetching messages ", error);
        throw error;
    }
}