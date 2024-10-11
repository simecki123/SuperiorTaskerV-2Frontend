"use client";

import { Button, Image } from "@chakra-ui/react";
import React from "react";
import logoutIcon from "@/../public/logout.png"; // Import the image

export default function SignOutButton() {
  

  return (
    <Button
      colorScheme="xblue"
      
      leftIcon={<Image src={logoutIcon.src} alt="Logout" boxSize={6} />} // Add the image here
    />
  );
}
