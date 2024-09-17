"use client";
import { Box, Collapse, Flex, IconButton, ScaleFade, useColorModeValue } from "@chakra-ui/react";
import FooterLanguageButtons from "./FooterLanguageButtons";
import SwitchColorThemeButton from "./SwitchColorThemeButton";
import { SettingsIcon, CloseIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";



export default function ExpandableFooter() {
  const [isExpanded, setIsExpanded] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  

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


