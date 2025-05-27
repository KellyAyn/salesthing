'use server';

import { inArray } from 'drizzle-orm';
import * as XLSX from 'xlsx';
import { db } from '~/server/db';
import { leads } from '~/server/db/schema';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

export async function processExcel(file: ArrayBuffer) {
  const { userId } = await auth();
  const workbook = XLSX.read(file, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    throw new Error('No sheets found in workbook');
  }
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json<string[]>(sheet!, { header: 1 });

  const domains = jsonData
    .map((row) => row[0])
    .filter((domain): domain is string => domain !== undefined);

  const regex = /^(?!.*\.$)(?!\..*$).*\..*$/;
  const validatedDomains = domains.filter((domain) => regex.test(domain));

  const match = await db
    .select()
    .from(leads)
    .where(inArray(leads.domain, validatedDomains));
  const filteredDomains = validatedDomains.filter(
    (domain) => !match.some((lead) => lead.domain === domain),
  );
  const newProspects = filteredDomains.map((domain) => ({
    domain: domain,
    lastUpdate: new Date(),
    ownerID: userId,
  }));

  console.log(newProspects);

  if (newProspects.length > 0) {
    await db.insert(leads).values(newProspects);
  }

  revalidatePath('/prospecting');

  return 'Successfully processed the excel file.';
}
