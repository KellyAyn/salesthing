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
import { Upload, Archive } from "lucide-react";
import Bowser from "bowser";

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) { 
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [browserClass, setBrowserClass] = React.useState("")

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const browser = Bowser.getParser(window.navigator.userAgent);
            setBrowserClass(browser.getBrowserName() === "Chrome" ? "px-2" : "");
        }
    }, []);

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
        <div className={`w-full ${browserClass}`}>
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
                    <Button size="sm">
                        <Upload className="w-4 h-4" />
                        Upload
                    </Button>
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
