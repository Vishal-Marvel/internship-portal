import { ColumnDef } from "@tanstack/react-table";
import { Internship, approvalStatuses, internshipStatuses, noOfDays } from "@/schema";
import { DataTableColumnHeader } from "./data-column-header";
import { Checkbox } from "../ui/checkbox";

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
      return <DataTableColumnHeader column={column} title="Starting Date" className="md:block hidden" />;
    },
    cell: ({ row }) => (
      <div className="text-right font-medium md:block hidden">
        {new Date(row.getValue("starting_date")).toLocaleDateString()}
      </div>
    ),
    
  },
  {
    accessorKey: "ending_date",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Ending Date" className="md:flex hidden"/>;
    },
    cell: ({ row }) => (
      <div className="text-right font-medium md:block hidden">
        {new Date(row.getValue("ending_date")).toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: "no_of_days",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="No Of Days" className="md:flex hidden" />;
    },
    cell: ({ row }) => {
      const status = noOfDays.find(
        (status) => status.value === row.getValue("no_of_days")
      )

      if (!status) {
        return null
      }

      return (
        <div className="items-center justify-center md:flex hidden">
          
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "approval_status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Approval Status" className="lg:flex hidden" />;
    },
    cell: ({ row }) =>  {
      const status = approvalStatuses.find(
        (status) => status.value === row.getValue("approval_status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="items-center lg:flex hidden">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 " />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "internship_status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Completion Status" className="lg:flex hidden" />;
    },
    cell: ({ row }) => {
      const status = internshipStatuses.find(
        (status) => status.value === row.getValue("internship_status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="items-center lg:flex hidden">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 " />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
];
