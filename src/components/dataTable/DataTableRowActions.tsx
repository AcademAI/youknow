import { Row } from "@tanstack/react-table";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

interface AdminDataTableRowActionsProps<TData> {
  row: Row<TData>;
  onPromote: (value: TData) => void;
  onDemote: (value: TData) => void;
  onDelete: (value: TData) => void;
}

export const AdminDataTableRowActions = <TData,>({
  row,
  onPromote,
  onDemote,
  onDelete,
}: AdminDataTableRowActionsProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onPromote(row.original)}>
          Повысить
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDemote(row.original)}>
          Понизить
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(row.original)}>
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
