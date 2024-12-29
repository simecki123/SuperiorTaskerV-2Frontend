"use server";
import { Group, User } from "@/app/interfaces/types";

export async function fetchGroupById(user: User,accessToken: string, groupId: string): Promise<Group> {

    if (!user?.id || !accessToken || !groupId) {
        throw new Error("No active user or token or groupId");
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/get-group-by-id?groupId=${groupId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            
          }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Group = await response.json();

    
    if (!data.id || !data.name || !data.description || !data.photoUri) {
        console.warn("Group missing required fields:", data);
    }
    return data;
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw error;
  }
}

