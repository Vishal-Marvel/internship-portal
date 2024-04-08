import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTableToolbar } from "@/components/ui/data-table/data-toolbar";
import { ScrollArea } from "./scroll-area";
import { DataTablePagination } from "./data-table/data-pagination";
import { cn } from "@/lib/utils";
import { useSocket } from "@/hooks/use-socket";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  visibleColumns: VisibilityState;
  type: "internship" | "student" | "faculty" | "skill" | "mentee";
  title?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  type,
  title,
  visibleColumns,
}: DataTableProps<TData, TValue>) {
  const { onChange } = useSocket();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>();
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  // const [pagination, setPagination] = React.useState<PaginationState>({pageSize:5, pageIndex:0});

  React.useEffect(() => {
    // console.log(columnVisibility);
    setColumnVisibility(visibleColumns);
  }, [visibleColumns]);
  const handleColumnVisibility = (e) => {
    setColumnVisibility(e);
  };
  React.useEffect(() => {
    if (type == "mentee" && columnVisibility["select"])
      onChange("rows", { rows: rowSelection });
  }, [rowSelection]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    // onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: handleColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      // pagination
    },
  });

  return (
    <div className="space-y-4 bg-white/80 p-3 rounded-lg min-w-[70vw]">
      <span className="capitalize font-semibold font-sans text-xl">{type}</span>
      <DataTableToolbar table={table} type={type} />
      <ScrollArea
        className={cn(
          "rounded-md  w-full",
          type == "mentee" ? "md:h-[40vh] h-[40vh]" : "md:h-[60vh] h-[65vh]"
        )}
      >
        <Table>
          <TableHeader className="sticky top-0 bg-slate-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className=" text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      {/* <DataTablePagination table={table} /> */}
    </div>
  );
}
