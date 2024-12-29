/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RegisterUserRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }

  export interface LoginRequest {
    email: string;
    password: string;
  }

  //grouptypes
  export interface Group {
    id: string;  // Now this is required, not optional
    name: string;
    description: string;
    photoUri: string;
  }
  
  export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileUri: string;
    description: string;
    accessToken: string;
    groupMembershipData: GroupMembershipData[];
  }

  export interface GroupMembershipData {
    "id": string,
    "userId": string,
    "groupId": string,
    "role": string,
    "createdAt": string,
    "updatedAt": string
  }

  export interface UserProfileEditResponse {
    id: string;
    firstName: string;
    lastName: string;
    description: string;
    profileUri: string;
  }
  
  export interface State {
    message: string | null;
    errors: any | null;
  }

  export interface Message {
    id: string;
    groupId: string;
    message: string;
    messageStatus: 'READ' | 'UNREAD';
    userProfileId: string;
    firstName: string;
    lastName: string;
    photoUri: string;
    createdAt: string;
    sender?: string;
    content?: string;
    read?: boolean;
  }

  export interface Task {
    "id": string;
    "userId": string;
    "groupId": string;
    "name": string;
    "description": string;
    "taskStatus": string;
    "startDate": string;
    "endDate": string;
  }

  export interface Project {
    "id": string;
    "name": string;
    "description": string
    "groupId": string;
    "userId": string;
    "startDate": string;
    "endDate": string;
    "completion": number;
  }

  export interface ProjectBodySearch {
    "userId": string;
    "groupId": string;
    "startCompletion": string;
    "endCompletion": string;
    "includeComplete": boolean;
    "includeNotStarted": boolean;
    "search": string;
  }

  export interface GrouProjectsTableParams {
    "projects": Project[];
    "hasNextPage": boolean;
    "currentPage": number;
    "setCurrentPage": () => void;
  }

  export interface GroupProjectsAndTasksDataProps {
    user: User,
    accessToken: string,
  }

  export interface TaskBodySearch {
    "userId": string;
    "groupId": string;
    "projectId": string;
    "status": string;
    "search": string;
  }

  export interface ProjectTaskDataProps {
    tasks: Task[],
    onTaskUpdate: (updatedTask: Task) => void,
    accessToken: string
  }
