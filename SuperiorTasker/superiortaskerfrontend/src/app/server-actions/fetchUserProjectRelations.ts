"use server";

import { UserProjectRelation } from "../interfaces/types";

export async function fetchUserProjectRelations(userProjectRelations: UserProjectRelation[], accessToken: string): Promise<UserProjectRelation[]> {
    if (!accessToken) {
        throw new Error("No token provided");
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/get-user-projectRelation`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(userProjectRelations),
                cache: 'no-store', 
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch(error) {
        console.error('Error fetching user project relations:', error);
        throw error;
    }
}