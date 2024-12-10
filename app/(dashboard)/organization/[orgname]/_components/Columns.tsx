"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CircleDot } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Issue = {
  title: string;
};

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return (
        <div className="whitespace-nowrap flex items-center gap-4">
          <CircleDot className="text-green-500" size={18} />
          {title}
        </div>
      );
    },
  },
];
