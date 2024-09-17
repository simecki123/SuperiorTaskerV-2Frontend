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
];

const mockMessages = [
  { id: 1, sender: "Alice Smith", content: "Hey, can you review my pull request when you get a chance?", timestamp: "2023-09-17T10:30:00Z", read: false },
  { id: 2, sender: "Bob Johnson", content: "Team meeting at 2 PM today. Don't forget to prepare your weekly update.", timestamp: "2023-09-17T09:15:00Z", read: true },
  { id: 3, sender: "Charlie Brown", content: "The client loved our presentation! Great job everyone!", timestamp: "2023-09-16T16:45:00Z", read: true },
  { id: 4, sender: "Diana Prince", content: "There's an issue with the latest deployment. Can we hop on a quick call?", timestamp: "2023-09-16T14:20:00Z", read: false },
  { id: 5, sender: "Ethan Hunt", content: "New project kick-off meeting scheduled for tomorrow at 11 AM. Be there!", timestamp: "2023-09-15T17:00:00Z", read: true },
];

export default function ProfilePage() {
  return (
    <Box maxW="container.xl" mx="auto" px={4} py={8}>
      <ProfileDataComponent user={user} />
      <UsersImportantStatsComponent mockTasks={mockTasks} mockMessages={mockMessages} />
    </Box>
  );
}