import FacultyForgotPassword from "@/components/FacultyForgotPassword";
import StudentForgotPassword from "@/components/StudentForgotPassword";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/providers/context/SessionContext";
import { useTheme } from "@/providers/theme-provider";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const ForgotPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const student = searchParams.get("student");
  const faculty = searchParams.get("faculty");

  const { setTheme } = useTheme();
  const { token } = useSession();
  useEffect(() => {
    setTimeout(() => {
      if (!token) setTheme("default");
    }, 1000);
  }, []);

  return (
    <div className="grid place-items-center w-full">
      <Tabs defaultValue={student ? "student" : "faculty"} className=" w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <StudentForgotPassword />
        </TabsContent>
        <TabsContent value="faculty">
          <FacultyForgotPassword />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ForgotPassword;
