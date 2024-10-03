"use client";
import { handleLogin } from "@/app/server-actions/login-action";
import { Button, Input, Text, FormControl, FormErrorMessage, useToast, VStack } from "@chakra-ui/react"
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react"
import { useFormState } from "react-dom";
import { useRouter } from 'next/navigation';

const initialState = {
  message: null,
  errors: null,
};

export default function LoginForm() {
  const t = useTranslations('loginpage');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, formAction] = useFormState(handleLogin, initialState);
  const toast = useToast();
  const router = useRouter();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const isFormValid = () => {
    return email && password && !emailError && !passwordError;
  };

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        // Error scenarios
        if (state.errors.email) {
          toast({
            title: "Login Failed",
            description: "Invalid email or password.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else if (state.errors.unverified) {
          toast({
            title: "Login Failed",
            description: "Your account is not verified. Please check your email for verification instructions.",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Login Failed",
            description: state.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        // Success scenario
        toast({
          title: "Login Successful",
          description: "You have successfully logged in.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Redirect to dashboard or home page after a short delay
        setTimeout(() => {
          router.push('/profile'); // Replace with your desired route
        }, 3000);
      }
    }
  }, [state, toast, router]);

  return (
    <form action={formAction}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!emailError}>
          <Text mb={2} color="xblue.500" textAlign="left">
            {t('email')}
          </Text>
          <Input
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            placeholder={t('enter-your-email')}
            focusBorderColor="xblue.400"
            _placeholder={{ color: "xblue.300" }}
          />
          <FormErrorMessage>{emailError}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!passwordError}>
          <Text mb={2} color="xblue.500" textAlign="left">
            {t('password')}
          </Text>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            placeholder={t('enter-your-password')}
            focusBorderColor="xblue.400"
            _placeholder={{ color: "xblue.300" }}
          />
          <FormErrorMessage>{passwordError}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          w="full"
          bg="xblue.500"
          color="white"
          _hover={{ bg: "xblue.600" }}
          isDisabled={!isFormValid()}
        >
          {t('login')}
        </Button>
      </VStack>
    </form>
  );
}