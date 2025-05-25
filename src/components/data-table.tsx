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
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

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
      <div className='bg-background/80 sticky top-0 z-100 flex items-center justify-between py-2 backdrop-blur-sm'>
        <div className='flex items-center gap-2'>
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
        </div>
        <div className='flex items-center gap-4'>
          <div className='text-muted-foreground flex items-center gap-2 text-sm'>
            <span>
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>
            <div className='flex items-center gap-1'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className='h-8 w-8 p-0'
              >
                <ChevronsLeft className='h-4 w-4' />
                <span className='sr-only'>First page</span>
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className='h-8 w-8 p-0'
              >
                <ChevronLeft className='h-4 w-4' />
                <span className='sr-only'>Previous page</span>
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className='h-8 w-8 p-0'
              >
                <ChevronRight className='h-4 w-4' />
                <span className='sr-only'>Next page</span>
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className='h-8 w-8 p-0'
              >
                <ChevronsRight className='h-4 w-4' />
                <span className='sr-only'>Last page</span>
              </Button>
            </div>
          </div>
          <div className='flex items-center gap-2'>
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
    </div>
  );
};

export default React.memo(DataTableComponent) as typeof DataTableComponent;
