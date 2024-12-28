/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import GroupProjectsData from "@/app/components/group-projects/GroupProjectsData";
import { auth } from "@/commons/auth";
import { User } from "@/app/interfaces/types";
import { fetchMe } from "@/app/server-actions/fetchMe";

const mockProjects = [ 
  { id: 1, title: "Website Redesign", description: "Overhaul company website", startDate: "2024-10-01", endDate: "2024-12-31", completion: "25%" },
  { id: 2, title: "Mobile App Development", description: "Create a new mobile app", startDate: "2024-09-15", endDate: "2025-03-31", completion: "10%" },
  { id: 3, title: "Data Migration", description: "Migrate data to new system", startDate: "2024-11-01", endDate: "2025-01-31", completion: "0%" },
  { id: 4, title: "AI Integration", description: "Implement AI features", startDate: "2025-01-01", endDate: "2025-06-30", completion: "5%" },
  { id: 5, title: "Security Audit", description: "Conduct annual security audit", startDate: "2024-12-01", endDate: "2024-12-31", completion: "50%" },
  // Add more mock projects here to test pagination
];

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