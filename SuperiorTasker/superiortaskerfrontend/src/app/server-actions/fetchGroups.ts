"use server";
import { Group, User } from "@/app/interfaces/types";

export async function fetchGroupsFromServer(user: User, page: number): Promise<Group[]> {
    if (!user?.id || !user?.accessToken) {
        throw new Error("No active user or token");
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/get-all-user-groups?userId=${user.id}&page=${page}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
            },
            
          }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Group[] = await response.json();

    return data.map((group) => {
      if (!group.id || !group.name || !group.description || !group.photoUri) {
        console.warn("Group missing required fields:", group);
      }
      return group;
    });
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw error;
  }
}

