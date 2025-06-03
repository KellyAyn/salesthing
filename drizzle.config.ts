import { defineConfig } from 'drizzle-kit';

import { env } from '~/env';

const dbUrl = env.NODE_ENV === 'production' ? env.DB_PROD_URL : env.DB_DEV_URL;

export default defineConfig({
  dialect: 'turso',
  schema: './src/server/db/schema.ts',
  dbCredentials: {
    url: dbUrl,
    authToken: env.TURSO_TOKEN,
  },
});
