import React from "react";
import { 
    Button, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton, 
    Radio, 
    RadioGroup, 
    Stack, 
    useDisclosure, 
    useToast 
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Task } from "@/app/interfaces/types";
import { updateTaskStatus } from "@/app/server-actions/updateTaskStatus";

interface TaskStatusModalProps {
    task: Task;
    onTaskUpdate: (updatedTask: Task) => void;
    accessToken: string;
}

export default function TaskStatusModal({ task, onTaskUpdate, accessToken }: TaskStatusModalProps) {
    const t = useTranslations('project-tasks');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [status, setStatus] = React.useState(task.taskStatus);
    const toast = useToast();

    const handleTaskUpdate = async () => {
        try {
            const result = await updateTaskStatus(
                task.userId,
                accessToken,
                task.id,
                status
            );

            onTaskUpdate({ ...task, taskStatus: result.taskStatus });

            toast({
                title: t('status-updated'),
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            onClose();
        } catch (error) {
            toast({
                title: t('update-error'),
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Button size="sm" colorScheme="teal" onClick={onOpen}>
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
                                <Radio value="IN_PROGRESS" colorScheme="yellow">
                                    {t('in-progress')}
                                </Radio>
                                <Radio value="COMPLETED" colorScheme="green">
                                    {t('done')}
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" mr={3} onClick={handleTaskUpdate}>
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