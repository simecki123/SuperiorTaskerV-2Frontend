/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@chakra-ui/react";
import React from "react";
import ProfileDataComponent from "@/app/components/profile-page-components/ProfileDataComponent";
import UsersImportantStatsComponent from "@/app/components/profile-page-components/user-data-options/UsersImportantStatsComponent";
import { auth } from "@/commons/auth";



const mockTasks = [
  { id: 1, title: "Implement login feature", description: "Create a secure login system", projectName: "Auth Service", status: "in_progress" },
  { id: 2, title: "Design landing page", description: "Create an attractive landing page", projectName: "Marketing Site", status: "done" },
  { id: 3, title: "Optimize database queries", description: "Improve performance of key DB queries", projectName: "Backend Optimization", status: "in_progress" },
  { id: 4, title: "Write unit tests", description: "Increase test coverage for core modules", projectName: "Quality Assurance", status: "done" },
  { id: 5, title: "Implement payment gateway", description: "Integrate Stripe for payments", projectName: "E-commerce Platform", status: "in_progress" },
  { id: 6, title: "Create user dashboard", description: "Design and implement user dashboard", projectName: "User Portal", status: "done" },
  { id: 7, title: "Refactor legacy code", description: "Modernize old codebase", projectName: "Tech Debt", status: "in_progress" },
];

const mockMessages = [
  { id: 1, sender: "Alice Smith", content: "Hey, can you review my pull request when you get a chance?", timestamp: "2023-09-17T10:30:00Z", read: false },
  { id: 2, sender: "Bob Johnson", content: "Team meeting at 2 PM today. Don't forget to prepare your weekly update.", timestamp: "2023-09-17T09:15:00Z", read: true },
  { id: 3, sender: "Charlie Brown", content: "The client loved our presentation! Great job everyone!", timestamp: "2023-09-16T16:45:00Z", read: true },
  { id: 4, sender: "Diana Prince", content: "There's an issue with the latest deployment. Can we hop on a quick call?", timestamp: "2023-09-16T14:20:00Z", read: false },
  { id: 5, sender: "Ethan Hunt", content: "New project kick-off meeting scheduled for tomorrow at 11 AM. Be there!", timestamp: "2023-09-15T17:00:00Z", read: true },
];

const mockGroups = [
  {
    id: 1,
    title: "Frontend Development",
    description: "Group focused on frontend tech like React, CSS, and more.",
    projectsCount: 12,
    usersCount: 8,
  },
  {
    id: 2,
    title: "Backend Development",
    description: "Working on server-side technologies like Node.js and databases.",
    projectsCount: 15,
    usersCount: 5,
  },
  {
    id: 3,
    title: "DevOps Team",
    description: "Automating deployments and maintaining infrastructure.",
    projectsCount: 9,
    usersCount: 6,
  },
  {
    id: 4,
    title: "UI/UX Design",
    description: "Designing intuitive and beautiful user interfaces.",
    projectsCount: 7,
    usersCount: 4,
  },
  {
    id: 5,
    title: "Project Management",
    description: "Coordinating tasks and managing timelines for the project.",
    projectsCount: 5,
    usersCount: 3,
  },
  {
    id: 6,
    title: "Quality Assurance",
    description: "Ensuring product quality through tests and reviews.",
    projectsCount: 11,
    usersCount: 5,
  },
];


export default async function ProfilePage() {

  const session: any = await auth();
  const user: any = session?.user;

  return (
    <Box maxW="container.xl" mx="auto" px={4} py={8}>
      <ProfileDataComponent user={user} />
      <UsersImportantStatsComponent mockTasks={mockTasks} mockMessages={mockMessages} mockGroups={mockGroups} />
    </Box>
  );
}