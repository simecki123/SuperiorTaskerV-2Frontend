import GroupDataComponent from "@/app/components/group-info-components/GroupDataComponent"
import GroupImportantStatsComponent from "@/app/components/group-info-components/GroupImportantStatsComponent"
import { Box } from "@chakra-ui/react"
import React from "react"

const group = {
  id: 1,
  groupImage: "https://i.redd.it/vk2vuihmf6s61.jpg",
  name: "Frontend Development",
  description: "Group focused on frontend tech like React, CSS, and more.",
  projectsCount: 12,
  usersCount: 8,
}

const mockTasks = [
  { id: 1, title: "Implement login feature", description: "Create a secure login system", projectName: "Auth Service", status: "in_progress" },
  { id: 2, title: "Design landing page", description: "Create an attractive landing page", projectName: "Marketing Site", status: "done" },
  { id: 3, title: "Optimize database queries", description: "Improve performance of key DB queries", projectName: "Backend Optimization", status: "in_progress" },
  { id: 4, title: "Write unit tests", description: "Increase test coverage for core modules", projectName: "Quality Assurance", status: "done" },
  { id: 5, title: "Implement payment gateway", description: "Integrate Stripe for payments", projectName: "E-commerce Platform", status: "in_progress" },
  { id: 6, title: "Create user dashboard", description: "Design and implement user dashboard", projectName: "User Portal", status: "done" },
  { id: 7, title: "Refactor legacy code", description: "Modernize old codebase", projectName: "Tech Debt", status: "in_progress" },
];

const mockProjects = [ 
  { id: 1, title: "Website Redesign", description: "Overhaul company website", startDate: "2024-10-01", endDate: "2024-12-31", completion: "25%" },
  { id: 2, title: "Mobile App Development", description: "Create a new mobile app", startDate: "2024-09-15", endDate: "2025-03-31", completion: "10%" },
  { id: 3, title: "Data Migration", description: "Migrate data to new system", startDate: "2024-11-01", endDate: "2025-01-31", completion: "0%" },
  { id: 4, title: "AI Integration", description: "Implement AI features", startDate: "2025-01-01", endDate: "2025-06-30", completion: "5%" },
  { id: 5, title: "Security Audit", description: "Conduct annual security audit", startDate: "2024-12-01", endDate: "2024-12-31", completion: "50%" },
  // Add more mock projects here to test pagination
];

const mockMembers = [
  { id: 1, profilePicture: "", firstName: "John", lastName: "Doe" },
  { id: 2, profilePicture: "", firstName: "Jane", lastName: "Smith" },
  { id: 3, profilePicture: "", firstName: "Michael", lastName: "Johnson" },
  { id: 4, profilePicture: "", firstName: "Emily", lastName: "Davis" },
  { id: 5, profilePicture: "", firstName: "Chris", lastName: "Brown" },
  { id: 6, profilePicture: "", firstName: "Sarah", lastName: "Wilson" },
  { id: 7, profilePicture: "", firstName: "David", lastName: "Martinez" }
];


export default function GroupInfoPage() {
  return (
    <Box maxW="container.xl" mx="auto" px={4} py={8}>
      <GroupDataComponent group={group} />
      <GroupImportantStatsComponent members={mockMembers} group={group} projects={mockProjects} tasks={mockTasks} />
    </Box>
  )
};

