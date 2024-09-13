import { Box, Divider, Heading, Text, Link, Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React from "react";
import NextLink from "next/link";
import RegisterForm from "@/app/components/register-components/RegisterForm";

export default function Register() {
  const t = useTranslations("registerpage");

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={4} // Added padding for better responsiveness
    >
      <Box
        p={6} // Reduced padding to make the form more compact
        rounded="lg"
        boxShadow="lg"
        maxW="sm" // Reduced max width to avoid horizontal stretching
        w="full"
        textAlign="center"
      >
        <Heading fontSize="xl" color="xblue.300" mb={4}>
          {t("registerOnSuperiorTasker")}
        </Heading>

        <RegisterForm />

        <Text mt={3} color="xorange.600">
          {t("already-have-acc-message")}
        </Text>

        <Divider mt={3} />

        <Link href="/login" as={NextLink}>
          <Button
            mt={3}
            w="full"
            bg="xorange.400"
            color="white"
            _hover={{ bg: "xorange.500" }}
          >
            {t("go-to-login-page")}
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
