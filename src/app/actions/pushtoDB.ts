/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use server';

import fs from 'fs';
import { db } from '~/server/db';
import { leads } from '~/server/db/schema';

export async function pushToDB() {
  const rawData = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  const data = rawData.map((lead: any) => {
    const lastUpdate = new Date(lead.lastUpdate);
    return {
      domain: lead.domain,
      status: lead.status,
      lastUpdate: lastUpdate,
      ownerID: lead.ownerID,
      archived: lead.archived,
    };
  });

  console.log(data);

  const chunkSize = 800;

  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    await db.insert(leads).values(chunk);
  }
}
