"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";
import { Pencil } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Archive } from "lucide-react";
import { DropdownTable } from "../dropdown-table";
import { Checkbox } from "./checkbox";

export type Lead = {
    id: number;
    domain: string;
    status: "trash" | "pipedrive" | "prospect";
    lastUpdate: Date;
}

export const columns: ColumnDef<Lead>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                className="flex items-center justify-center mx-5"
                checked={
                    table.getIsAllRowsSelected() ||
                    (table.getIsSomeRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                className="flex items-center justify-center mx-5"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        )
    },
    {
        header: () => <div className="text-center font-bold">Domain</div>,
        accessorKey: "domain",
        cell: ({ row }) => {
            const domain: string = row.getValue("domain")
            return (
                <div className="text-center">
                    <a href={`https://${domain}`} target="_blank" className="justify-center">
                        <Button variant="ghost" className="p-2">
                            {domain}
                        </Button>
                    </a>
                </div>
            )
        }
    },
    {
        header: () => <div className="text-center font-bold">Status</div>,
        accessorKey: "status",
        cell: ({ row }) => {
            return <DropdownTable status={row.original.status} />
        }
    },
    {
        accessorKey: "lastUpdate",
        header: () => <div className="text-center font-bold">Last Update</div>,
        cell: ({ row }) => {
            const date: Date = row.getValue("lastUpdate")
            if (!date) {
                return <div className="text-center">N/A</div>
            }
            const formattedDate = new Intl.DateTimeFormat("cze", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }).format(date)

            return <div className="text-center">{formattedDate}</div>
        }
    },
    {
        id: "Actions",
        cell: ({ row }) => {
            const lead = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                        <DropdownMenuItem>
                            <Pencil className="h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Archive className="h-4 w-4" />
                            Archive
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
]
