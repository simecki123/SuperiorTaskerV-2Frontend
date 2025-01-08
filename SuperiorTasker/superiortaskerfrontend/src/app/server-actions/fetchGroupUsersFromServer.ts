"use server"
import { GroupMember, User } from "@/app/interfaces/types";

export async function fetchGroupUsersFromServer(user: User, accessToken: string, groupId: string, page: number): Promise<GroupMember[]> {
  if (!user?.id || !user?.accessToken) {
    throw new Error("No active user or token");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/get-all-group-members?groupId=${groupId}&page=${page}`,
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

    const data: GroupMember[] = await response.json();

    return data.map((member) => {
      if (!member.userId || !member.firstName || !member.lastName || !member.description || 
          !member.role || !member.photoUri ) {
        console.warn("Task missing required fields:", member);
      }
      return member;
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

