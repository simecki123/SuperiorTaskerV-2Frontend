"use client";
import { Button, Image } from "@chakra-ui/react";
import logoutIcon from "@/../public/logout.png"; // Import the image
import { signOut } from "next-auth/react";

export default function SignOutButton() {

  return (
    <Button
      colorScheme="xblue"
      onClick={() => {
        signOut({
          redirect: true,
          callbackUrl: "/login",
        }) 
      }} 
      leftIcon={<Image src={logoutIcon.src} alt="Logout" boxSize={6} />} 
    />
  );
}
