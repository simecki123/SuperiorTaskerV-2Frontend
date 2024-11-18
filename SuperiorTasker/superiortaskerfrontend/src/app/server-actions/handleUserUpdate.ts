/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
  
import { UserProfileEditResponse } from '../interfaces/types';
  
export async function handleUserUpdate(
    prevState: any,
    formData: FormData
  ) {
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/update-user`;
      
      const response = await fetch(url, {
        method: 'PATCH',
        body: formData,
        headers: {
          'Authorization': `Bearer ${formData.get('accessToken')}`,
        },
      });
  
      if (!response.ok) {
        return { 
          message: 'Failed to update profile',
          errors: { submit: 'Update failed' }
        };
      }
  
      const updatedUser: UserProfileEditResponse = await response.json();
      
      
      return { 
        message: 'Profile updated successfully',
        data: updatedUser,
        errors: null
      };

      

    } catch (error) {
      return { 
        message: 'Error updating profile',
        errors: { submit: error instanceof Error ? error.message : 'Unknown error occurred' }
      };
    }
  }