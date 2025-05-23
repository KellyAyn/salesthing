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
        header: "Status",
        accessorKey: "status",
    },
    {
        header: "Last Activity",
        accessorKey: "lastUpdate",
    }
]