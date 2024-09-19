import React from "react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Radio, RadioGroup, Stack, useDisclosure } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export default function TaskStatusModal() {
  const t = useTranslations('project-tasks')
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = React.useState("in-progress");
  

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        {t('change-status')}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('change-task-status')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup onChange={setStatus} value={status}>
              <Stack direction="column" spacing={4}>
                <Radio value="in-progress" colorScheme="yellow">
                  {t('in-progress')}
                </Radio>
                <Radio value="done" colorScheme="green">
                  {t('done')}
                </Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              {t('save')}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              {t('cancel')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
