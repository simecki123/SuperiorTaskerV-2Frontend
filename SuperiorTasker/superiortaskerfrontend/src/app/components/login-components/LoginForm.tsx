"use client";
import { handleLogin } from "@/app/server-actions/login-action";
import { Button, Input, Text } from "@chakra-ui/react"
import { useTranslations } from "next-intl";
import React, { useState } from "react"
import { useFormState } from "react-dom";

const initialState: unknown = {
  message: null,
  errors: null,
};

export default function LoginForm() {
  const t = useTranslations('loginpage'); // Same key 'loginpage'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction] = useFormState(handleLogin, initialState);
  

  return (
    <form action={formAction}>
      <Text mb={2} color="xblue.500" textAlign="left">
        {t('email')}
      </Text>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('enter-your-email')}
        focusBorderColor="xblue.400"
        mb={4}
        _placeholder={{ color: "xblue.300" }}
      />

      <Text mb={2} color="xblue.500" textAlign="left">
        {t('password')}
      </Text>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t('enter-your-password')}
        focusBorderColor="xblue.400"
        mb={6}
        _placeholder={{ color: "xblue.300" }}
      />

      <Button
        type="submit"
        w="full"
        bg="xblue.500"
        color="white"
        _hover={{ bg: "xblue.600" }}
      >
        {t('login')}
      </Button>
    </form>
  )
};
