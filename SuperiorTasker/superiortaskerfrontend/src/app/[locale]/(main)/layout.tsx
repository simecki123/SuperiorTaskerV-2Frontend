/* eslint-disable @typescript-eslint/no-explicit-any */
import "@/app/global.css";
import SideBarGroups from "@/app/components/sidebar-components/SideBarGroups";
//import { fetchImproved } from "@/app/server-actions/fetchImproved";
import { Box } from "@chakra-ui/react";
import SignOutButton from "@/app/components/fotter-components/SignOutButton";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const session = await auth();
  //const activeUser: any = session?.user;
  //console.log(activeUser, "<== successfully logged in");
  /**if (!activeUser) {
    redirect("/login");
  }
  */

  const activeUser = {
    "userProfileId": "1",
    "accessToken": "accessToken1"
  }

  
  //const user: any = await fetchImproved(`/api/profiles/${activeUser?.userProfileId}`);
  //const imageUrl = user.photoUrl ?? '';

    //console.log("active user look for image ", user );

  return (
    <>
      <Box className="flex h-screen items-stretch">
        <Box>
          <SideBarGroups accessToken={activeUser.accessToken} />
        </Box>
        <Box className="grow">{children}</Box>
      </Box>
      <Box className="fixed top-4 right-4 flex items-center space-x-6">
        <SignOutButton />
      </Box>
    </>
  );
}