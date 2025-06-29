import axios from "axios";

export const askQuestion = async (
  question: string,
  conversationId?: string
) => {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/ask/question`,
      { question, conversationId },
      { withCredentials: true } // if using cookies for auth
    );
    return response.data;
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      `An error occurred while asking the question.`;
    throw new Error(message);
  }
};

export const searchWeb = async (question: string, conversationId?: string) => {
  const response = await axios.post(
    `${process.env.BACKEND_URL}/api/search/query`,
    {
      question,
      conversationId,
    },
    { withCredentials: true }
  );
  return response.data;
};

export const signup = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/auth/signup`,
      {
        name,
        email,
        password,
      }
    );
    return response.data;
  } catch (err: any) {
    const message = err?.response?.data?.message;
    throw new Error(message);
  }
};

export const signin = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/auth/signin`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err: any) {
    const message = err?.response?.data?.message;
    throw new Error(message);
  }
};

export const isLoggedIn = async () => {
  const response = await axios.get(
    `${process.env.BACKEND_URL}/api/auth/isLoggedIn`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const signout = async () => {
  const response = await axios.get(
    `${process.env.BACKEND_URL}/api/auth/signout`,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const getConversations = async () => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/api/conversations/getConversations`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err: any) {
    const message = err?.response?.data?.message;
    throw new Error(message);
  }
};

export const deleteConversation = async (conversationId: string) => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/api/conversations/deleteConversation/${conversationId}`,
      { withCredentials: true }
    );
  } catch (err: any) {
    const message = err?.response?.data?.message;
    throw new Error(message);
  }
};
