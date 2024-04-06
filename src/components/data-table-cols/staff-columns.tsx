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
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const facultyColumns: ColumnDef<Staff>[] = [
  {
    accessorKey: "faculty_id",
    header: ({ column }) => {
      return <div className="text-center">Faculty Id</div>;
    },
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("faculty_id")}</div>
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
      <div className="text-center font-medium uppercase">{row.getValue("sec_sit")}</div>
    ),
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
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const faculty = row.original;
      const navigate = useNavigate();
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
              View Faculty
            </DropdownMenuItem>
            <DropdownMenuItem>Update Role</DropdownMenuItem>
            <DropdownMenuItem>Migrate Mentees</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
