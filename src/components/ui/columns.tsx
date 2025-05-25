'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Button } from './button';
import { Pencil, Archive } from 'lucide-react';
import { DropdownTable } from '../dropdown-table';
import { Checkbox } from './checkbox';

export type Lead = {
  id: number;
  domain: string;
  status: 'trash' | 'pipedrive' | 'prospect';
  lastUpdate: Date;
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
    cell: ({ row }) => {
      return (
        <div className='flex min-w-[8rem] justify-center'>
          <DropdownTable status={row.original.status} />
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
    cell: ({ row }) => {
      return (
        <div className='flex min-w-[7rem] justify-center gap-2'>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <Pencil className='h-4 w-4' />
            <span className='sr-only'>Edit</span>
          </Button>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <Archive className='h-4 w-4' />
            <span className='sr-only'>Archive</span>
          </Button>
        </div>
      );
    },
    size: 112,
  },
];
