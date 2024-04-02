import StaffSignIn from "@/components/StaffLogin";
import StudentSignIn from "@/components/StudentLogin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/providers/context/SessionContext";
import { useTheme } from "@/providers/theme-provider";
import { useEffect } from "react";

const Login = () => {
  const { setTheme } = useTheme();
  const {token} = useSession();
  useEffect(() => {
    setTimeout(()=>{
      if (!token)
      setTheme("default");
    }, 500);
  }, []);
  
  return (
    <div className="grid place-items-center w-full">
      <Tabs defaultValue="student" className="lg:w-1/3 md:w-2/3 w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <StudentSignIn />
        </TabsContent>
        <TabsContent value="staff">
          <StaffSignIn />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
