import React, { useState } from "react";
import {
  Box,
  Stack,
  IconButton,
  useBreakpointValue,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerBody,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import ChatBox from "../components/ChatBox";
import Conversations from "../components/Conversations";

interface Message {
  role: "user" | "assistant";
  content: string;
}
interface Conversation {
  _id: string;
  title: string;
  messages: Message[];
}

const Home = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [reloadConversations, setReloadConversations] =
    useState<boolean>(false);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack direction="row" h="100%" w="100%" spacing={0}>
      {/* Desktop sidebar */}
      {!isMobile && (
        <Box w="260px" h="90%" overflowY="auto">
          <Conversations
            onSelectConversation={setSelectedConversation}
            onNewChat={() => setSelectedConversation(null)}
            reloadConversations={reloadConversations}
          />
        </Box>
      )}

      {/* Mobile hamburger button */}
      {isMobile && (
        <IconButton
          aria-label="Open conversations"
          icon={<HamburgerIcon />}
          bg="transparent"
          position="absolute"
          top={2}
          left={0}
          onClick={onOpen}
        />
      )}

      {/* Mobile drawer */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent color="blackAlpha.900" bg="white" maxW={"fit-content"}>
          <DrawerBody p={0}>
            <Conversations
              onSelectConversation={(c) => {
                setSelectedConversation(c);
                onClose();
              }}
              onNewChat={() => {
                setSelectedConversation(null);
                onClose();
              }}
              reloadConversations={reloadConversations}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Chat area */}
      <Box flex="1" h="100%" overflow="hidden">
        <ChatBox
          conversation={selectedConversation}
          onNewConversation={setReloadConversations}
        />
      </Box>
    </Stack>
  );
};

export default Home;
