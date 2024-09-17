import { Box } from "@chakra-ui/react";
import React from "react";
import ProfileDataComponent from "@/app/components/profile-page-components/ProfileDataComponent";
import UsersImportantStatsComponent from "@/app/components/profile-page-components/UsersImportantStatsComponent";

const user = {
  id: "123",
  firstName: "John",
  lastName: "Doe",
  profileImage: "https://geo-media.beatport.com/image_size/1400x1400/a62f2539-e1f7-4d38-b6f8-ca5ea6a20371.jpg",
};

const mockTasks = [
  { id: 1, title: "Implement login feature", description: "Create a secure login system", projectName: "Auth Service", status: "in_progress" },
  { id: 2, title: "Design landing page", description: "Create an attractive landing page", projectName: "Marketing Site", status: "done" },
  { id: 3, title: "Optimize database queries", description: "Improve performance of key DB queries", projectName: "Backend Optimization", status: "in_progress" },
  { id: 4, title: "Write unit tests", description: "Increase test coverage for core modules", projectName: "Quality Assurance", status: "done" },
  { id: 5, title: "Implement payment gateway", description: "Integrate Stripe for payments", projectName: "E-commerce Platform", status: "in_progress" },
  { id: 6, title: "Create user dashboard", description: "Design and implement user dashboard", projectName: "User Portal", status: "done" },
  { id: 7, title: "Refactor legacy code", description: "Modernize old codebase", projectName: "Tech Debt", status: "in_progress" },
  // Add more mock tasks as needed
];

export default function ProfilePage() {
  return (
    <Box maxW="container.xl" mx="auto" px={4} py={8}>
      <ProfileDataComponent user={user} />
      <UsersImportantStatsComponent mockTasks={mockTasks} />
    </Box>
  );
}