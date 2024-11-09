
import { Box, Button, Divider, Heading, Image, Link, Text } from "@chakra-ui/react"
import React from "react"
import NextLink from "next/link";
import LoginForm from "@/app/components/login-components/LoginForm";
import { redirect } from "next/navigation";
import { auth } from "@/commons/auth";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const t = await getTranslations('loginpage');
  const session = await auth();

  if(!!session?.user) {
    redirect("/profile");
  }
 
  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        p={8}
        rounded="lg"
        boxShadow="lg"
        maxW="md"
        w="full"
        textAlign="center"
      >
        <Image
          src='/SuperiorTasker.png'
          alt="Superior Tasker"
          boxSize="80px"
          mb={6}
          mx="auto"
        />
        <Heading fontSize="2xl" color="xblue.300" mb={6}>
          {t('appname')} 
        </Heading>

        <LoginForm />

        <Divider mt={4} />
        <Text mt={4} color="xorange.600">
          {t('dont-have-acc-message')}
        </Text>
        <Link href="/register" as={NextLink}>
          <Button
            mt={4}
            w="full"
            bg="xorange.400"
            color="white"
            _hover={{ bg: "xorange.500" }}
          >
            {t('create-account')}
          </Button>
        </Link>
      </Box>
    </Box>
  )
}