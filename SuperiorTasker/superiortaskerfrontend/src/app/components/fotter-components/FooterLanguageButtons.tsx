import { Button, HStack } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react"

export default function FooterLanguageButtons() {
    const router = useRouter();
    const pathname = usePathname();
    let appendUrl: boolean = false;
  
    if (pathname.slice(0, 3) !== "/hr" && pathname.slice(0, 3) !== "/en") {
      appendUrl = true;
    }
  
    return (
      <HStack spacing={3}>
        <Button
          colorScheme="blue"
          variant="outline"
          _hover={{ bg: "blue.500", color: "white" }}
          onClick={() => {
            if (appendUrl) {
              router.push(`/hr${pathname}`);
            } else {
              router.push(`/hr${pathname.slice(3)}`);
            }
          }}
        >
          🇭🇷
        </Button>
        <Button
          colorScheme="blue"
          variant="outline"
          _hover={{ bg: "blue.500", color: "white" }}
          onClick={() => {
            if (appendUrl) {
              router.push(`/en${pathname}`);
            } else {
              router.push(`/en${pathname.slice(3)}`);
            }
          }}
        >
          🇬🇧
        </Button>
      </HStack>
    );
  }

