'use client';

import { type ColumnDef } from '@tanstack/react-table';
import DataTable from './data-table';
import type { Lead } from './ui/columns';
import { useState } from 'react';

type DataTableWrapperProps<TData extends Lead, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

const getStatusColor = (status: Lead['status']) => {
  switch (status) {
    case 'trash':
      return 'bg-red-950/50';
    case 'pipedrive':
      return 'bg-green-950/50';
    default:
      return '';
  }
};

export function DataTableWrapper<TData extends Lead, TValue>({
  columns,
  data: initialData,
}: DataTableWrapperProps<TData, TValue>) {
  const [data, setData] = useState<TData[]>(initialData);

  return (
    <DataTable
      columns={columns}
      data={data}
      onDataChange={setData}
      meta={{
        getRowClassName: (row: TData) => getStatusColor(row.status),
      }}
    />
  );
}
