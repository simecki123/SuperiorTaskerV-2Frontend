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