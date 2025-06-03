'use server';

import { db } from '~/server/db';
import { leads } from '~/server/db/schema';
import fs from 'fs';

export async function downloadDb() {
  const dbData = await db.select().from(leads);
  const transformedData = dbData.map((row) => ({
    ...row,
    lastUpdate:
      row.lastUpdate instanceof Date
        ? row.lastUpdate.toISOString()
        : row.lastUpdate,
  }));
  fs.writeFileSync('db.json', JSON.stringify(transformedData, null, 2));
  console.log(transformedData);
}
