"use client";
import { handleRegister } from "@/app/server-actions/register-action";
import { Text, Input, Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl"
import React, { useState } from "react"
import { useFormState } from "react-dom";

const initialState: unknown = {
  message: null,
  errors: null,
};

export default function RegisterForm() {

  const t = useTranslations("registerpage");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction] = useFormState(handleRegister, initialState);


  return (
    <form>
      <Text mb={2} color="xblue.500" textAlign="left">
        {t("email")}:
      </Text>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("enter-your-email")}
        focusBorderColor="xblue.400"
        mb={3} // Reduced margin-bottom to save space
        _placeholder={{ color: "xblue.300" }}
      />

      <Text mb={2} color="xblue.500" textAlign="left">
        {t("password")}:
      </Text>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t("enter-your-password")}
        focusBorderColor="xblue.400"
        mb={3}
        _placeholder={{ color: "xblue.300" }}
      />

      <Text mb={2} color="xblue.500" textAlign="left">
        {t("confirm-password")}:
      </Text>
      <Input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder={t("enter-your-password")}
        focusBorderColor="xblue.400"
        mb={3}
        _placeholder={{ color: "xblue.300" }}
      />

      <Text mb={2} color="xblue.500" textAlign="left">
        {t("enter-your-first-name")}:
      </Text>
      <Input
        type="text"
        value={firstname}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder={t("your-first-name")}
        focusBorderColor="xblue.400"
        mb={3}
        _placeholder={{ color: "xblue.300" }}
      />

      <Text mb={2} color="xblue.500" textAlign="left">
        {t("enter-your-last-name")}:
      </Text>
      <Input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder={t("your-last-name")}
        focusBorderColor="xblue.400"
        mb={4} // Slightly increased bottom margin for breathing room before the button
        _placeholder={{ color: "xblue.300" }}
      />

      <Button
        type="submit"
        w="full"
        bg="xblue.500"
        color="white"
        _hover={{ bg: "xblue.600" }}
      >
        {t("register")}
      </Button>
    </form>
  )
};

