import AddStudentInternship from "@/components/AddStudentInternship";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/providers/context/SessionContext";
import axios from "axios";
import { AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const AddStudentInternshipPage = () => {
  const navigate = useNavigate();
  const { token, role } = useSession();
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("student");
  const [student, setStudent] = useState("student");
  useEffect(() => {
    setStudent(id);
  }, [id]);
  const getStatus = async () => {
    if (!role.includes("student") && student == "student") return;
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/internship/api/v1/internships/check/" + student,
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
  }, [student]);

  return (
    <div className="w-full md:w-fit">
      {!loading && <AddStudentInternship student={student} />}
      {loading && <Loader2 className=" animate-spin " size={44} />}
    </div>
  );
};

export default AddStudentInternshipPage;
