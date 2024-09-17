/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { auth } from "@/commons/auth";
import z from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handleGroupCreate(prevState: any, formData: FormData) {
  const session = await auth();
  const activeUser: any = session?.user;

  const schema = z.object({
    groupImage: z.string(),
    name: z.string().min(3),
    description: z.string()
    
  });
  const validatedFields = schema.safeParse({
    groupImage: z.string(),
    name: formData.get("name"),
    description: formData.get("description")
    
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid group data",
    };
  }

  try {
    console.log("GroupSaved...")

  }catch(error: any) {
    console.log("Some error")
  }
}