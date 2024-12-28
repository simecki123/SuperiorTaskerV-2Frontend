/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import GroupProjectsData from "@/app/components/group-projects/GroupProjectsData";
import { auth } from "@/commons/auth";
import { User } from "@/app/interfaces/types";
import { fetchMe } from "@/app/server-actions/fetchMe";



export default async function Projects() {
  const session: any = await auth();
  const user: User = session?.user;
  const fetchedUser = await fetchMe(session.user.accessToken);
  
  return (
    <GroupProjectsData
    user={fetchedUser}
    accessToken={session.user.accessToken} />
  );
}