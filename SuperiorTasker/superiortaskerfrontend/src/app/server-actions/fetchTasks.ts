"use server"
import { Task, User } from "@/app/interfaces/types";

export async function fetchTasksFromServer(user: User, page: number): Promise<Task[]> {
  if (!user?.id || !user?.accessToken) {
    throw new Error("No active user or token");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/getFilteredTasks?userId=${user.id}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        // Add caching options
        cache: 'force-cache',
        
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Task[] = await response.json();

    return data.map((task) => {
      if (!task.id || !task.userId || !task.groupId || !task.name || 
          !task.taskStatus || !task.startDate || !task.endDate) {
        console.warn("Task missing required fields:", task);
      }
      return task;
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

