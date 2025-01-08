// app/server-actions/kickUserFromGroup.ts
"use server"
import { GroupMember, User } from "@/app/interfaces/types";

export async function kickUserFromGroup(userToKick: GroupMember, currentUser: User, groupId: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/kick-from-group?userId=${userToKick.userId}&groupId=${groupId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${currentUser.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      return { success: true, message: 'User successfully kicked from the group' };
    } else if (response.status === 401) {
      return { success: false, message: 'Unauthorized: Only admins can kick members' };
    } else if (response.status === 404) {
      return { success: false, message: 'User or group not found' };
    } else {
      return { success: false, message: 'Failed to kick user from group' };
    }
  } catch (error) {
    console.error('Error kicking user:', error);
    return { success: false, message: 'An error occurred while kicking the user' };
  }
}