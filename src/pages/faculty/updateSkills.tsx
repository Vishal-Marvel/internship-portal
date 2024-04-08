import { skillColumns } from "@/components/data-table-cols/skill-columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useModal } from "@/hooks/use-model-store";
import { useSocket } from "@/hooks/use-socket";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/providers/context/SessionContext";
import { Skill } from "@/schema";
import { AlertCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
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
const ModifySkills = () => {
  const { token, role, isTokenExpired } = useSession();
  const { type, onClose } = useSocket();
  const { onOpen } = useModal();

  const [skills, setSkills] = useState<Skill[]>([]);

  const getSkills = async () => {
    try {
      if (token && !isTokenExpired()) {
        const response = await axiosInstance.get(
          "http://localhost:5000/internship/api/v1/skill/skillList",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setSkills(response.data.data.skill);
        onClose();
      }
    } catch (error) {
      toast(
        <>
          <AlertCircle />
          {error.response.data.message}
        </>
      );
      onClose();
    }
  };

  useEffect(() => {
    if (!type || type == "skills") getSkills();
  }, [type]);

  return (
    <div className="relative grid place-items-center w-full">
      <div className="absolute top-2 right-2">
        <Button
          variant="primary"
          className="flex gap-2"
          onClick={() => onOpen("addSkill")}
        >
          <PlusCircle className="h-5 w-5" /> Add Skill{" "}
        </Button>
      </div>
      <DataTable
        type="skill"
        data={skills}
        columns={skillColumns}
        visibleColumns={{}}
      />
    </div>
  );
};

export default ModifySkills;
