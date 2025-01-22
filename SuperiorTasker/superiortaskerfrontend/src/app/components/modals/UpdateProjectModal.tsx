import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { ProjectData, UpdateProjectModalProps } from "@/app/interfaces/types";

const UpdateProjectModal: React.FC<UpdateProjectModalProps> = ({
    isOpen,
    onClose,
    project, // Add project prop
    onUpdateProject,
}) => {
    const t = useTranslations('group-page');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [projectData, setProjectData] = useState<ProjectData>({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
    });

    // Initialize form with project data when modal opens
    useEffect(() => {
        if (project) {
            setProjectData({
                name: project.name,
                description: project.description,
                startDate: project.startDate.split('T')[0], // Convert to YYYY-MM-DD
                endDate: project.endDate.split('T')[0], // Convert to YYYY-MM-DD
            });
        }
    }, [project]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProjectData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await onUpdateProject(projectData);
            onClose(); // Close modal after successful update
        } finally {
            setIsSubmitting(false);
        }
    };

    const isEndDateValid = () => {
        if (!projectData.startDate || !projectData.endDate) return true;
        return new Date(projectData.endDate) >= new Date(projectData.startDate);
    };

    const isFormValid = () => {
        return (
            projectData.name.trim() !== "" &&
            projectData.description.trim() !== "" &&
            projectData.startDate !== "" &&
            projectData.endDate !== "" &&
            isEndDateValid()
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit}>
                    <ModalHeader>{t('update-project')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>{t('project-name')}</FormLabel>
                                <Input
                                    name="name"
                                    value={projectData.name}
                                    onChange={handleInputChange}
                                    placeholder={t('enter-project-name')}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>{t('project-description')}</FormLabel>
                                <Textarea
                                    name="description"
                                    resize="none"
                                    value={projectData.description}
                                    onChange={handleInputChange}
                                    placeholder={t('enter-project-description')}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>{t('start-date')}</FormLabel>
                                <Input
                                    name="startDate"
                                    type="date"
                                    value={projectData.startDate}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>{t('end-date')}</FormLabel>
                                <Input
                                    name="endDate"
                                    type="date"
                                    value={projectData.endDate}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            type="submit"
                            isDisabled={!isFormValid()}
                            isLoading={isSubmitting}
                        >
                            {t('update-project')}
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            isDisabled={isSubmitting}
                        >
                            {t('cancel')}
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default UpdateProjectModal;