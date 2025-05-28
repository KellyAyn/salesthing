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
    // Convert initial data dates if they're strings
    return initialData.map((item) => ({
      ...item,
      lastUpdate:
        item.lastUpdate instanceof Date
          ? item.lastUpdate
          : new Date(item.lastUpdate),
    }));
  });

  // Fetch data from DB and update localStorage
  useEffect(() => {
    const fetchAndUpdateData = async () => {
      try {
        // Fetch fresh data using server action
        const freshData = (await getLeads()) as TData[];

        // Convert dates in the fresh data
        const processedData = freshData.map((item) => ({
          ...item,
          lastUpdate:
            item.lastUpdate instanceof Date
              ? item.lastUpdate
              : new Date(item.lastUpdate),
        }));

        // Update state with fresh data
        setData(processedData);

        // Update localStorage with fresh data
        if (typeof window !== 'undefined') {
          localStorage.setItem('tableData', JSON.stringify(processedData));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // If fetch fails, try to use localStorage as fallback
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
  }, []); // Empty dependency array means this runs once on mount

  // Update localStorage when data changes (except during initial fetch)
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
