import AddStudentInternship from "@/components/AddStudentInternship";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/providers/context/SessionContext";
import axios from "axios";
import { AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddStudentInternshipPage = () => {
  const navigate = useNavigate();
  const { token, role } = useSession();
  const [loading, setLoading] = useState(true);
  if (!role?.includes("student")){
    navigate("/dashboard")
  }
  const getStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/internship/api/v1/internships/student/check",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setLoading(false);
    } catch (error) {
      if (error.response.data.message != "") {
        toast(
          <>
            <AlertCircle />
            {error.response.data.message}
          </>
        );
        navigate("/dashboard");
      }
    }
  };

  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div className="w-full md:w-fit">
      {!loading && <AddStudentInternship />}
      {loading && <Loader2 className=" animate-spin " size={44} />}
    </div>
  );
};

export default AddStudentInternshipPage;
