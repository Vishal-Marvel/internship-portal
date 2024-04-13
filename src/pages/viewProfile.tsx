import FacultyProfile from "@/components/FacultyProfile";
import StudentProfile from "@/components/StudentProfile";
import { useSocket } from "@/hooks/use-socket";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/providers/context/SessionContext";
import { Staff, Student } from "@/schema";
import { useEffect, useState } from "react";

const ViewProfilePage = () => {
  const [student, setStudent] = useState<Student>();
  const [staff, setStaff] = useState<Staff>();
  const { token, isTokenExpired, role } = useSession();
  const { type, onClose } = useSocket();
  const getData = async () => {
    if (token && !isTokenExpired()) {
      try {
        if (role.includes("student") || (type && type == "studentProfile")) {
          const response = await axiosInstance.get(
            "http://localhost:5000/internship/api/v1/students/viewStudent",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setStudent(response.data.data.student);
        } else if (!type || type === "facultyProfile") {
          const response = await axiosInstance.get(
            "http://localhost:5000/internship/api/v1/staffs/viewStaff",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setStaff(response.data.data.staff);
        }
        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getData();
  }, [type]);
  return (
    <div>
      {role && role.includes("student") ? (
        <StudentProfile student={student} />
      ) : (
        <FacultyProfile staff={staff} />
      )}
    </div>
  );
};

export default ViewProfilePage;
