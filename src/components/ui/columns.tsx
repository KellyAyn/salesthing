'use client';

import type { ColumnDef, Table } from '@tanstack/react-table';
import { Button } from './button';
import { Pencil, Archive } from 'lucide-react';
import { DropdownTable } from '../dropdown-table';
import { Checkbox } from './checkbox';
import { archiveLead } from '~/app/actions/archive';
import { toast } from 'sonner';
import { changeStatus } from '~/app/actions/change-status';

declare module '@tanstack/react-table' {
  interface TableMeta<TData> {
    onDataChange?: (newData: TData[]) => void;
    getRowClassName?: (row: TData) => string;
  }
}

export type Lead = {
  id: number;
  domain: string;
  status: 'trash' | 'pipedrive' | 'prospect';
  lastUpdate: Date;
  archived: boolean;
};

const handleArchiveLead = async (id: number, table: Table<Lead>) => {
  const result = await archiveLead(id);
  if (result === 1) {
    const currentData = table.options.data;
    const newData = currentData.filter((row) => row.id !== id);

    table.options.meta?.onDataChange?.(newData);

    toast.success('Lead archived successfully', {
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

export const columns: ColumnDef<Lead>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className='flex w-12 justify-center'>
        <Checkbox
          className='flex items-center justify-center text-black'
          checked={
            table.getIsAllRowsSelected() ||
            (table.getIsSomeRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label='Select all'
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex w-12 justify-center'>
        <Checkbox
          className='flex items-center justify-center text-black'
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      </div>
    ),
    size: 48,
  },
  {
    header: () => <div className='w-64 pl-8 text-center font-bold'>Domain</div>,
    accessorKey: 'domain',
    cell: ({ row }) => {
      const domain: string = row.getValue('domain');
      return (
        <div className='w-64 truncate pl-8 text-center'>
          <a
            href={`https://${domain}`}
            target='_blank'
            className='justify-center'
          >
            <Button variant='ghost' className='w-full truncate p-2'>
              {domain}
            </Button>
          </a>
        </div>
      );
    },
    size: 256,
  },
  {
    header: () => <div className='w-32 text-center font-bold'>Status</div>,
    accessorKey: 'status',
    cell: ({ row, table }) => {
      const handleStatusChange = async (newStatus: string) => {
        const currentData = table.options.data;
        const newData = currentData.map((item) =>
          item.id === row.original.id
            ? { ...item, status: newStatus as Lead['status'] }
            : item,
        );
        table.options.meta?.onDataChange?.(newData);

        const result = await changeStatus(newStatus, row.original.id);
        if (result !== 1) {
          table.options.meta?.onDataChange?.(currentData);
          toast.error('Failed to change status', {
            icon: '🤦‍♂️',
            duration: 5000,
            richColors: true,
          });
        } else {
          toast.success('Status changed successfully', {
            icon: '👍',
            duration: 2000,
            richColors: true,
          });
        }
      };

      return (
        <div className='flex w-32 justify-center'>
          <DropdownTable
            status={row.original.status}
            onStatusChange={handleStatusChange}
          />
        </div>
      );
    },
    size: 128,
  },
  {
    accessorKey: 'lastUpdate',
    header: () => <div className='w-40 text-center font-bold'>Last Update</div>,
    cell: ({ row }) => {
      const date: Date = row.getValue('lastUpdate');
      if (!date) {
        return <div className='w-40 text-center'>N/A</div>;
      }
      const formattedDate = new Intl.DateTimeFormat('cze', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);

      return <div className='w-40 text-center'>{formattedDate}</div>;
    },
    size: 160,
  },
  {
    id: 'Actions',
    header: () => <div className='w-28 text-center font-bold'>Actions</div>,
    cell: ({ row, table }) => {
      return (
        <div className='flex w-28 justify-center gap-2'>
          <Button variant='outline' disabled className='h-8 w-8 p-0'>
            <Pencil className='h-4 w-4' />
            <span className='sr-only'>Edit</span>
          </Button>
          <Button
            variant='ghost'
            className='h-8 w-8 p-0'
            onClick={() => handleArchiveLead(row.original.id, table)}
          >
            <Archive className='h-4 w-4' />
            <span className='sr-only'>Archive</span>
          </Button>
        </div>
      );
    },
    size: 112,
  },
];
