import ResetPassword from "@/components/ResetPassword";
import { useSession } from "@/providers/context/SessionContext";
import { useTheme } from "@/providers/theme-provider";
import { useEffect } from "react";

const resetPassword = () => {
  const { setTheme } = useTheme();
  const { token } = useSession();
  useEffect(() => {
    setTimeout(() => {
      if (!token) setTheme("default");
    }, 1000);
  }, []);

  return (
    <div className="grid place-items-center w-full">
      <ResetPassword/>
    </div>
  );
};

export default resetPassword;
