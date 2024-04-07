import FacultyLogin from "@/components/FacultyLogin";
import StudentLogin from "@/components/StudentLogin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/providers/context/SessionContext";
import { useTheme } from "@/providers/theme-provider";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const faculty = searchParams.get("faculty")
  const { setTheme } = useTheme();
  const { token } = useSession();
  useEffect(() => {
    setTimeout(() => {
      if (!token) setTheme("default");
    }, 1000);
  }, []);

  return (
    <div className="grid place-items-center w-full">
      <Tabs defaultValue={faculty?"faculty":"student"} className=" w-full md:min-w-[30vw]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <StudentLogin />
        </TabsContent>
        <TabsContent value="faculty">
          <FacultyLogin />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
