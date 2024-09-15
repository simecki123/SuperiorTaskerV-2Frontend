// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { auth } from "@/commons/auth";
import { Box } from "@chakra-ui/react"
import React from "react"
import ExpandableFooter from "./ExpendableFooter";



export default async function Footer() {

    let isSignOutButtonVisible = false;
    // Create backend to authorize user
    //const session = await auth();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //const activeUser: any = session?.user;
    const activeUser = null;
    if (activeUser) {
        isSignOutButtonVisible = true;
    }
  return (
    <Box>
        <ExpandableFooter isSignOutButtonVisible={isSignOutButtonVisible} ></ExpandableFooter>
    </Box>
  )
};

