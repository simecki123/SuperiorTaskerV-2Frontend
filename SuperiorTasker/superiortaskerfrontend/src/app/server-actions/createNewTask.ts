"use server";

import { TaskRequest, Task } from "../interfaces/types";

function formatToLocalDateTime(dateString: string) {
    return `${dateString}T00:00:00`;
}

export async function createNewTask(taskRequest: TaskRequest, accessToken: string): Promise<Task> {
    if (!accessToken) {
        throw new Error("No token provided");
    }
    const formattedRequest = {
        ...taskRequest,
        startDate: formatToLocalDateTime(taskRequest.startDate),
        endDate: formatToLocalDateTime(taskRequest.endDate)
    };

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/createTask`,
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
        console.error('Error creating new task:', error);
        throw error;
    }
    
}