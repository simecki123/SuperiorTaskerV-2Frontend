"use client";
import { Box, Collapse, Flex, IconButton, ScaleFade, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import SignOutButton from "./SignOutButton";
import FooterLanguageButtons from "./FooterLanguageButtons";
import SwitchColorThemeButton from "./SwitchColorThemeButton";
import { SettingsIcon, CloseIcon } from "@chakra-ui/icons";

interface ExpandableFooterProps {
  isSignOutButtonVisible: boolean;
}

const ExpandableFooter: React.FC<ExpandableFooterProps> = ({ isSignOutButtonVisible }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  // Handle closing the footer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (footerRef.current && !footerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  // Define background color for different modes
  const bgColor = useColorModeValue("whiteAlpha.900", "gray.800");
  const shadowColor = useColorModeValue("rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0.8)");

  return (
    <>
      <Collapse in={isExpanded} animateOpacity>
        <Box
          ref={footerRef}
          position="fixed"
          bottom={12}
          left="50%"
          transform="translateX(-50%)"
          width="90%"
          maxWidth="400px"
          p={4}
          bg={bgColor} // Solid background
          boxShadow={`0 -2px 20px ${shadowColor}`} // Soft shadow for better depth
          zIndex={1000}
          borderRadius="md"
          transition="all 0.3s ease-in-out"
        >
          <Flex justify="space-between" align="center">
            <ScaleFade initialScale={0.9} in={isSignOutButtonVisible}>
              {isSignOutButtonVisible && <SignOutButton />}
            </ScaleFade>
            <FooterLanguageButtons />
            <SwitchColorThemeButton />
            <IconButton
              aria-label="Close settings"
              icon={<CloseIcon />}
              onClick={() => setIsExpanded(false)}
              colorScheme="xblue"
              _hover={{
                transform: "rotate(90deg)",
              }}
              transition="all 0.3s ease"
              size="sm"
            />
          </Flex>
        </Box>
      </Collapse>

      <ScaleFade in={!isExpanded}>
        <IconButton
          position="fixed"
          bottom={4}
          left={4}
          aria-label="Open settings"
          icon={<SettingsIcon />}
          onClick={() => setIsExpanded(true)}
          colorScheme="xblue"
          boxShadow="0 2px 8px rgba(0, 0, 0, 0.2)"
          _hover={{
            transform: "rotate(90deg)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)", // Enhanced shadow for a hover effect
          }}
          transition="all 0.3s ease"
          zIndex={1000}
          size="md"
        />
      </ScaleFade>
    </>
  );
};

export default ExpandableFooter;
