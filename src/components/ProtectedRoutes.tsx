import React, { useState, ReactElement, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../apiCalls/calls";
import Loader from "./Loader";

const ProtectedRoutes = ({ children }: { children: ReactElement }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const userIsLoggedIn = async () => {
      try {
        const response = await isLoggedIn();

        setIsAuthenticated(response?.userId ?? false);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    userIsLoggedIn();
  }, []);

  if (isAuthenticated === null) {
    return <Loader size="xl" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoutes;
