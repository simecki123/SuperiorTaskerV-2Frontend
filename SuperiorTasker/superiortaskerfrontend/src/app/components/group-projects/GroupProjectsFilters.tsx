"use client";

import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import {
    Box,
    Button,
    Collapse,
    Flex,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Radio,
    RadioGroup,
    Stack,
    Text,
    Icon,
    VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

interface GroupProjectFiltersSearchProps {
    handleSearchProjects: () => void;
    innitialStartCompletion: string;
    setStartCompletion: (number: string) => void;
    initialEndCompletion: string;
    setEndCompletion: (number: string) => void;
    innitialIncludeCompleted: boolean;
    setIncludeCompleted: (boolean: boolean) => void;
    innitialIncludeNotStarted: boolean;
    setIncludeNotStarted: (boolean: boolean) => void;
}

export default function GroupProjectsFilters({
    handleSearchProjects,
    innitialStartCompletion,
    setStartCompletion,
    initialEndCompletion,
    setEndCompletion,
    innitialIncludeCompleted,
    setIncludeCompleted,
    innitialIncludeNotStarted,
    setIncludeNotStarted
}: GroupProjectFiltersSearchProps) {
    const t = useTranslations('projects-page');
    const [isOpen, setIsOpen] = useState(false);
    const [sliderValues, setSliderValues] = useState([
        parseInt(innitialStartCompletion) || 0,
        parseInt(initialEndCompletion) || 100
    ]);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const handleSliderChange = (values: number[]) => {
        setSliderValues(values);
        
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setStartCompletion(values[0].toString());
            setEndCompletion(values[1].toString());
            handleSearchProjects();
        }, 500);
    };

    const handleCompletedChange = (value: string) => {
        const isCompleted = value === 'true';
        setIncludeCompleted(isCompleted);
        if (isCompleted) {
            setIncludeNotStarted(false);
        }
        handleSearchProjects();
    };

    const handleNotStartedChange = (value: string) => {
        const isNotStarted = value === 'true';
        setIncludeNotStarted(isNotStarted);
        if (isNotStarted) {
            setIncludeCompleted(false);
        }
        handleSearchProjects();
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
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
                    shadow="sm"
                >
                    <Box width="100%">
                        <Text mb={2}>{t('completion-range')}</Text>
                        <Flex justify="space-between" mb={2}>
                            <Text>{sliderValues[0]}%</Text>
                            <Text>{sliderValues[1]}%</Text>
                        </Flex>
                        <RangeSlider
                            aria-label={['min', 'max']}
                            value={sliderValues}
                            onChange={handleSliderChange}
                            min={0}
                            max={100}
                            step={10}
                        >
                            <RangeSliderTrack>
                                <RangeSliderFilledTrack />
                            </RangeSliderTrack>
                            <RangeSliderThumb index={0} />
                            <RangeSliderThumb index={1} />
                        </RangeSlider>
                    </Box>
                    <Box width="100%">
                        <Text mb={2}>{t('include-completed')}</Text>
                        <RadioGroup
                            onChange={handleCompletedChange}
                            value={innitialIncludeCompleted.toString()}
                        >
                            <Stack direction="row" spacing={4}>
                                <Radio value="true">{t('yes')}</Radio>
                                <Radio value="false">{t('no')}</Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>
                    <Box width="100%">
                        <Text mb={2}>{t('include-not-started')}</Text>
                        <RadioGroup
                            onChange={handleNotStartedChange}
                            value={innitialIncludeNotStarted.toString()}
                        >
                            <Stack direction="row" spacing={4}>
                                <Radio value="true">{t('yes')}</Radio>
                                <Radio value="false">{t('no')}</Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>
                </VStack>
            </Collapse>
        </Box>
    );
}