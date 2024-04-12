import AddStudentInternship from "@/components/AddStudentInternship";
import { useModal } from "@/hooks/use-model-store";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/providers/context/SessionContext";
import axios from "axios";
import { AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const AddStudentInternshipPage = () => {
  const navigate = useNavigate();
  const { onOpen } = useModal();
  const { token, role } = useSession();
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("student");
  const [student, setStudent] = useState("");
  useEffect(() => {
    setStudent(id);
  }, [id]);
  const getStatus = async () => {
    try {
      setLoading(true);
      if (!role?.includes("student") && student == "") return;
      const response = await axios.get(
        `http://localhost:5000/internship/api/v1/internships/check${
          !role?.includes("student") ? "/" + student : ""
        }`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setLoading(false);
    } catch (error) {
      if (role?.includes("student")) {
        toast(
          <>
            <AlertCircle />
            {error.response.data.message}
          </>
        );
        navigate("/dashboard");
      } else {
        setLoading(false);

        // console.error(error);
        onOpen("alert", {
          alertText: error.response.data.message,
        });
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
