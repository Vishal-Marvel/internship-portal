import FacultyProfile from "@/components/FacultyProfile";
import StudentProfile from "@/components/StudentProfile";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/providers/context/SessionContext";
import { Staff, Student } from "@/schema";
import { useEffect, useState } from "react";

const ViewProfilePage = () => {
  const [student, setStudent] = useState<Student>();
  const [staff, setStaff] = useState<Staff>();
  const { token, isTokenExpired, role } = useSession();
  const getData = async () => {
    if (token && !isTokenExpired()) {
      try {
        if (role.includes("student")) {
          const response = await axiosInstance.get(
            "http://localhost:5000/internship/api/v1/students/viewStudent",
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setStudent(response.data.data.student);
        } else {
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
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);
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
