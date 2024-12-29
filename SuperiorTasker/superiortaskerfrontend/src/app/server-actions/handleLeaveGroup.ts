"use server";

export async function handleLeaveGroup(
  userId: string,
  groupId: string,
  accessToken: string
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/leave-group?userId=${userId}&groupId=${groupId}`;
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { 
      success: true,
      message: 'Successfully left the group' 
    };
  } catch (error) {
    return { 
      success: false,
      message: error instanceof Error ? error.message : 'Error leaving group'
    };
  }
}