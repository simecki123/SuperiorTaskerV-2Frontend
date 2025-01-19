"use server"

import { NotYetGroupMember, User } from "@/app/interfaces/types";

export async function fetchGroupUsersFromServerWithSearchFilter(
  user: User,
  accessToken: string,
  groupId: string,
  page: number = 0,
  search: string = ""
): Promise<NotYetGroupMember[]> {
  if (!user?.id || !accessToken) {
    throw new Error("No active user or token");
  }

  if (!groupId) {
    throw new Error("Group ID is required");
  }

  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/get-users-for-task-creation`);
    url.searchParams.append('groupId', groupId);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('size', '4'); // Match the page size from your modal
    
    if (search && search.trim()) {
      url.searchParams.append('search', search.trim());
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store' 
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data: NotYetGroupMember[] = await response.json();

    return data.map((member) => {
      if (!member.userId || !member.firstName || !member.lastName) {
        throw new Error(`Invalid member data: missing required fields`);
      }

      return {
        userId: member.userId,
        firstName: member.firstName,
        lastName: member.lastName,
        description: member.description || '', 
        photoUri: member.photoUri || '', 
      };
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch users');
  }
}