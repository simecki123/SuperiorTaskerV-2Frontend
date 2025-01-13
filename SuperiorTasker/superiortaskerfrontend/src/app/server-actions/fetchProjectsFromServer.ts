"use server";
import { Project, ProjectBodySearch, User } from "../interfaces/types";

export async function fetchProjectsFromServer(body: ProjectBodySearch, user: User, accessToken: string, page: number): Promise<Project[]> {
    if (!user?.id || !accessToken) {
        throw new Error("No active user or token");
    }

    try {
        const params = new URLSearchParams({
            userId: body.userId,
            groupId: body.groupId,
            startCompletion: body.startCompletion?.toString() || '',
            endCompletion: body.endCompletion?.toString() || '',
            includeComplete: body.includeComplete?.toString() || '',
            includeNotStarted: body.includeNotStarted?.toString() || '',
            search: body.search || '',
            page: page.toString()
        });

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/getFilteredProjects?${params.toString()}`,
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

        const data: Project[] = await response.json();
        return data;
    } catch(error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}