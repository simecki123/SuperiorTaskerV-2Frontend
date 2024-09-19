import { Box } from "@chakra-ui/react";
import SideBarGroups from "@/app/components/sidebar-components/SideBarGroups";
import SignOutButton from "@/app/components/fotter-components/SignOutButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  const activeUser = {
    "userProfileId": "1",
    "accessToken": "accessToken1"
  };

  return (
    <Box className="flex h-screen items-stretch">
      <Box>
        <SideBarGroups accessToken={activeUser.accessToken} />
      </Box>
      <Box className="grow">{children}</Box>
      <Box className="fixed top-4 right-4 flex items-center space-x-6">
        <SignOutButton />
      </Box>
    </Box>
  );
}