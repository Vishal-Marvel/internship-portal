import ViewInternship from "@/components/ViewInternship";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/providers/context/SessionContext";
import { Internship, Student, StudentInternship } from "@/schema";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { token, role, isTokenExpired } = useSession();
  if (role && role.includes("student")) {
    const [internship, setInternship] = useState<Internship[]>([]);
    const [student, setStudent] = useState<Student>();
    const [data, setData] = useState<StudentInternship[]>();

    const getData = async () => {
      try {
        if (isTokenExpired()) return;
        const response = await axiosInstance.get(
          "http://localhost:5000/internship/api/v1/students/internships",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setInternship(response.data.data.internshipDetails);
        const studentResponse = await axiosInstance.get(
          "http://localhost:5000/internship/api/v1/students/viewStudent",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setStudent(studentResponse.data.data.student);
      } catch (error) {
        console.error(error.response.data.message || error);
      }
    };
    useEffect(() => {
      getData();
    }, []);
    useEffect(() => {
      if (student && internship.length>0){
        const mergedData : StudentInternship[] = internship.map(internshipData=>({
          student,
          internship: internshipData
        }))
        setData(mergedData)
      }
    }, [internship, student]);

    return (
      <div className="grid place-items-center w-full">
        <ViewInternship data={data} />
      </div>
    );
  } else {
    return <div className="grid place-items-center w-full"></div>;
  }
};

export default Dashboard;
