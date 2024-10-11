/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { signIn } from "@/commons/auth";
import { redirect } from "next/navigation";
import z from "zod";


export async function handleLogin(prevState: any, formData: FormData) {
  try {
    const validatedFields = validateUserInput(formData);
    
    await signInUser(validatedFields);
  } catch (e: any) {
    console.log("error: ", e);
    const message: string = e.message;
    const messageList = message.split(":");
    if (messageList[0] === "Next redirect handle") {
      redirect(`/profile`);
    }
    console.log("error:", e.message)
    if (e.message === "Wrong credentials") {
      return { message: "Wrong credentials", errors: { login: "Invalid email or password" } };
    }
    return { message: e.message, errors: { login: "An error occurred during login" } };
  }
  redirect("/profile");
}

function validateUserInput(formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
  });

  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    throw new Error("Email or Pass bad input");
  }
  return validatedFields;
}



async function signInUser(validatedFields: any) {
  try {
    await signIn("credentials", {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirect: false,
    });
  } catch (e) {
    throw new Error("Wrong credentials");
  }
}