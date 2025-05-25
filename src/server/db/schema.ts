import { singlestoreTable } from 'drizzle-orm/singlestore-core';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const leads = singlestoreTable("leads", (c) => ({
    id: c.int()
        .notNull()
        .primaryKey()
        .autoincrement(),
    domain: c.varchar({ length: 255 })
        .notNull(),
    status: c.singlestoreEnum(["trash", "pipedrive", "prospect"])
        .notNull()
        .default("prospect"),
    lastUpdate: c.date()
        .notNull(),
    ownerID: c.varchar({ length: 255 }).default("")
}))
