import { RegisterUserRequest } from "../interfaces/types";

export async function handleRegister(prevState: unknown, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
  
    // Basic validation
    if (password !== confirmPassword) {
      return { message: 'Passwords do not match', errors: { password: 'Passwords do not match' } };
    }
  
    const registerData: RegisterUserRequest = {
      email,
      password,
      firstName,
      lastName
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
  
      if (response.ok) {
        const data = await response.json();
        return { message: 'Registration successful', data };
      } else {
        if (response.status === 400) {
          return { message: 'Registration failed', errors: { email: 'Email is already taken or invalid' } };
        } else {
          const errorData = await response.json();
          return { message: 'Registration failed', errors: errorData };
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { message: 'An error occurred during registration', errors: { general: 'Network error' } };
    }
  }