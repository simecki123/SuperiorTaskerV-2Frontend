import React from "react";
import { Box, Button, Textarea, HStack, Icon } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons"; // Import an icon from Chakra UI

export default function SendMessageComponent() {
  return (
    <Box p={5}  borderRadius="md"  >
      <Textarea
        placeholder="Type your message here..."
        size="sm"
        resize="none"
        mb={4}
      />
      <HStack justify="flex-end">
        <Button
          colorScheme="teal"
          leftIcon={<Icon as={EmailIcon} />}
          variant="solid"
        >
          Send Message
        </Button>
      </HStack>
    </Box>
  );
}
