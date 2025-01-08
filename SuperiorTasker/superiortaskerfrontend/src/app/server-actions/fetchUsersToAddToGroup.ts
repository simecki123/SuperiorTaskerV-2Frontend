"use server";

import { NotYetGroupMember, User } from "../interfaces/types";


export async function fetchUsersToAddToGroup(searchTerm: string, groupId: string, user: User, accessToken: string, currentPage: number) {
    if (!user?.id || !accessToken) {
        throw new Error("No active user or token");
    }

    try {
        const params = new URLSearchParams({
            groupId: groupId,
            search: searchTerm,
            page: currentPage.toString()
        });

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/add-new-member-to-group?${params.toString()}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              cache: 'no-store',
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: NotYetGroupMember[] = await response.json();
        console.log('Received data:', data);
        return data;

    } catch(error) {
        console.error('Error fetching users to add:', error);
        throw error;
    }
}