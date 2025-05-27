import { columns } from '~/components/ui/columns';
import { DataTableWrapper } from '~/components/data-table-wrapper';
import { db } from '~/server/db';
import { leads } from '~/server/db/schema';
import { and, eq, lt, or } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { Suspense } from 'react';
import { TableSkeleton } from '~/components/table-skeleton';

export default async function ProspectingPage() {
  const { userId } = await auth();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const data = await db
    .select()
    .from(leads)
    .where(
      and(
        eq(leads.ownerID, userId ?? ''),
        or(eq(leads.status, 'prospect'), lt(leads.lastUpdate, sixMonthsAgo)),
      ),
    );

  return (
    <div className='container mx-auto p-3.5'>
      <Suspense fallback={<TableSkeleton />}>
        <DataTableWrapper columns={columns} data={data} />
      </Suspense>
    </div>
  );
}
