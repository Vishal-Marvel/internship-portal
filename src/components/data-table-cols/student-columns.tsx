import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Staff, Student } from "@/schema";
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
import { Checkbox } from "@/components/ui/checkbox";

import { useNavigate } from "react-router-dom";
import { useSession } from "@/providers/context/SessionContext";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const studentColumns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        //@ts-ignore
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "student_id",
    header: ({ column }) => {
      return <div className="text-center">Student Id</div>;
    },
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue("student_id")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <div className="text-center">Student Name</div>;
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
    accessorKey: "year_of_studying",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Year" />;
    },
    cell: ({ row }) => (
      <div className="text-center font-medium uppercase">
        {row.getValue("year_of_studying")}
      </div>
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "section",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Section" />;
    },
    cell: ({ row }) => (
      <div className="text-center font-medium uppercase">
        {row.getValue("section")}
      </div>
    ),
  },
  {
    accessorKey: "total_days_internship",
    header: ({ column }) => {
      return <div className="text-center">Internship Completed Days</div>;
    },
    cell: ({ row }) => (
      <div className="text-center font-medium uppercase">
        {row.getValue("total_days_internship")}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "placement_status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Placement Status" />;
    },
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue("placement_status")}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "placed_company",
    header: ({ column }) => {
      return <div className="text-center">Placed Company</div>;
    },
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue("placed_company") ?? "Not Placed"}
      </div>
    ),
  },
  {
    accessorKey: "mentor_name",
    header: ({ column }) => {
      return <div className="text-center">Mentor Name</div>;
    },
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue("mentor_name")}
      </div>
    ),
  },
  {
    accessorKey: "skills",
    header: ({ column }) => {
      return <div className="text-center">Skills</div>;
    },
    cell: ({ row }) => (
      <div className="text-end font-medium flex flex-col ">
        {
          //@ts-ignore
          row.getValue("skills").map((skill, index) => (
            <span key={index} className="mr-2">
              {skill}
            </span>
          ))
        }
      </div>
    ),
    filterFn: (row, id, value) => {
      //@ts-ignore
      return value.every((val) => row.getValue(id).includes(val));
    },
    enableGlobalFilter: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;
      const { role } = useSession();
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
                navigate("/profile/student/" + student.id);
              }}
            >
              View Student Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                navigate("/studentInternships?student=" + student.id);
              }}
            >
              View Student Internhips
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                navigate("/addInternship?student=" + student.id);
              }}
            >
              Add Internhip
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
