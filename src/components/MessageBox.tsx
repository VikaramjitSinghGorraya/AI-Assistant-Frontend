import React from "react";
import { Box, Text } from "@chakra-ui/react";

type MessageBoxProps = {
  message: string;
};

const MessageBox = ({ message }: MessageBoxProps) => {
  return (
    <Box bg="lightblue" maxW={"80%"}>
      <Text p={2} fontSize="md" color="black">
        {message}
      </Text>
    </Box>
  );
};

export default MessageBox;
