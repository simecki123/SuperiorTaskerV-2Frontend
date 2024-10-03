"use client";
import { handleRegister } from "@/app/server-actions/register-action";
import { Text, Input, Button, FormControl, FormErrorMessage, useToast, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl"
import React, { useEffect, useState } from "react"
import { useFormState } from "react-dom";
import { useRouter } from 'next/navigation';

const initialState = {
  message: null,
  errors: null,
};

export default function RegisterForm() {
  const t = useTranslations("registerpage");
  const [state, formAction] = useFormState(handleRegister, initialState);
  const toast = useToast();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setEmailError("Email is required");
    } else if (!re.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 3) {
      setPasswordError("Password must be at least 3 characters long");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const validateName = (name: string, setError: React.Dispatch<React.SetStateAction<string>>, fieldName: string) => {
    if (!name) {
      setError(`${fieldName} is required`);
    } else {
      setError("");
    }
  };

  const isFormValid = () => {
    return (
      email && password && confirmPassword && firstName && lastName &&
      !emailError && !passwordError && !confirmPasswordError && !firstNameError && !lastNameError
    );
  };

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        // Error scenarios
        if (state.errors.email) {
          toast({
            title: "Registration Failed",
            description: "Email is already taken or not in the correct format.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else if (state.errors.password) {
          toast({
            title: "Registration Failed",
            description: "Password does not meet the required criteria.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Registration Failed",
            description: state.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        // Success scenario
        toast({
          title: "Registration Successful",
          description: "Your account has been created successfully. Redirecting to login...",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    }
  }, [state, toast, router]);

  return (
    <form action={formAction}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!emailError}>
          <Text mb={2} color="xblue.500" textAlign="left">
            {t("email")}:
          </Text>
          <Input
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            placeholder={t("enter-your-email")}
            focusBorderColor="xblue.400"
            _placeholder={{ color: "xblue.300" }}
          />
          <FormErrorMessage>{emailError}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!passwordError}>
          <Text mb={2} color="xblue.500" textAlign="left">
            {t("password")}:
          </Text>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            placeholder={t("enter-your-password")}
            focusBorderColor="xblue.400"
            _placeholder={{ color: "xblue.300" }}
          />
          <FormErrorMessage>{passwordError}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!confirmPasswordError}>
          <Text mb={2} color="xblue.500" textAlign="left">
            {t("confirm-password")}:
          </Text>
          <Input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateConfirmPassword(e.target.value);
            }}
            placeholder={t("enter-your-password")}
            focusBorderColor="xblue.400"
            _placeholder={{ color: "xblue.300" }}
          />
          <FormErrorMessage>{confirmPasswordError}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!firstNameError}>
          <Text mb={2} color="xblue.500" textAlign="left">
            {t("enter-your-first-name")}:
          </Text>
          <Input
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              validateName(e.target.value, setFirstNameError, "First name");
            }}
            placeholder={t("your-first-name")}
            focusBorderColor="xblue.400"
            _placeholder={{ color: "xblue.300" }}
          />
          <FormErrorMessage>{firstNameError}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!lastNameError}>
          <Text mb={2} color="xblue.500" textAlign="left">
            {t("enter-your-last-name")}:
          </Text>
          <Input
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              validateName(e.target.value, setLastNameError, "Last name");
            }}
            placeholder={t("your-last-name")}
            focusBorderColor="xblue.400"
            _placeholder={{ color: "xblue.300" }}
          />
          <FormErrorMessage>{lastNameError}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          w="full"
          bg="xblue.500"
          color="white"
          _hover={{ bg: "xblue.600" }}
          isDisabled={!isFormValid()}
        >
          {t("register")}
        </Button>
      </VStack>
    </form>
  );
}