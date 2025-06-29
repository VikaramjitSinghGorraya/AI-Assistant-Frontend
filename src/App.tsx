import React from "react";
import { VStack } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <VStack h="100vh" w="90%" m={"auto"}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </VStack>
  );
}

export default App;
