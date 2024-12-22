import { User } from "../interfaces/types";

export async function updateMessageOnServer(user: User, messageId: string) {
    if (!user?.id || !user?.accessToken) {
      throw new Error("No active user or token");
    }
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages/update-message-status?messageId=${messageId}&messageStatus=READ`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          cache: 'no-store',
        }
      );
  
      if (!response.ok) {
        throw new Error(`Failed to update message. Status: ${response.status}`);
      }
  
      return { id: messageId, read: true };
    } catch (error) {
      console.error("Error updating message:", error);
      throw error;
    }
  }