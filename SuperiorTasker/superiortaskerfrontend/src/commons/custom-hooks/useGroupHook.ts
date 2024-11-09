

import { useState, useEffect } from "react";
import { Group, User, State } from "../../app/interfaces/types";

export function useGroups(activeUser: User, state: State) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      if (!activeUser?.id || !activeUser?.accessToken) {
        setError(new Error("No active user or token"));
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/get-all-user-groups?userId=${activeUser.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${activeUser.accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Group[] = await response.json();
        
        // Validate that each group has required fields
        const validatedGroups = data.map(group => {
          if (!group.id || !group.name || !group.photoUri) {
            console.warn('Group missing required fields:', group);
          }
          return group;
        });

        setGroups(validatedGroups);
      } catch (err) {
        console.error("Error fetching groups:", err);
        setError(err instanceof Error ? err : new Error("An unknown error occurred"));
        setGroups([]); // Reset groups on error
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [activeUser?.id, activeUser?.accessToken, state]);

  return { groups, loading, error };
}