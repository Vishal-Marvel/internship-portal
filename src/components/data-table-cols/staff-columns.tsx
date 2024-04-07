import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Staff } from "@/schema";
import { DataTableColumnHeader } from "../ui/data-table/data-column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/providers/context/SessionContext";
import { useModal } from "@/hooks/use-model-store";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const facultyColumns: ColumnDef<Staff>[] = [
  {
    accessorKey: "faculty_id",
    header: ({ column }) => {
      return <div className="text-center">Faculty Id</div>;
    },
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue("faculty_id")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <div className="text-center">Faculty Name</div>;
    },
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "sec_sit",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="SEC/SIT" />;
    },
    cell: ({ row }) => (
      <div className="text-center font-medium uppercase">
        {row.getValue("sec_sit")}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Department" />;
    },
    cell: ({ row }) => (
      <div className="text-center font-medium uppercase">
        {row.getValue("department")}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { role } = useSession();
      const faculty = row.original;
      const navigate = useNavigate();
      const {onOpen} = useModal();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                navigate("/profile/faculty/" + faculty.id);
              }}
            >
              View Faculty Profile
            </DropdownMenuItem>
            {role && role != "mentor" && (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  navigate("/mentees/" + faculty.id);
                }}
              >
                View Faculty Mentees
              </DropdownMenuItem>
            )}
            {(role?.includes("hod") || role?.includes("tapcell") || role?.includes("principal") || role?.includes("ceo")) && (
                <DropdownMenuItem
                className="cursor-pointer"
                onClick={()=>onOpen("updateRole", {faculty})}
                >Update Role</DropdownMenuItem>
              )}
             {(role?.includes("hod") || role?.includes("tapcell") || role?.includes("principal") || role?.includes("ceo")) && faculty.roles.includes("mentor") &&  (
                <DropdownMenuItem
                className="cursor-pointer"
                onClick={()=>navigate("/changeMentee?mentor="+faculty.id)}
                >Migrate Mentees</DropdownMenuItem>
              )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
