/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useGroups.ts
import { useState, useEffect } from "react";

interface Group {
  id: string;
  name: string;
  photoUrl: string;
}

// mockGroups.ts
export const mockGroups: Group[] = [
  {
    id: "1",
    name: "Work Group",
    photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Q-Zofu33UtzjLHAd4mS6NTdDH5kMSP-BBw&s", // Replace with actual image URLs
  },
  {
    id: "2",
    name: "Friends Group",
    photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Q-Zofu33UtzjLHAd4mS6NTdDH5kMSP-BBw&s",
  },
  {
    id: "3",
    name: "Gaming Squad",
    photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Q-Zofu33UtzjLHAd4mS6NTdDH5kMSP-BBw&s",
  },
  {
    id: "4",
    name: "Family Group",
    photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Q-Zofu33UtzjLHAd4mS6NTdDH5kMSP-BBw&s",
  },
  {
    id: "5",
    name: "Study Buddies",
    photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Q-Zofu33UtzjLHAd4mS6NTdDH5kMSP-BBw&s",
  },
];

export function useGroups(accessToken: string, state: any) {
  const [groups, setGroups] = useState<Group[]>([]); // Define groups as Group[] type
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Simulate fetching from backend with mock data
        setGroups(mockGroups); // This now works because types match
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      }
    };

    fetchGroups();
  }, [accessToken, state]);

  return { groups, error };
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
/** export function useGroups(accessToken: string, state: any) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }
        const data = await response.json();
        setGroups(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      }
    };

    fetchGroups();
  }, [accessToken, state]);

  return { groups, error };
}
**/