import { X } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "@/components/view-internship/data-view-options";

import { DataTableFacetedFilter } from "@/components/view-internship/data-faceted-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "@/providers/context/SessionContext";
import { approvalStatuses, internshipStatuses, noOfDays } from "@/schema";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { role } = useSession();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 md:items-center items-start space-y-2 space-x-2 flex-col md:flex-row ">
        <Input
          placeholder="Filter Company Name..."
          // value={table.getColumn("company_name")?.getFilterValue() as string}
          onChange={(event) => {
            table.getColumn("company_name")?.setFilterValue(event.target.value);
            table.getColumn("student")?.setFilterValue(event.target.value);
          }}
          className="max-w-sm bg-slate-300 shadow-inner"
        />
        {table.getColumn("approval_status") && (
          <DataTableFacetedFilter
            column={table.getColumn("approval_status")}
            title="Approval Status"
            options={approvalStatuses}
          />
        )}
        {table.getColumn("no_of_days") && (
          <DataTableFacetedFilter
            column={table.getColumn("no_of_days")}
            title="Number Of Days"
            //@ts-ignore
            options={noOfDays}
          />
        )}
        {table.getColumn("internship_status") && (
          <DataTableFacetedFilter
            column={table.getColumn("internship_status")}
            title="Internship Status"
            options={internshipStatuses}
          />
        )}
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
