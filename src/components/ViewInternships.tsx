import axiosInstance from "@/lib/axios";
import { useSession } from "@/providers/context/SessionContext";
import { Internship, Student } from "@/schema";
import { VisibilityState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { internshipColumns } from "./data-table-cols/internship-columns";
import { DataTable } from "./ui/data-table";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

function isMobileView() {
  if (window) {
    // Get the width of the viewport
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width >= 1024) {
      return 2;
    } else if (width >= 768 && width < 1024) {
      return 1;
    } else if (width < 768) {
      return 0;
    }
  }
}
const ViewInternships = () => {
  const { token, role, isTokenExpired } = useSession();
  const [width, setWidth] = useState(isMobileView());
  useEffect(() => {
    const handleResize = () => {
      setWidth(isMobileView());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [data, setData] = useState<Internship[]>([]);
  const visibleColumns: VisibilityState = {
    student_id: !role?.includes("student"),
    starting_date: width > 0,
    ending_date: width > 1,
    days: width > 0,
    approval_status: width > 1,
    department: false,
    batch: false,
    section: false,
  };

  const getData = async () => {
    try {
      if (isTokenExpired()) return;
      if (role?.includes("student")) {
        const response = await axiosInstance.get(
          "http://localhost:5000/internship/api/v1/students/internships",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setData(response.data.data.internships);
      } else {
        const response = await axiosInstance.get(
          "http://localhost:5000/internship/api/v1/internships/view/all",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setData(response.data.data.internships);
      }
    } catch (error) {
      toast(
        <>
          <AlertCircle />
          {error.response.data.message}
        </>
      );
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <DataTable
      type="internship"
      data={data}
      columns={internshipColumns}
      visibleColumns={visibleColumns}
    />
  );
};

export default ViewInternships;
