import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Skill, Staff } from "@/schema";
import { DataTableColumnHeader } from "../ui/data-table/data-column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-model-store";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const skillColumns: ColumnDef<Skill>[] = [
  {
    accessorKey: "skill",
    header: ({ column }) => {
      return <div className="text-center">Skill Name</div>;
    },
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue("skill")}
      </div>
    ),
  },
  {
    accessorKey: "count",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="# of Students" />;
    },
    cell: ({ row }) => (
      <div className="text-center font-medium uppercase">
        {row.getValue("count")}
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const skill = row.original;
      const { onOpen } = useModal();
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
                onOpen("editSkill", { skill });
              }}
            >
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                onOpen("deleteSkill", { skill });
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
