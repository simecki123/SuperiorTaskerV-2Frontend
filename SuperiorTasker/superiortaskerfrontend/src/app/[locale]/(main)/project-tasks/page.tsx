import ProjectTaskData from "@/app/components/project-task-components/ProjectTaskData";
import React from "react";
import { auth } from "@/commons/auth";
import { User } from "@/app/interfaces/types";
import { fetchMe } from "@/app/server-actions/fetchMe";



export default async function ProjectTasks() {
    const session: any = await auth();
    const user: User = session?.user;
    const fetchedUser = await fetchMe(session.user.accessToken);

    return(
        <ProjectTaskData
        user={fetchedUser}
        accessToken={session.user.accessToken} />
    );
  
};

