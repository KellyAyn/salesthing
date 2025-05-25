"use client";

import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
  } from "@tanstack/react-table"
import React from "react";
   
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "~/components/ui/table"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Archive } from "lucide-react";
import { ExcelUploader } from "./file-upload";
type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

const DataTableComponent = <TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) => { 
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    })

    return (
        <div className="w-full px-2">
            <div className="flex items-center py-2 sticky top-0 z-100 backdrop-blur-sm bg-background/80">
                {table.getFilteredSelectedRowModel().rows.length > 0 && (
                    <div className="flex items-center gap-2 animate-in fade-in-20 duration-300">
                        <div className="flex text-sm text-muted-foreground px-2">
                            {table.getFilteredSelectedRowModel().rows.length} {""}
                            {table.getFilteredSelectedRowModel().rows.length == 1 ? "row" : "rows"} selected
                        </div>
                        <Button size="sm" variant="ghost" className="px-2">
                            <Archive className="w-4 h-4" />
                            Archive
                        </Button>
                    </div>
                )}
                <div className="ml-auto flex items-center gap-2">
                    <Input
                        placeholder="Filter domains..."
                        value={(table.getColumn("domain")?.getFilterValue() as string) ?? ""}
                        onChange={(event) => table.getColumn("domain")?.setFilterValue(event.target.value)}
                        className="max-w-sm"
                    />
                    <ExcelUploader />
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                )
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
                                {row.getVisibleCells().map((cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                )))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            </div>
        </div>
    )
}

export default React.memo(DataTableComponent) as typeof DataTableComponent;