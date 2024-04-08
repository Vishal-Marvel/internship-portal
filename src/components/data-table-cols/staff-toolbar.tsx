import { DataTableFacetedFilter } from "@/components/ui/data-table/data-faceted-filter";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/providers/context/SessionContext";

import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}
function FacultyToolBar<TData>({ table }: DataTableToolbarProps<TData>) {
  const { role } = useSession();
  const isTapCell = role?.includes("tapcell");
  const isPrincipal = role?.includes("principal");
  const isCEO = role?.includes("ceo");
  return (
    <>
      {(isPrincipal || isCEO || isTapCell) && table.getColumn("department") && (
        <DataTableFacetedFilter
          column={table.getColumn("department")}
          title="Department"
          options={Array.from(
            table.getColumn("department").getFacetedUniqueValues()
          ).map((value) => ({
            value: value[0],
            label: value[0]?.toUpperCase(),
          }))}
        />
      )}
      {(isCEO || isTapCell) && table.getColumn("sec_sit") && (
        <DataTableFacetedFilter
          column={table.getColumn("sec_sit")}
          title="College"
          options={Array.from(
            table.getColumn("sec_sit").getFacetedUniqueValues()
          ).map((value) => ({
            value: value[0],
            label: value[0]?.toUpperCase(),
          }))}
        />
      )}
    </>
  );
}

export default FacultyToolBar;
