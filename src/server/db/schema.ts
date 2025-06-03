import { sqliteTable } from 'drizzle-orm/sqlite-core';

export const leads = sqliteTable(`leads`, (c) => ({
  id: c.integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  domain: c.text().notNull(),
  status: c
    .text({ enum: ['trash', 'pipedrive', 'prospect'] })
    .notNull()
    .default('prospect'),
  lastUpdate: c.integer({ mode: 'timestamp' }).notNull(),
  ownerID: c.text().default(''),
  archived: c.integer({ mode: 'boolean' }).notNull().default(false),
}));
