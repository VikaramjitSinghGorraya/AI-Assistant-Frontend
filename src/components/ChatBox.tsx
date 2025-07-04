import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  Textarea,
  Button,
  VStack,
  HStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { QuestionIcon, SearchIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { askQuestion, searchWeb, signout } from "../apiCalls/calls";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  _id: string;
  title: string;
  messages: Message[];
}

interface ChatBoxProps {
  conversation: Conversation | null;
  onNewConversation?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatBox = ({ conversation, onNewConversation }: ChatBoxProps) => {
  const [askQuestionSelected, setAskQuestionSelected] = useState(true);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (conversation) {
      setMessages([...conversation.messages]);
    } else {
      setMessages([]);
    }
  }, [conversation?._id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const logoutHandler = async () => {
    await signout();
    window.location.reload();
  };
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) return;
    setQuestion("");

    const userMessage: Message = { role: "user", content: question };
    const assistantPlaceholder: Message = {
      role: "assistant",
      content: "Thinking...",
    };

    setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);

    try {
      const action = askQuestionSelected ? askQuestion : searchWeb;
      const response = await action(question, conversation?._id);
      const assistantContent =
        response?.answer?.kwargs?.content || "No response";

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: assistantContent,
        };
        return updated;
      });
      onNewConversation?.((prev) => !prev);
    } catch (err) {
      console.error("Error getting response:", err);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, something went wrong.",
        };
        return updated;
      });
    }
  };

  const displayMessages = () => (
    <VStack
      flex="1"
      spacing={3}
      align="stretch"
      overflowY="auto"
      mb={4}
      bg="gray.100"
      p={4}
      borderRadius="md"
      w="100%"
      ref={scrollRef}
    >
      {messages.map((msg, idx) => (
        <Box
          key={idx}
          alignSelf={msg.role === "user" ? "flex-end" : "flex-start"}
          bg={msg.role === "user" ? "blue.500" : "gray.300"}
          color={msg.role === "user" ? "white" : "black"}
          px={4}
          py={2}
          borderRadius="md"
          maxW="80%"
        >
          <Text lineHeight={"8"}>{msg.content}</Text>
        </Box>
      ))}
    </VStack>
  );

  return (
    <VStack h="100vh" align="center" justify="space-between" w="100%" p={4}>
      {displayMessages()}: (
      <Box p={4}>
        <Text color="gray.500">Select a conversation to start chatting.</Text>
      </Box>
      )
      <form style={{ width: "100%" }} onSubmit={submitHandler}>
        <Flex w="100%" alignItems="center" gap={2}>
          <Textarea
            placeholder={askQuestionSelected ? "Ask Question" : "Search Web"}
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button color="white" bgColor="blackAlpha.900" type="submit">
            Send
          </Button>
        </Flex>
      </form>
      <HStack
        justifyContent={[
          "space-around",
          "space-around",
          "space-around",
          "space-between",
        ]}
        alignItems="center"
        w="100%"
        wrap="nowrap"
        spacing={4}
        overflowX="auto"
      >
        <HStack spacing={3}>
          <Button
            bg="transparent"
            color={askQuestionSelected ? "blue.600" : "black"}
            _hover={{ backgroundColor: "transparent" }}
            onClick={() => setAskQuestionSelected(true)}
            p={0}
          >
            <QuestionIcon display={{ base: "inline", md: "none" }} />
            <Text display={{ base: "none", md: "inline" }}>Ask Question</Text>
          </Button>

          <Button
            bg="transparent"
            color={!askQuestionSelected ? "blue.600" : "black"}
            _hover={{ backgroundColor: "transparent" }}
            onClick={() => setAskQuestionSelected(false)}
            p={0}
          >
            <SearchIcon display={{ base: "inline", md: "none" }} />
            <Text display={{ base: "none", md: "inline" }}>Search Web</Text>
          </Button>
        </HStack>

        {/* Logout */}
        <Button
          bg="transparent"
          _hover={{ backgroundColor: "transparent" }}
          onClick={logoutHandler}
        >
          <ArrowRightIcon display={{ base: "inline", md: "none" }} />
          <Text display={{ base: "none", md: "inline" }}>Logout</Text>
        </Button>
      </HStack>
    </VStack>
  );
};

export default ChatBox;
