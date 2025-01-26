"use server";

import { Project } from "../interfaces/types";

export async function fetchProjectById(projectId: string, accessToken: string): Promise<Project> {
    if ( !accessToken) {
        throw new Error("No active user or token");
    }

    try {

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/get-project-by-id?projectId=${projectId}`,
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

        const data: Project = await response.json();
        return data;

    } catch(error) {
        console.error('Error fetching project:', error);
        throw error;
    }
    
}