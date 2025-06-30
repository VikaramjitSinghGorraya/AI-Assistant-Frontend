import React, { useState } from "react";
import { VStack, Button, Input, Heading, HStack, Link } from "@chakra-ui/react";
import { signin } from "../apiCalls/calls";
import Loader from "../components/Loader";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  interface SigninForm {
    email: string;
    password: string;
  }
  interface RequestStatus {
    success: boolean;
    error: boolean;
    loading: boolean;
    message: string;
  }

  const navigate = useNavigate();

  const [requestStatus, setRequestStatus] = useState<RequestStatus>({
    success: false,
    error: false,
    loading: false,
    message: "",
  });

  const [formData, setFormData] = useState<SigninForm>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRequestStatus({ ...requestStatus, loading: true });
    try {
      const { email, password } = formData;
      await signin(email, password);

      navigate("/");
    } catch (err) {
      setRequestStatus({
        ...requestStatus,
        loading: false,
        error: true,
        message: (err as Error).message,
      });
    }
  };
  return (
    <VStack w="100%" m="auto" spacing={5}>
      <Heading>Welcome Back!</Heading>
      <form
        style={{ width: "100%", textAlign: "center" }}
        onSubmit={submitHandler}
      >
        <VStack
          w={{ base: "90%", md: "70%", lg: "50%" }}
          spacing={4}
          m="auto"
          h="100%"
        >
          <Input
            name="email"
            placeholder="Your email"
            type="email"
            required
            onChange={handleChange}
          />
          <Input
            name="password"
            placeholder="Your password"
            type="password"
            required
            onChange={handleChange}
          />
          <HStack w="100%" justifyContent={"space-between"}>
            <VStack>
              <Button color="white" bgColor="blackAlpha.900" type="submit">
                {requestStatus.loading ? <Loader size="sm" /> : "Signin"}
              </Button>
            </VStack>

            <Link href="/signup">Signup Here</Link>
          </HStack>
        </VStack>
      </form>
      {requestStatus.loading && <Loader size="sm" />}
      {requestStatus.error && (
        <Notification
          title="Signin Failed"
          description={requestStatus.message}
          status="error"
          toastId="signin-error"
        />
      )}
    </VStack>
  );
};

export default Signin;
