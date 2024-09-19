import ProjectTaskData from "@/app/components/project-task-components/ProjectTaskData";
import React from "react"

const mockTasks = [
    { id: 1, title: "Implement login feature", description: "Create a secure login system", projectName: "Auth Service", status: "in_progress", ownerId: 1 },
    { id: 2, title: "Design landing page", description: "Create an attractive landing page", projectName: "Marketing Site", status: "done", ownerId: 2 },
    { id: 3, title: "Optimize database queries", description: "Improve performance of key DB queries", projectName: "Backend Optimization", status: "in_progress", ownerId: 1 },
    { id: 4, title: "Write unit tests", description: "Increase test coverage for core modules", projectName: "Quality Assurance", status: "done", ownerId: 3 },
    { id: 5, title: "Implement payment gateway", description: "Integrate Stripe for payments", projectName: "E-commerce Platform", status: "in_progress", ownerId: 3 },
    { id: 6, title: "Create user dashboard", description: "Design and implement user dashboard", projectName: "User Portal", status: "done", ownerId: 1 },
    { id: 7, title: "Refactor legacy code", description: "Modernize old codebase", projectName: "Tech Debt", status: "in_progress", ownerId: 1 },
  ];

export default function ProjectTasks() {

    return(
        <ProjectTaskData tasks={mockTasks} />
    );
  
};

