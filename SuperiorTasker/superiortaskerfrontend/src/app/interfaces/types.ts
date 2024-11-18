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
    groupMembershipData: [];
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
    id: number;
    sender: string;
    content: string;
    timestamp: string;
    read: boolean;
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
