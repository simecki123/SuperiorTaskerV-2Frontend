"use server";

import { Task, TaskRequest } from "../interfaces/types";

function formatToLocalDateTime(dateString: string) {
    return `${dateString}T00:00:00`;
}
 
export async function updateTask(taskRequest: TaskRequest, taskId: string, accessToken: string): Promise<Task> {
    if(!accessToken) {
        throw new Error("No user token provided");
    }

    const formattedRequest = {
        ...taskRequest,
        startDate: formatToLocalDateTime(taskRequest.startDate),
        endDate: formatToLocalDateTime(taskRequest.endDate)
    }

    try {

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/update-task?taskId=${taskId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(formattedRequest),
                cache: 'no-store', 

            }
        );

        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return await response.json();

    } catch(error) {
        console.error('Error updating new task:', error);
        throw error;
    }
    
    
}