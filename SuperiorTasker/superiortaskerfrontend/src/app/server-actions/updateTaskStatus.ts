export async function updateTaskStatus(userId: string, accessToken: string, taskId: string, status: string) {
    if (!userId || !accessToken) {
        throw new Error("No active user or token");
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/update-task-status?taskId=${taskId}&taskStatus=${status}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                cache: 'no-store',
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`Failed to update task. Status: ${response.status}`);
        }

        return { id: taskId, taskStatus: status };
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
}