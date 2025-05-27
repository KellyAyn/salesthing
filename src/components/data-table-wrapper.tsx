'use client';

import { useState, useEffect } from 'react';
import DataTable from './data-table';
import type { Lead } from './ui/columns';
import type { ColumnDef } from '@tanstack/react-table';

interface DataTableWrapperProps<TData extends Lead, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

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
  const [data, setData] = useState<TData[]>(() => {
    // Try to get persisted data from localStorage
    if (typeof window !== 'undefined') {
      const persistedData = localStorage.getItem('tableData');
      if (persistedData) {
        try {
          const parsed = JSON.parse(persistedData) as TData[];
          // Validate that the parsed data has the correct shape
          if (
            Array.isArray(parsed) &&
            parsed.every((item) => 'id' in item && 'status' in item)
          ) {
            // Convert lastUpdate strings back to Date objects
            return parsed.map((item) => ({
              ...item,
              lastUpdate: new Date(item.lastUpdate),
            }));
          }
        } catch (e) {
          console.error('Failed to parse persisted data:', e);
        }
      }
    }
    // Convert initial data dates if they're strings
    return initialData.map((item) => ({
      ...item,
      lastUpdate:
        item.lastUpdate instanceof Date
          ? item.lastUpdate
          : new Date(item.lastUpdate),
    }));
  });

  // Update localStorage when data changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tableData', JSON.stringify(data));
    }
  }, [data]);

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
