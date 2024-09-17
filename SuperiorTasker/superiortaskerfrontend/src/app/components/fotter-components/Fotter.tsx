// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { auth } from "@/commons/auth";
import { Box } from "@chakra-ui/react"
import React from "react"
import ExpandableFooter from "./ExpendableFooter";



export default async function Footer() {

  return (
    <Box>
        <ExpandableFooter  ></ExpandableFooter>
    </Box>
  )
};

