import FacultyProfile from "@/components/FacultyProfile";
import StudentProfile from "@/components/StudentProfile";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/providers/context/SessionContext";
import { Staff, Student } from "@/schema";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ViewIdProfilePage = () => {
  const { id, type } = useParams();
  const [student, setStudent] = useState<Student>();
  const [staff, setStaff] = useState<Staff>();
  const { token, isTokenExpired, role } = useSession();
  const getData = async () => {
    if (token && !isTokenExpired()) {
      try {
        if (type?.includes("student")) {
          const response = await axiosInstance.get(
            "http://localhost:5000/internship/api/v1/students/viewStudent/" +
              id,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setStudent(response.data.data.student);
        } else {
          const response = await axiosInstance.get(
            "http://localhost:5000/internship/api/v1/staffs/viewStaff/" + id,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setStaff(response.data.data.staff);
        }
      } catch (error) {
        toast(
          <>
            <AlertCircle />
            {error.response.data.message}
          </>
        );
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {type?.includes("student") ? (
        <StudentProfile student={student} />
      ) : (
        <FacultyProfile staff={staff} />
      )}
    </div>
  );
};

export default ViewIdProfilePage;
