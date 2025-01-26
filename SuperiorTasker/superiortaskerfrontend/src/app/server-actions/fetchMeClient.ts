/* eslint-disable @typescript-eslint/no-explicit-any */

export const fetchMeClient = async (accessToken: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/fetchMe`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.statusText}`);
      }
  
      const user = await response.json();
      return user;
    } catch (error: any) {
      console.error("Error fetching user:", error.message);
      throw new Error("Unable to fetch user data.");
    }
  };
  