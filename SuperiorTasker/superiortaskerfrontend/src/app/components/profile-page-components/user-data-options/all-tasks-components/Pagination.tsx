/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Button, HStack } from "@chakra-ui/react";

export default function Pagination({
  currentPage,
  setCurrentPage,
  hasNextPage,
}: {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  hasNextPage: boolean;
}) {
  return (
    <HStack spacing={4} justify="center" mt={4}>
      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        isDisabled={currentPage === 0}
        colorScheme="blue"
      >
        &lt;
      </Button>
      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        isDisabled={!hasNextPage}
        colorScheme="blue"
      >
        &gt;
      </Button>
    </HStack>
  );
}
