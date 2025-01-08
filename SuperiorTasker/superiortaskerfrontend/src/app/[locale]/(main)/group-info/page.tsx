"use server"
import GroupDataComponent from "@/app/components/group-info-components/GroupDataComponent"
import GroupImportantStatsComponent from "@/app/components/group-info-components/GroupImportantStatsComponent"
import { User } from "@/app/interfaces/types"
import { fetchMe } from "@/app/server-actions/fetchMe"
import { auth } from "@/commons/auth"
import { Box } from "@chakra-ui/react"
import React from "react"



export default async function GroupInfoPage() {

  const session: any = await auth();
  const user: User = session?.user;
  const fetchedUser = await fetchMe(session.user.accessToken);

  
  return (
    <Box maxW="container.xl" mx="auto" px={4} py={8}>
      <GroupDataComponent 
        user={fetchedUser} 
        accessToken={session.user.accessToken} 
      />
      <GroupImportantStatsComponent user={user}
      accessToken={session.user.accessToken}/>
    </Box>
  )
};

