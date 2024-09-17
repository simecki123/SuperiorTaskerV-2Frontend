import { Box } from "@chakra-ui/react";
import React from "react";
import ProfileDataComponent from "@/app/components/profile-page-components/ProfileDataComponent";
import UsersImportantStatsComponent from "@/app/components/profile-page-components/UsersImportantStatsComponent";

const user = {
  id: "123",
  firstName: "John",
  lastName: "Doe",
  profileImage: "https://geo-media.beatport.com/image_size/1400x1400/a62f2539-e1f7-4d38-b6f8-ca5ea6a20371.jpg",
};

export default function ProfilePage() {
  return (
    <Box maxW="container.xl" mx="auto" px={4} py={8}>
      <ProfileDataComponent user={user} />
      <UsersImportantStatsComponent />
    </Box>
  );
}