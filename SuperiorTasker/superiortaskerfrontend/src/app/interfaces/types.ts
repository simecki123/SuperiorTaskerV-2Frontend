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
    accessToken: string;
  }
  
  export interface State {
    message: string | null;
    errors: any | null;
  }