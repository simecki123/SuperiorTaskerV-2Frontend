export async function deleteTask(userId: string, accessToken: string, taskId: string) {
    if (!userId || !accessToken) {
        throw new Error("No active user or token");
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/delete-task?taskId=${taskId}`,
            {
                method: "DELETE",
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
            throw new Error(`Failed to delete task. Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
}