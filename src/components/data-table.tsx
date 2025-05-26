'use client';

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { DataTableHeader } from '~/components/ui/data-table-header';
import type { Lead } from './ui/columns';

interface DataTableProps<TData extends Lead, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDataChange?: (newData: TData[]) => void;
  meta?: {
    getRowClassName?: (row: TData) => string;
  };
}

const DataTableComponent = <TData extends Lead, TValue>({
  columns,
  data,
  onDataChange,
  meta,
}: DataTableProps<TData, TValue>) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
    meta: {
      onDataChange,
      getRowClassName: meta?.getRowClassName,
    },
  });

  return (
    <div className='w-full px-2 pb-4'>
      <DataTableHeader table={table} />
      <div className='rounded-md border'>
        <div className='relative'>
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
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  const rowClassName =
                    table.options.meta?.getRowClassName?.(row.original) ?? '';
                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className={`animate-in fade-in-40 duration-800 ease-out ${rowClassName}`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DataTableComponent) as typeof DataTableComponent;
