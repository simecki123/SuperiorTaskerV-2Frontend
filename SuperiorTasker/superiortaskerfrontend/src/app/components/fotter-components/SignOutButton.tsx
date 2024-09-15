import { signOut } from "@/commons/auth";
import { Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React from "react"

export default function SignOutButton() {
    const t = useTranslations("Footer");

    const handleSignOut = async () => {
      console.log("signing out");
      await signOut({
        redirect: true,
        callbackUrl: "/login",
      });
    };
  
    return (
      <Button
        colorScheme="blue"
        variant="solid"
        _hover={{ bg: "red.500" }}
        onClick={handleSignOut}
      >
        {t("sign-out-btn")}
      </Button>
    );
};

