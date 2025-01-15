import { Interface } from "readline";

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

  export interface Group {
    id: string;  
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
    id: string,
    userId: string,
    groupId: string,
    role: string,
    createdAt: string,
    updatedAt: string
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
    id: string;
    userId: string;
    groupId: string;
    name: string;
    description: string;
    taskStatus: string;
    startDate: string;
    endDate: string;
  }

  export interface Project {
    id: string;
    name: string;
    description: string
    groupId: string;
    userId: string;
    startDate: string;
    endDate: string;
    completion: number;
  }

  export interface ProjectRequest {
    userId: string,
    groupId: string,
    name: string,
    description: string,
    startDate: string,
    endDate: string
  }

  export interface ProjectData {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  }

  export interface ProjectBodySearch {
    userId: string;
    groupId: string;
    startCompletion: string;
    endCompletion: string;
    includeComplete: boolean;
    includeNotStarted: boolean;
    search: string;
  }

  export interface GrouProjectsTableParams {
    projects: Project[];
    hasNextPage: boolean;
    currentPage: number;
    setCurrentPage: () => void;
  }

  export interface GroupProjectsAndTasksDataProps {
    user: User,
    accessToken: string,
  }

  export interface TaskBodySearch {
    userId: string;
    groupId: string;
    projectId: string;
    status: string;
    search: string;
  }

  export interface ProjectTaskDataProps {
    tasks: Task[],
    onTaskUpdate: (updatedTask: Task) => void,
    accessToken: string
  }

  export interface GroupMember {
    userId: string,
    firstName: string,
    lastName: string,
    description: string,
    role: string,
    photoUri: string
  }

  export interface NotYetGroupMember {
    userId: string,
    firstName: string,
    lastName: string,
    description: string,
    photoUri: string
  }

  export interface AllGroupMembersProps {
    user: User,
    accessToken: string
  }

  export interface GroupCardAndTableProps {
    projects: Project[],
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    accessToken: string,
    isUserAdmin?: boolean,
    userProjectRelations?: UserProjectRelation[];
  }

  export interface UserProjectRelation {
    projectId: string,
    userId: string,
    groupId: string
  }

  export interface RemoveUserAndProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    userName: string;
  }

