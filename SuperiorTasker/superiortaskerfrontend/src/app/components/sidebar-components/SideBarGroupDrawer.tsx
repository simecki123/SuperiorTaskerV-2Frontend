/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Link } from "@chakra-ui/react";
import React from "react"

export default function SideBarGroupDrawer({ isOpen, onClose, group }: any) {
    if (!group) {
        return null;
      }
      const { name, groupId, description } = group;
    
      return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{name}</DrawerHeader>
    
            <DrawerBody className="flex flex-col">
              <a href={`group-events?groupId=${groupId}`} onClick={onClose}>
                Group events
              </a>
              <Link href={`orders?${groupId}`} onClick={onClose}>
                Orders
              </Link>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )
};

