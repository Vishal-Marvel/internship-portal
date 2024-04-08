import AddSkill from "@/components/modals/AddSkill";
import { AlertBox } from "@/components/modals/AlertBox";
import CompletionForm from "@/components/modals/CompletionForm";
import DeleteSkill from "@/components/modals/DeleteSkill";
import EditSkill from "@/components/modals/EditSkill";
import ModifyRole from "@/components/modals/ModifyRole";
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
      <ModifyRole />
      <RejectInternship />
      <SendBackInternship />
      <CompletionForm />
      <AddSkill />
      <EditSkill />
      <DeleteSkill />
      <AlertBox />
    </>
  );
};
