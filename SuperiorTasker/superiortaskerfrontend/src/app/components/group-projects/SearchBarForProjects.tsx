"use client"
import React, { useState } from "react"
import { Box, Input, Button, InputGroup, InputRightElement } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { useTranslations } from "next-intl"

export default function SearchbarForProjects() {
    const t = useTranslations('projects-page');
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        // Implement search functionality here
        console.log("Searching for:", searchTerm);
    };

    return (
        <Box width="100%" maxWidth="600px" margin="auto">
            <InputGroup size="lg">
                <Input
                    placeholder={t('search-projects')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    pr="4.5rem"
                    borderRadius="full"
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleSearch} colorScheme="blue" borderRadius="full">
                        <SearchIcon />
                    </Button>
                </InputRightElement>
            </InputGroup>
        </Box>
    )
}