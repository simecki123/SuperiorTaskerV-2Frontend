"use server";

interface DeleteProjectResponse {
    success: boolean;
    message: string;
}

export async function deleteProject(projectId: string, accessToken: string): Promise<DeleteProjectResponse> {
    if (!accessToken) {
        return {
            success: false,
            message: "No token provided"
        };
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/delete-project?projectId=${projectId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.text();
            return {
                success: false,
                message: errorData || `Error: ${response.status}`
            };
        }

        const data = await response.json();
        return {
            success: data.success,
            message: data.message
        };

    } catch(error) {
        console.error('Error while deleting project:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "An unknown error occurred"
        };
    }
}