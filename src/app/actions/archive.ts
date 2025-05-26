'use server';

import { eq, inArray } from 'drizzle-orm';
import { db } from '~/server/db';
import { leads } from '~/server/db/schema';

export async function archiveLead(id: number) {
  try {
    await db.update(leads).set({ archived: true }).where(eq(leads.id, id));
    return 1;
  } catch (error) {
    return error;
  }
}

export async function bulkArchiveLeads(ids: number[]) {
  try {
    await db
      .update(leads)
      .set({ archived: true })
      .where(inArray(leads.id, ids));
    return 1;
  } catch (error) {
    return error;
  }
}
