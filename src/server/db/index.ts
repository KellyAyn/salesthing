import { drizzle } from 'drizzle-orm/singlestore';
import { createPool, type Pool } from 'mysql2/promise';

import { env } from '~/env';
import * as schema from './schema';

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const conn = globalForDb.conn ?? createPool({ uri: env.DATABASE_URL });
if (env.NODE_ENV !== 'production') globalForDb.conn = conn;

// Use different schemas based on environment
const dbSchema = {
  leads: env.NODE_ENV === 'production' ? schema.leadsProd : schema.leadsDev,
};

export const db = drizzle(conn, { schema: dbSchema });
