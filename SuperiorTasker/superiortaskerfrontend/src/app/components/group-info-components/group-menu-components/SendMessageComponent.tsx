import React from "react";
import { Box, Button, Textarea, HStack, Icon } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons"; // Import an icon from Chakra UI
import { useTranslations } from "next-intl";

export default function SendMessageComponent() {
  const t = useTranslations('group-page')
  return (
    <Box p={5}  borderRadius="md"  >
      <Textarea
        placeholder={t('type-your-message-here')}
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
          {t('send-message')}
        </Button>
      </HStack>
    </Box>
  );
}
