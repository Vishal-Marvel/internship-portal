import { ColumnDef } from "@tanstack/react-table";
import { Internship } from "@/schema";
import { DataTableColumnHeader } from "./data-column-header";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Internship>[] = [
  
  {
    accessorKey: "student",
    header: "Student Id",
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("student")}
      </div>
    ),
  },
  {
    accessorKey: "company_name",
    header: "Company Name",
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("company_name")}
      </div>
    ),
  },
  {
    accessorKey: "starting_date",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Starting Date" />;
    },
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {new Date(row.getValue("starting_date")).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "ending_date",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Ending Date" />;
    },
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {new Date(row.getValue("ending_date")).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "no_of_days",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="No Of Days" />;
    },
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("no_of_days")}</div>
    ),
  },
  {
    accessorKey: "approval_status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Approval Status" />;
    },
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("approval_status")}
      </div>
    ),
  },
  {
    accessorKey: "internship_status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Completion Status" />;
    },
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("internship_status")}
      </div>
    ),
  },
];
