/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Button, HStack } from "@chakra-ui/react";

export default function Pagination({ itemsPerPage, totalItems, currentPage, setCurrentPage }: any) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <HStack spacing={2} justify="center" mt={4}>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => setCurrentPage(number)}
          colorScheme={currentPage === number ? "blue" : "gray"}
        >
          {number}
        </Button>
      ))}
    </HStack>
  );
}