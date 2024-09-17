"use client";
import { signOut } from "@/commons/auth";
import { Button, Image } from "@chakra-ui/react";
import React from "react";
import logoutIcon from "@/../public/logout.png"; // Import the image

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };

  return (
    <Button
      colorScheme="xblue"
      onClick={handleSignOut}
      leftIcon={<Image src={logoutIcon.src} alt="Logout" boxSize={6} />} // Add the image here
    />
  );
}
