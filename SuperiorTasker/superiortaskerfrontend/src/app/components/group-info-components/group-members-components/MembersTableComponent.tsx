/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Avatar, Button } from "@chakra-ui/react";

export default function MembersTableComponent({ members }: any) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Profile Picture</Th>
          <Th>First Name</Th>
          <Th>Last Name</Th>
          <Th>Remove User Option</Th>
        </Tr>
      </Thead>
      <Tbody>
        {members.map((member: any) => (
          <Tr key={member.id}>
            <Td>
              <Avatar 
                size="md" 
                src={member.profilePicture || "/path-to-default-profile.png"} 
                name={`${member.firstName} ${member.lastName}`} 
              />
            </Td>
            <Td>{member.firstName}</Td>
            <Td>{member.lastName}</Td>
            <Td>
              <Button 
                colorScheme="red" 
                variant="outline" 
                size="sm"
                _hover={{ bg: "red.100" }} 
                borderRadius="md"
              >
                Remove Member
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}