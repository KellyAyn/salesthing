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
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Archive } from 'lucide-react';
import { ExcelUploader } from './file-upload';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

const DataTableComponent = <TData, TValue>({
  columns,
  data,
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
  });

  return (
    <div className='w-full px-2'>
      <div className='bg-background/80 sticky top-0 z-100 flex items-center py-2 backdrop-blur-sm'>
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <div className='animate-in fade-in-20 flex items-center gap-2 duration-300'>
            <div className='text-muted-foreground flex px-2 text-sm'>
              {table.getFilteredSelectedRowModel().rows.length} {''}
              {table.getFilteredSelectedRowModel().rows.length == 1
                ? 'row'
                : 'rows'}{' '}
              selected
            </div>
            <Button size='sm' variant='ghost' className='px-2'>
              <Archive className='h-4 w-4' />
              Archive
            </Button>
          </div>
        )}
        <div className='ml-auto flex items-center gap-2'>
          <Input
            placeholder='Filter domains...'
            value={
              (table.getColumn('domain')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('domain')?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
          <ExcelUploader />
        </div>
      </div>
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
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
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
                ))
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
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='text-muted-foreground flex-1 text-sm'>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DataTableComponent) as typeof DataTableComponent;
