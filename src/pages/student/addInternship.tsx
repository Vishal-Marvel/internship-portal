import AddStudentInternship from "@/components/AddStudentInternship";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/providers/context/SessionContext";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddStudentInternshipPage = () => {
  const navigate = useNavigate();
  const { token, role } = useSession();
  const getStatus = async () => {
    try {
      if (role.includes("student")) {
        await axiosInstance.get(
          "http://localhost:5000/internship/api/v1/internships/check/student",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      }
    } catch (error) {
      toast(
        <>
          <AlertCircle />
          {error.response.data.message}
        </>
      );
      navigate("/dashboard");

    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div className="w-full md:w-fit">
      <AddStudentInternship />
    </div>
  );
};

export default AddStudentInternshipPage;
