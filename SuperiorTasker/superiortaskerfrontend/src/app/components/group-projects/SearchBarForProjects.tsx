"use client"
import React, { useState, useEffect, useRef } from "react"
import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { useTranslations } from "next-intl"

interface SearchbarForProjectsProps {
    handleSearchProjects: () => void;
    setSearchByText: (text: string) => void;
    initialSearch: string
}

export default function SearchbarForProjects({handleSearchProjects, setSearchByText, initialSearch} : SearchbarForProjectsProps ) {
    const t = useTranslations('projects-page');
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const typingTimeoutRef = useRef<NodeJS.Timeout>();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            setSearchByText(value);
            handleSearchProjects();
        }, 500);
    };

    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);

    return (
        <Box width="100%" maxWidth="600px" margin="auto">
            <InputGroup size="lg">
                <Input
                    placeholder={t('search-projects')}
                    value={searchTerm}
                    onChange={handleInputChange}
                    pr="4.5rem"
                    borderRadius="full"
                />
                <InputRightElement width="4.5rem">
                    <SearchIcon color="blue.500" />
                </InputRightElement>
            </InputGroup>
        </Box>
    )
}