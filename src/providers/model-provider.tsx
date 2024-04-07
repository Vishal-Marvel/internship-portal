
import CompletionForm from "@/components/modals/CompletionForm";
import RejectInternship from "@/components/modals/RejectInternship";
import SendBackInternship from "@/components/modals/SendBackInternship";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RejectInternship/>
      <SendBackInternship/>
      <CompletionForm/>
    </>
  );
};
