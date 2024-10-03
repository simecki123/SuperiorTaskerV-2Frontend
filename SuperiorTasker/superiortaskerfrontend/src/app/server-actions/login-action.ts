"use server";

import { LoginRequest } from "../interfaces/types";

export async function handleLogin(prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const loginData: LoginRequest = {
    email,
    password
  };

  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const data = await response.json();
      // Handle the JWT token here (e.g., store it in localStorage or a secure cookie)
      // For example: localStorage.setItem('token', data.accessToken);
      return { message: 'Login successful', data };
    } else {
      if (response.status === 401) {
        return { message: 'Invalid email or password', errors: { email: 'Invalid credentials' } };
      } else if (response.status === 403) {
        return { message: 'Account not verified', errors: { unverified: true } };
      } else {
        const errorData = await response.json();
        return { message: 'Login failed', errors: errorData };
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    return { message: 'An error occurred during login', errors: { general: 'Network error' } };
  }
}