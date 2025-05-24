"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type Lead = {
    id: number;
    domain: string;
    status: "trash" | "pipedrive" | "prospect";
    lastUpdate: Date;
}

export const columns: ColumnDef<Lead>[] = [
    {
        header: "Domain",
        accessorKey: "domain",
    },
    {
        header: () => <div className="text-center">Status</div>,
        accessorKey: "status",
        cell: ({ row }) => {
            const status: string = row.getValue("status")
            return <div className="text-center">{status}</div>
        }
    },
    {
        accessorKey: "lastUpdate",
        header: () => <div className="text-center">Last Update</div>,
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
    // {
    //     id: "Actions",
    //     cell: ({ row })
    // }
]