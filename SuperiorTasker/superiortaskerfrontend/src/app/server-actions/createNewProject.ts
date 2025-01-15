"use server";

import { Project, ProjectRequest } from "../interfaces/types";

function formatToLocalDateTime(dateString: string) {
    return `${dateString}T00:00:00`;
}

export async function createNewProject(projectRequest: ProjectRequest, accessToken: string): Promise<Project> {
    if (!accessToken) {
        throw new Error("No token provided");
    }
    const formattedRequest = {
        ...projectRequest,
        startDate: formatToLocalDateTime(projectRequest.startDate),
        endDate: formatToLocalDateTime(projectRequest.endDate)
    };

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/createProject`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(formattedRequest),
                cache: 'no-store', 
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch(error) {
        console.error('Error creating new project:', error);
        throw error;
    }
    
}