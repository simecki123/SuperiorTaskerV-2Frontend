import { State, Task, User } from "@/app/interfaces/types";
import { useState, useEffect } from "react";

export function useTasks(activeUser: User, state: State, page: number) {
    
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    
    useEffect(() => {
        const fetchTasks = async () => {
        if (!activeUser?.id || !activeUser?.accessToken) {
            setError(new Error("No active user or token"));
            return;
        }
        
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/getFilteredTasks?userId=${activeUser.id}&page=${page}`,
            {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${activeUser.accessToken}`,
                },
            }
            );
    
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data: Task[] = await response.json();
            
            // Validate that each group has required fields
            const validatedGroups = data.map(task => {
            if (!task.id || !task.userId || !task.groupId || !task.name || task.taskStatus
                 || task.description || task.startDate || task.endDate) {
                console.warn('Group missing required fields:', task);
            }
            return task;
            });
            
            console.log("Tasks: ", validatedGroups);
            setTasks(validatedGroups);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
            setTasks([]); // Reset groups on error
        } finally {
            setLoading(false);
        }
        };
    
        fetchTasks();
    }, [activeUser?.id, page, activeUser?.accessToken, state]);
    
    return { tasks, loading, error};
    
}