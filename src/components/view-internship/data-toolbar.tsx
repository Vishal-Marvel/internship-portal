"use client";

import {
  CircleCheckBig,
  CircleHelp,
  CircleX,
  Info,
  SquareCheck,
  X,
} from "lucide-react";
import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "@/components/view-internship/data-view-options";

import { DataTableFacetedFilter } from "@/components/view-internship/data-faceted-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "@/providers/context/SessionContext";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { role } = useSession();
  const approvalStatuses = [
    {
      value: "Approved",
      label: "Approved",
      icon: CircleCheckBig,
    },
    {
      value: "Not Approved",
      label: "Not Approved",
      icon: Info,
    },
    {
      value: "Sent Back",
      label: "Sent Back",
      icon: CircleHelp,
    },
  ];
  const internshipStatuses = [
    {
      value: "Completed",
      label: "Completed",
      icon: SquareCheck,
    },
    {
      value: "Not Completed",
      label: "Not Completed",
      icon: CircleX,
    },
  ];
  const noOfDays = [
    { value: 15, label: "15" },
    { value: 30, label: "30" },
    { value: 45, label: "45" },
  ];
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Company Name..."
          value={table.getColumn("company_name")?.getFilterValue() as string}
          onChange={(event) =>
            table.getColumn("company_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-slate-300 shadow-inner"
        />
        {table.getColumn("approval_status") && (
          <DataTableFacetedFilter
            column={table.getColumn("approval_status")}
            title="Approval Status"
            options={approvalStatuses}
          />
        )}
        {/* {table.getColumn("no_of_days") && (
          <DataTableFacetedFilter
            column={table.getColumn("no_of_days")}
            title="Number Of Days"
            options={noOfDays}
          />
        )}
        {table.getColumn("internship_status") && (
          <DataTableFacetedFilter
            column={table.getColumn("internship_status")}
            title="Internship Status"
            options={internshipStatuses}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {!role.includes("student") && <DataTableViewOptions table={table} />}
    </div>
  );
}
