'use client';

import { type Lead } from './ui/columns';
import DataTable from './data-table';
import { type ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';

interface DataTableWrapperProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: TData[];
}

export function DataTableWrapper<TData, TValue>({
  columns,
  initialData,
}: DataTableWrapperProps<TData, TValue>) {
  const [tableData, setTableData] = useState<TData[]>(initialData);

  return (
    <DataTable columns={columns} data={tableData} onDataChange={setTableData} />
  );
}
