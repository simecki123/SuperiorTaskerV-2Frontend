/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@chakra-ui/react";
import React from "react";
import ProfileDataComponent from "@/app/components/profile-page-components/ProfileDataComponent";
import UsersImportantStatsComponent from "@/app/components/profile-page-components/user-data-options/UsersImportantStatsComponent";
import { auth } from "@/commons/auth";
import { User } from "@/app/interfaces/types";



export default async function ProfilePage() {

  const session: any = await auth();
  const user: User = session?.user;
  

  return (
    <Box maxW="container.xl" mx="auto" px={4} py={8}>
      <ProfileDataComponent user={user} />
      <UsersImportantStatsComponent user={user}/>
    </Box>
  );
}