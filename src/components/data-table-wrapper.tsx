'use client';

import { useState, useEffect } from 'react';
import DataTable from './data-table';
import type { Lead } from './ui/columns';
import type { ColumnDef } from '@tanstack/react-table';
import { getLeads } from '~/app/actions/fetchleads';

interface DataTableWrapperProps<TData extends Lead, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const getStatusColor = (status: Lead['status']) => {
  switch (status) {
    case 'trash':
      return 'bg-red-600/50';
    case 'pipedrive':
      return 'bg-green-600/50';
    default:
      return '';
  }
};

export function DataTableWrapper<TData extends Lead, TValue>({
  columns,
  data: initialData,
}: DataTableWrapperProps<TData, TValue>) {
  const [data, setData] = useState<TData[]>(() => {
    return initialData.map((item) => ({
      ...item,
      lastUpdate:
        item.lastUpdate instanceof Date
          ? item.lastUpdate
          : new Date(item.lastUpdate),
    }));
  });

  useEffect(() => {
    const fetchAndUpdateData = async () => {
      try {
        const freshData = (await getLeads()) as TData[];

        const processedData = freshData.map((item) => ({
          ...item,
          lastUpdate:
            item.lastUpdate instanceof Date
              ? item.lastUpdate
              : new Date(item.lastUpdate),
        }));

        setData(processedData);

        if (typeof window !== 'undefined') {
          localStorage.setItem('tableData', JSON.stringify(processedData));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (typeof window !== 'undefined') {
          const persistedData = localStorage.getItem('tableData');
          if (persistedData) {
            try {
              const parsed = JSON.parse(persistedData) as TData[];
              if (
                Array.isArray(parsed) &&
                parsed.every((item) => 'id' in item && 'status' in item)
              ) {
                setData(
                  parsed.map((item) => ({
                    ...item,
                    lastUpdate: new Date(item.lastUpdate),
                  })),
                );
              }
            } catch (e) {
              console.error('Failed to parse persisted data:', e);
            }
          }
        }
      }
    };

    void fetchAndUpdateData();
  }, []);
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
