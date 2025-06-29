import React, { useState, useEffect } from "react";
import { VStack, Text, Button, HStack, Box } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import Loader from "./Loader";
import { getConversations, deleteConversation } from "../apiCalls/calls";

interface Conversation {
  _id: string;
  title: string;
  messages: {
    role: "user" | "assistant";
    content: string;
  }[];
}

interface Props {
  onSelectConversation: (conversation: Conversation) => void;
  onNewChat: () => void;
  reloadConversations?: boolean;
}

const Conversations = ({
  onSelectConversation,
  onNewChat,
  reloadConversations,
}: Props) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const response = await getConversations();
        setConversations(response.conversations || []);
      } catch (err) {
        console.error("Error fetching conversations:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [reloadConversations]);

  const handleRemoveConversation = async (conversationId: string) => {
    await deleteConversation(conversationId);
    setConversations((prev) =>
      prev.filter((conversation) => conversation._id !== conversationId)
    );
  };

  return (
    <VStack
      bg="gray.100"
      w="250px"
      h="100%"
      p={4}
      spacing={4}
      align="stretch"
      overflowY="auto"
    >
      <Text fontSize="xl" fontWeight="bold" textAlign="center">
        Conversations
      </Text>

      <Button
        size="sm"
        colorScheme="blackAlpha"
        onClick={onNewChat}
        mb={2}
        variant="solid"
      >
        + New Chat
      </Button>

      {loading && <Loader size="sm" />}
      {error && (
        <Text color="red.500" textAlign="center">
          No conversations
        </Text>
      )}

      {conversations.map((conversation) => (
        <HStack
          key={conversation._id}
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            variant="ghost"
            onClick={() => onSelectConversation(conversation)}
            flex="1"
            textAlign="left"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {conversation.title || "Untitled"}
          </Button>
          <DeleteIcon
            _hover={{ cursor: "pointer" }}
            onClick={() => handleRemoveConversation(conversation._id)}
          />
        </HStack>
      ))}
    </VStack>
  );
};

export default Conversations;
