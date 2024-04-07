import { facultyColumns } from "@/components/data-table-cols/staff-columns";
import { DataTable } from "@/components/ui/data-table";
import { useSocket } from "@/hooks/use-socket";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/providers/context/SessionContext";
import { Staff } from "@/schema";
import { VisibilityState } from "@tanstack/react-table";
import { AlertCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
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
const ViewFaculties = () => {
  const { token, role } = useSession();
  const [width, setWidth] = useState(isMobileView());
  const { type, onClose } = useSocket();
  useEffect(() => {
    const handleResize = () => {
      setWidth(isMobileView());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const visibleColumns: VisibilityState = {
    sec_sit: width > 0 && role?.includes("ceo"),
    department:
      width > 0 && (role?.includes("principal") || role?.includes("ceo")),
  };
  const [faculty, setFaculty] = useState<Staff[]>([]);
  const getStaff = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:5000/internship/api/v1/staffs/viewMultipleStaff/all",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setFaculty(response.data.data.staffs);
      onClose();
    } catch (error) {
      if (error.response.data.message != "")
      toast(
        <>
          <AlertCircle />
          {error.response.data.message}
        </>
      );
    }
  };
  useEffect(() => {
    if (!type || type == "staff") getStaff();
  }, [type]);
  return (
    <div className="grid place-items-center w-full">
      <DataTable
        type="faculty"
        data={faculty}
        columns={facultyColumns}
        visibleColumns={visibleColumns}
      />
    </div>
  );
};

export default ViewFaculties;
