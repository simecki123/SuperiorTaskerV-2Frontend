
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";
import React from "react"

export default function SwitchColorThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Switch theme"
      colorScheme="blue"
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      _hover={{
        transform: "scale(1.2)",
        bg: colorMode === "light" ? "yellow.400" : "gray.600",
      }}
      transition="all 0.3s ease"
    />
  );
}

