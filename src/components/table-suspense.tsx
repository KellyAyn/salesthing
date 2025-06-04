'use server';

import { columns } from '~/components/ui/columns';
import { DataTableWrapper } from './data-table-wrapper';
import { getLeads } from '~/app/actions/fetchleads';

export async function TableSuspense() {
  const data = await getLeads();
  return <DataTableWrapper columns={columns} data={data} />;
}
