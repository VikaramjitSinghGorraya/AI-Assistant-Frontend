import React, { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

interface NotificationProps {
  title: string;
  description: string;
  status: "success" | "error";
  toastId: string;
}

const Notification = ({
  title,
  description,
  status,
  toastId,
}: NotificationProps) => {
  const toast = useToast();
  useEffect(() => {
    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        title: title,
        description: description,
        status: status,
        duration: 6000,
        isClosable: true,
      });
    }
  }, [toastId]);
  return <></>;
};

export default Notification;
