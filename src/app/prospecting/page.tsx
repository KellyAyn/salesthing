import { columns } from '~/components/ui/columns';
import { DataTableWrapper } from '~/components/data-table-wrapper';
import { Suspense } from 'react';
import { TableSkeleton } from '~/components/table-skeleton';
import { getLeads } from '~/app/actions/fetchleads';
export default async function ProspectingPage() {
  const data = await getLeads();

  return (
    <div className='container mx-auto p-3.5'>
      <Suspense fallback={<TableSkeleton />}>
        <DataTableWrapper columns={columns} data={data} />
      </Suspense>
    </div>
  );
}
