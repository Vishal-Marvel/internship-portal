import axiosInstance from "@/lib/axios";
import { useSession } from "@/providers/context/SessionContext";
import { Internship, Student } from "@/schema";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import ViewStudentInternships from "@/components/ViewStudentInternships";
import { useSocket } from "@/hooks/use-socket";

const ViewInternships = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const student = searchParams.get("student");
  const { token, role, isTokenExpired } = useSession();

  const [data, setData] = useState<Internship[]>([]);
  const { type, onClose } = useSocket();

  const getData = async () => {
    try {
      if (isTokenExpired()) return;
      if (role?.includes("student")) {
        const response = await axiosInstance.get(
          "http://localhost:5000/internship/api/v1/students/internships",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setData(response.data.data.internships);
      } else {
        if (student) {
          const response = await axiosInstance.get(
            "http://localhost:5000/internship/api/v1/internships/view-student-internships/" +
              student,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setData(response.data.data.internships);
        } else {
          const response = await axiosInstance.get(
            "http://localhost:5000/internship/api/v1/internships/view/all",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setData(response.data.data.internships);
        }
      }
      onClose();
    } catch (error) {
      toast(
        <>
          <AlertCircle />
          {error.response.data.message}
        </>
      );
      onClose();
    }
  };
  useEffect(() => {
    if (!type || type == "internship") getData();
  }, [type, student]);

  return <ViewStudentInternships internship={data} />;
};

export default ViewInternships;
