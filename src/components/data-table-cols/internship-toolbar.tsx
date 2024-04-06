
import { DataTableFacetedFilter } from "@/components/ui/data-table/data-faceted-filter";
import { approvalStatuses, internshipStatuses, noOfDays } from "@/schema";
import { useSession } from "@/providers/context/SessionContext";
import { Table } from "@tanstack/react-table";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}
function InternshipToolBar<TData>({ table }: DataTableToolbarProps<TData>) {
    const {role} = useSession();
    const isStudent = role?.includes("student");
  return (
    <>
      {table.getColumn("approval_status") && (
        <DataTableFacetedFilter
          column={table.getColumn("approval_status")}
          title="Approval Status"
          options={approvalStatuses}
        />
      )}
      {table.getColumn("internship_status") && (
        <DataTableFacetedFilter
          column={table.getColumn("internship_status")}
          title="Internship Status"
          options={internshipStatuses}
        />
      )}
      {table.getColumn("days") && (
        <DataTableFacetedFilter
          column={table.getColumn("days")}
          title="No of Days"
          //@ts-ignore
          options={Array.from(
            table.getColumn("days").getFacetedUniqueValues()
          ).map((value) => ({ value: value[0], label: value[0] }))}
        />
      )}
      {!isStudent && (
        <>
          {table.getColumn("batch") && (
            <DataTableFacetedFilter
              column={table.getColumn("batch")}
              title="Batch"
              options={Array.from(
                table.getColumn("batch").getFacetedUniqueValues()
              ).map((value) => ({ value: value[0], label: value[0] }))}
            />
          )}
          {table.getColumn("department") && (
            <DataTableFacetedFilter
              column={table.getColumn("department")}
              title="Department"
              options={Array.from(
                table.getColumn("department").getFacetedUniqueValues()
              ).map((value) => ({
                value: value[0],
                label: value[0].toUpperCase(),
              }))}
            />
          )}
          {table.getColumn("section") && (
            <DataTableFacetedFilter
              column={table.getColumn("section")}
              title="Section"
              options={Array.from(
                table.getColumn("section").getFacetedUniqueValues()
              ).map((value) => ({ value: value[0], label: value[0] }))}
            />
          )}
        </>
      )}
    </>
  );
}

export default InternshipToolBar;
