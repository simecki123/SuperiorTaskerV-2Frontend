/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@chakra-ui/react";
import SideBarGroups from "@/app/components/sidebar-components/SideBarGroups";
import SignOutButton from "@/app/components/fotter-components/SignOutButton";
import { auth } from "@/commons/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {

  //old mock user
  const session = await auth();
  const activeUser: any = session?.user;
  console.log("Aktivni usercic: ", activeUser);
  if (!activeUser) {
    redirect("/login");
  }

  return (
    <Box className="flex h-screen items-stretch">
      <Box>
        <SideBarGroups activeUser={activeUser}/>
      </Box>
      <Box className="grow">{children}</Box>
      <Box className="fixed top-4 right-4 flex items-center space-x-6">
        <SignOutButton />
      </Box>
    </Box>
  );
}