import StudentInternship from "@/components/StudentInternship";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/providers/context/SessionContext";
import { Internship} from "@/schema";
import React, { useEffect, useState } from "react";

const ViewInternshipPage = () => {
  const [internship, setInternship] = useState<Internship>();
  const { token, isTokenExpired } = useSession();
  const getInternship = async () => {
    if (token && !isTokenExpired()) {
      try {
        const response = await axiosInstance.get(
          "http://localhost:5000/internship/api/v1/internship/check/student",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setInternship(response.data.data.internship);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getInternship();
  }, []);
  return <div>
    <StudentInternship internship={internship}/>

  </div>;
};

export default ViewInternshipPage;
