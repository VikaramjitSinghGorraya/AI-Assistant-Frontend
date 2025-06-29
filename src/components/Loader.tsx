import React from "react";
import { Spinner, Center } from "@chakra-ui/react";
interface LoaderProps {
  size: string;
}
const Loader = ({ size }: LoaderProps) => {
  return (
    <Center minH="100%" w="100%">
      <Spinner thickness="4px" color="brand.primaryBlue" size={size} />
    </Center>
  );
};

export default Loader;
