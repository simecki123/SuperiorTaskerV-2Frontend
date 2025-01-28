/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { Box } from "@chakra-ui/react";
import React from "react";
import ProfileDataComponent from "@/app/components/profile-page-components/ProfileDataComponent";
import UsersImportantStatsComponent from "@/app/components/profile-page-components/user-data-options/UsersImportantStatsComponent";
import { auth } from "@/commons/auth";
import { User } from "@/app/interfaces/types";
import { fetchMe } from "@/app/server-actions/fetchMe";

export default async function ProfilePage() {

  const session: any = await auth();
  const user: User = session?.user;
  const fetchedUser = await fetchMe(session.user.accessToken);
  

  return (
    <Box maxW="container.xl" mx="auto" px={4} py={8}>
      <ProfileDataComponent 
        user={fetchedUser} 
        accessToken={session.user.accessToken} 
      />
      <UsersImportantStatsComponent user={user}/>
    </Box>
  );
}