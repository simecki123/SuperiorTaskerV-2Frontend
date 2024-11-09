/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { handleLogin } from "@/app/server-actions/login";
import { Button, Input, Text, FormControl, FormErrorMessage, useToast, VStack } from "@chakra-ui/react"
import { useTranslations } from "next-intl";
import React, { useEffect } from "react"
import { useFormState } from "react-dom";

const initialState: any = {
  message: null,
  errors: null,
};

export default function LoginForm() {
  const t = useTranslations('loginpage');
  const [state, formAction] = useFormState(handleLogin, initialState);
  const toast = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.message,
        status: state.errors ? "error" : "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!state.errors?.email}>
          <Text mb={2} color="xblue.500" textAlign="left">
            {t('email')}
          </Text>
          <Input
            name="email"
            type="email"
            placeholder={t('enter-your-email')}
            focusBorderColor="xblue.400"
            _placeholder={{ color: "xblue.300" }}
          />
          <FormErrorMessage>{state.errors?.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!state.errors?.password}>
          <Text mb={2} color="xblue.500" textAlign="left">
            {t('password')}
          </Text>
          <Input
            name="password"
            type="password"
            placeholder={t('enter-your-password')}
            focusBorderColor="xblue.400"
            _placeholder={{ color: "xblue.300" }}
          />
          <FormErrorMessage>{state.errors?.password}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          w="full"
          bg="xblue.500"
          color="white"
          _hover={{ bg: "xblue.600" }}
        >
          {t('login')}
        </Button>
      </VStack>
    </form>
  );
}