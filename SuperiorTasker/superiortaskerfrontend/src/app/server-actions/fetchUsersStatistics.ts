"use server"
import { User, UserStatistics } from "@/app/interfaces/types";

export async function fetchUserStatistics(user: User, accessToken: string): Promise<UserStatistics> {
  if (!user?.id || !accessToken) {
    throw new Error("No active user or token");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stats/get-user-stats?userId=${user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store', 
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User statistics not found");
      }
      throw new Error(`Failed to fetch statistics: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
}