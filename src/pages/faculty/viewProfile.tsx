import StudentProfile from "@/components/StudentProfile";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/providers/context/SessionContext";
import { Student } from "@/schema";
import React, { useEffect, useState } from "react";

const ViewStudentProfilePage = () => {
  const [student, setStudent] = useState<Student>();
  const { token, isTokenExpired } = useSession();
  const getStudent = async () => {
    if (token && !isTokenExpired()) {
      try {
        const response = await axiosInstance.get(
          "http://localhost:5000/internship/api/v1/students/viewStudent",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setStudent(response.data.data.student);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getStudent();
  }, []);
  return <div>
    <StudentProfile student={student}/>

  </div>;
};

export default ViewStudentProfilePage;
