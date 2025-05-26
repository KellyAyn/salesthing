import React from 'react';
import { type Table } from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Archive,
} from 'lucide-react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { ExcelUploader } from '~/components/file-upload';
import { bulkArchiveLeads } from '~/app/actions/archive';
import { toast } from 'sonner';

interface DataTableHeaderProps<TData> {
  table: Table<TData>;
}

export function DataTableHeader<TData>({ table }: DataTableHeaderProps<TData>) {
  const handleArchiveLeads = async (table: Table<TData>) => {
    const ids = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => (row.original as { id: number }).id);
    const result = await bulkArchiveLeads(ids);
    if (result === 1) {
      const currentData = table.options.data;
      const newData = currentData.filter(
        (row) => !ids.includes((row as { id: number }).id),
      );
      table.toggleAllRowsSelected(false);

      table.options.meta?.onDataChange?.(newData);
      toast.success(`successfully archived ${ids.length} leads`, {
        icon: '👍',
        duration: 2000,
        richColors: true,
      });
    } else {
      toast.error(`Failed to archive lead: ${String(result)}`, {
        icon: '🤦‍♂️',
        duration: 5000,
        richColors: true,
      });
    }
  };

  return (
    <div className='bg-background/80 sticky top-0 z-100 flex items-center justify-between py-2 backdrop-blur-sm'>
      <div className='flex items-center gap-2'>
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <div className='animate-in fade-in-0 flex items-center gap-2 duration-500'>
            <Button
              size='sm'
              variant='ghost'
              className='px-2'
              onClick={() => handleArchiveLeads(table)}
            >
              <Archive className='h-4 w-4' />
              Archive selected
            </Button>
            <div className='text-muted-foreground flex px-2 text-sm'>
              {table.getFilteredSelectedRowModel().rows.length} {''}
              {table.getFilteredSelectedRowModel().rows.length == 1
                ? 'row'
                : 'rows'}{' '}
              selected
            </div>
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
  );
}
