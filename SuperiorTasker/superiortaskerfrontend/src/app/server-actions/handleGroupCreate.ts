/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { auth } from "@/commons/auth";
import { User } from "@/app/interfaces/types";
import { revalidatePath } from "next/cache";
import { fetchMe } from "@/app/server-actions/fetchMe";

export async function handleGroupCreate(prevState: any, formData: FormData) {
  try {
    const session = await auth();
    const activeUser = session?.user as User;

    if (!activeUser?.accessToken) {
      return {
        errors: { auth: ["Not authenticated"] },
        message: "Authentication required",
      };
    }

    const newFormData = new FormData();
    newFormData.append("name", formData.get("name") as string);
    newFormData.append("description", formData.get("description") as string);
    newFormData.append("photoUri", formData.get("file") as File);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/createGroup`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${activeUser.accessToken}`
      },
      body: newFormData
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    // Fetch updated user data after group creation
    const updatedUser = await fetchMe(activeUser.accessToken);

    revalidatePath("/groups");

    return {
      message: "Group created successfully",
      data: updatedUser,  // Return the updated user data
      errors: null,
    };

  } catch (error: any) {
    console.error("Error in handleGroupCreate:", error);
    return {
      errors: { server: [error.message || "Failed to create group"] },
      message: "Failed to create group"
    };
  }
}