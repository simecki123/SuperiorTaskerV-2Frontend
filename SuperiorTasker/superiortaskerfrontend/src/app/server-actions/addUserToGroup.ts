'use server';

import { NotYetGroupMember, User } from "../interfaces/types";

export async function addUsersToGroup(
  user: User, 
  groupId: string, 
  accessToken: string, 
  selectedUsers: NotYetGroupMember[]
) {
  if (!user?.id || !accessToken) {
    throw new Error("No active user or token");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/add-users-to-group?groupId=${groupId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(selectedUsers.map(user => ({
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          description: user.description,
          photoUrl: user.photoUri
        })))
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding users to group:', error);
    throw error;
  }
}