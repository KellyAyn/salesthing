'use client';

import type { ColumnDef, Table } from '@tanstack/react-table';
import { Button } from './button';
import { Pencil, Archive } from 'lucide-react';
import { DropdownTable } from '../dropdown-table';
import { Checkbox } from './checkbox';
import { archiveLead } from '~/app/actions/archive';
import { toast } from 'sonner';
import { changeStatus } from '~/app/actions/change-status';

// Extend the TableMeta type to include our custom properties
declare module '@tanstack/react-table' {
  interface TableMeta<TData> {
    onDataChange?: (newData: TData[]) => void;
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

const pushStatusChange = async (status: string, id: number) => {
  const result = await changeStatus(status, id);
  if (result === 1) {
    toast.success('Status changed successfully', {
      icon: '👍',
      duration: 2000,
      richColors: true,
    });
  } else {
    toast.error('Failed to change status', {
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
      <div className='flex min-w-[3rem] justify-center'>
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
      <div className='flex min-w-[3rem] justify-center'>
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
    header: () => (
      <div className='max-w-[24rem] min-w-[12rem] text-center font-bold'>
        Domain
      </div>
    ),
    accessorKey: 'domain',
    cell: ({ row }) => {
      const domain: string = row.getValue('domain');
      return (
        <div className='max-w-[24rem] min-w-[12rem] truncate text-center'>
          <a
            href={`https://${domain}`}
            target='_blank'
            className='justify-center'
          >
            <Button variant='ghost' className='max-w-full truncate p-2'>
              {domain}
            </Button>
          </a>
        </div>
      );
    },
    size: 288,
  },
  {
    header: () => (
      <div className='min-w-[8rem] text-center font-bold'>Status</div>
    ),
    accessorKey: 'status',
    cell: ({ row, table }) => {
      const handleStatusChange = (newStatus: string) => {
        const currentData = table.options.data;
        const newData = currentData.map((item) =>
          item.id === row.original.id
            ? { ...item, status: newStatus as Lead['status'] }
            : item,
        );
        table.options.meta?.onDataChange?.(newData);
        void pushStatusChange(newStatus, row.original.id);
      };

      return (
        <div className='flex min-w-[8rem] justify-center'>
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
    header: () => (
      <div className='min-w-[10rem] text-center font-bold'>Last Update</div>
    ),
    cell: ({ row }) => {
      const date: Date = row.getValue('lastUpdate');
      if (!date) {
        return <div className='min-w-[10rem] text-center'>N/A</div>;
      }
      const formattedDate = new Intl.DateTimeFormat('cze', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);

      return <div className='min-w-[10rem] text-center'>{formattedDate}</div>;
    },
    size: 160,
  },
  {
    id: 'Actions',
    header: () => (
      <div className='min-w-[7rem] text-center font-bold'>Actions</div>
    ),
    cell: ({ row, table }) => {
      return (
        <div className='flex min-w-[7rem] justify-center gap-2'>
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
