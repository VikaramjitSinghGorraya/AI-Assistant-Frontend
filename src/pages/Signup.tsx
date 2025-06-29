import React, { useState } from "react";
import { VStack, Button, Input, Heading, HStack, Link } from "@chakra-ui/react";
import { signup } from "../apiCalls/calls";
import Loader from "../components/Loader";
import Notification from "../components/Notification";

const Signup = () => {
  interface UserData {
    name: string;
    email: string;
    password: string;
  }

  interface RequestStatus {
    success: boolean;
    error: boolean;
    loading: boolean;
    message: string;
  }

  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
  });

  const [requestStatus, setRequestStatus] = useState<RequestStatus>({
    success: false,
    error: false,
    loading: false,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestStatus({ ...requestStatus, loading: true });
    try {
      const { name, email, password } = userData;

      const userSignedUp = await signup(name, email, password);
      setUserData({ name: "", email: "", password: "" });
      setRequestStatus({
        ...requestStatus,
        loading: false,
        success: true,
        message: userSignedUp.message,
      });
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
      <Heading>Welcome Aboard!</Heading>
      <form
        style={{ width: "100%", textAlign: "center" }}
        onSubmit={submitHandler}
      >
        <VStack w="50%" spacing={4} m="auto" h="100%">
          <Input
            name="name"
            placeholder="Name"
            value={userData.name}
            required
            onChange={handleChange}
          />
          <Input
            name="email"
            placeholder="Your email"
            type="email"
            value={userData.email}
            required
            onChange={handleChange}
          />
          <Input
            name="password"
            placeholder="Your password"
            type="password"
            value={userData.password}
            required
            onChange={handleChange}
          />
          <HStack w="100%" justifyContent={"space-between"}>
            <Button color="white" bgColor="blackAlpha.900" type="submit">
              {requestStatus.loading ? <Loader size="sm" /> : "Signup"}
            </Button>
            <Link href="/signin">Signin Here</Link>
          </HStack>
        </VStack>
      </form>
      {requestStatus.success && (
        <Notification
          title="Signup Successful"
          description={requestStatus.message}
          status="success"
          toastId="signup-success"
        />
      )}
      {requestStatus.error && (
        <Notification
          title="Signup Failed"
          description={requestStatus.message}
          status="error"
          toastId="signup-error"
        />
      )}
    </VStack>
  );
};

export default Signup;
