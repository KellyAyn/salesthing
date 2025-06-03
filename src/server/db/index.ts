import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/web';

import { env } from '~/env';

const devClient = createClient({
  url: env.DB_DEV_URL,
  authToken: env.TURSO_TOKEN,
});

const prodClient = createClient({
  url: env.DB_PROD_URL,
  authToken: env.TURSO_TOKEN,
});

const client = env.NODE_ENV === 'production' ? prodClient : devClient;

export const db = drizzle(client);
