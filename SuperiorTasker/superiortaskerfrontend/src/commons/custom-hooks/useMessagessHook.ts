/* eslint-disable @typescript-eslint/no-unused-vars */
import { Message, State, User } from "@/app/interfaces/types";
import { useEffect, useState } from "react";

// Need to create backend route first...
export function useMessagess(activeUser: User, state: State) {
    const [messagess, setMessagess] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      const fetchMessagess = async () => {
        if (!activeUser?.id || !activeUser?.accessToken) {
          setError(new Error("No active user or token"));
          return;
        }
        
        setLoading(true);
        setError(null);
        
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
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
  
          const data: Message[] = await response.json();
          
          // Validate that each group has required fields
          const validatedMessagess = data.map(message => {
            //if (!message.id || !message.name) {
            //  console.warn('Message missing required fields:', message);
            //}
            return message;
          });
          
          console.log("Messagess: ", validatedMessagess);
          setMessagess(validatedMessagess);
        } catch (err) {
          console.error("Error fetching messagess:", err);
          setError(err instanceof Error ? err : new Error("An unknown error occurred"));
          setMessagess([]); // Reset groups on error
        } finally {
          setLoading(false);
        }
      };
  
      fetchMessagess();
    }, [activeUser?.id, activeUser?.accessToken, state]);
  
    return { messagess, loading, error };
}