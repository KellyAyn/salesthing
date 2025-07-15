'use server';

import { db } from '~/server/db';
import { leads } from '~/server/db/schema';
import type { Lead } from '~/components/ui/columns';
import { auth } from '@clerk/nextjs/server';
import { eq, lt, or, and, asc } from 'drizzle-orm';

export async function getLeads(): Promise<Lead[]> {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('Not authenticated');
    }

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const leadsData = await db
      .select()
      .from(leads)
      .where(
        and(
          eq(leads.ownerID, userId),
          or(eq(leads.archived, false), lt(leads.lastUpdate, sixMonthsAgo)),
        ),
      )
      .orderBy(asc(leads.status), asc(leads.domain));
    return leadsData;
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw new Error('Failed to fetch leads');
  }
}
