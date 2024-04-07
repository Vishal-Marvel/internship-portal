import { internshipColumns } from "@/components/data-table-cols/internship-columns";
import { DataTable } from "@/components/ui/data-table";
import { useSession } from "@/providers/context/SessionContext";
import { Internship } from "@/schema";
import { VisibilityState } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
interface Props {
  internship: Internship[];
}
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
const ViewStudentInternships = ({ internship }: Props) => {
  const [width, setWidth] = useState(isMobileView());
  useEffect(() => {
    const handleResize = () => {
      setWidth(isMobileView());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { role } = useSession();
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
  return (
    <DataTable
      type="internship"
      data={internship}
      columns={internshipColumns}
      visibleColumns={visibleColumns}
    />
  );
};

export default ViewStudentInternships;
