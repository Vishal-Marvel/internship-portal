import StudentInternship from "@/components/StudentInternship";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/providers/context/SessionContext";
import { Internship } from "@/schema";
import { AlertCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ViewInternshipPage = () => {
  const { id } = useParams();
  const [internship, setInternship] = useState<Internship>();
  const { token, isTokenExpired } = useSession();
  const change=()=>{

    getInternship();
  }
  const getInternship = async () => {

    if (token ) {
      try {
        const response = await axiosInstance.get(
          "http://localhost:5000/internship/api/v1/internships/" + id,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setInternship(response.data.data.internshipDetails);
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
    getInternship();
  }, [token]);

  return <StudentInternship internship={internship} changeIntern={change}/>;
};

export default ViewInternshipPage;
