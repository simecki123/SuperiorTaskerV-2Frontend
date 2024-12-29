"use server";

import { Group } from "../interfaces/types";

export async function handleUpdateGroup(
  groupId: string,
  accessToken: string,
  formData: FormData
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/editGroup?groupId=${groupId}`;
    
    const response = await fetch(url, {
      method: 'PATCH',
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedGroup: Group = await response.json();
    return { 
      success: true,
      data: updatedGroup,
      message: 'Group updated successfully' 
    };
  } catch (error) {
    return { 
      success: false,
      message: error instanceof Error ? error.message : 'Error updating group'
    };
  }
}