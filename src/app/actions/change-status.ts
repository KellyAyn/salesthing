'use server';

import { eq } from 'drizzle-orm';
import type { Lead } from '~/components/ui/columns';
import { db } from '~/server/db';
import { leads } from '~/server/db/schema';

const statusOptions = ['trash', 'pipedrive', 'prospect'];

export async function changeStatus(status: string, id: number) {
  if (!statusOptions.includes(status)) {
    return { error: 'Invalid status' };
  }
  console.log(status, id);
  try {
    await db
      .update(leads)
      .set({ status: status as Lead['status'] })
      .where(eq(leads.id, id));
    return 1;
  } catch (error) {
    return error;
  }
}
