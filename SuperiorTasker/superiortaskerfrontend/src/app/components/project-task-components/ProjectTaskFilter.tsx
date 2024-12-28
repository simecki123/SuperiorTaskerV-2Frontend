import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Button, Collapse, VStack, Text, RadioGroup, Stack, Radio } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface ProjectTaskFilterProps {
    initialStatus: string;
    setStatus: (string: string) => void;
}

export default function ProjectTaskFilter({
    initialStatus,
    setStatus
}: ProjectTaskFilterProps) {
    const t = useTranslations('project-tasks');
    const [isOpen, setIsOpen] = useState(false);

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
    }

    return(
        <Box width="100%" maxWidth="600px" margin="auto">
            <Button
                width="100%"
                onClick={() => setIsOpen(!isOpen)}
                variant="ghost"
                rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                mb={2}
            >
                {t('filters')}
            </Button>

            <Collapse in={isOpen} animateOpacity>
                <VStack
                    spacing={6}
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    bg="white"
                    shadow="sm"
                    align="center"
                >
                    <Box width="100%" textAlign="center">
                        <Text mb={2}>{t('include-completed')}</Text>
                        <RadioGroup
                            onChange={handleStatusChange}
                            value={initialStatus}        
                        >
                            <Stack 
                                direction="row" 
                                spacing={4} 
                                justify="center"
                            >
                                <Radio value="COMPLETED">{t('completed')}</Radio>
                                <Radio value="IN_PROGRESS">{t('in-progress')}</Radio>
                                <Radio value="">{t('default')}</Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>
                </VStack>
            </Collapse>
        </Box>
    );
}