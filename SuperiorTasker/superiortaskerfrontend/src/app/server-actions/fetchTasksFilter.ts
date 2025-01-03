import { Task, TaskBodySearch, User } from "../interfaces/types";

export async function fetchTasksFilter(body: TaskBodySearch, user: User, accessToken: string, page: number): Promise<Task[]> {
    if (!user?.id || !accessToken) {
        throw new Error("No active user or token");
    }

    try{

        console.log('Request parameters:', {
            userId: user.id,
            groupId: body.groupId,
            projectId: body.projectId,
            status: body.status,
            search: body.search,
            page
        });

        const params = new URLSearchParams({
            userId: user.id,
            groupId: body.groupId,
            projectId: body.projectId || '',
            status: body.status || '',
            search: body.search || '',
            page: page.toString()
        });

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/getFilteredTasks?${params.toString()}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              cache: 'no-store',
            }
          );

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Task[] = await response.json();
         console.log('Received data:', data);
        return data;

    }catch(error){
        console.error('Error fetching tasks:', error);
        throw error;
    }
}