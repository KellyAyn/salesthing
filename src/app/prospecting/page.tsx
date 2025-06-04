import { Suspense } from 'react';
import { TableSkeleton } from '~/components/table-skeleton';
import { TableSuspense } from '~/components/table-suspense';
export default async function ProspectingPage() {
  return (
    <div className='container mx-auto p-3.5'>
      <Suspense fallback={<TableSkeleton />}>
        <TableSuspense />
      </Suspense>
    </div>
  );
}
