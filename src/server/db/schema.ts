import { mysqlTableCreator } from "drizzle-orm/mysql-core";
import { singlestoreTable } from 'drizzle-orm/singlestore-core';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `salesthing_${name}`);

export const leads = singlestoreTable("leads", (c) => ({
    id: c.int()
        .notNull()
        .primaryKey(),
    domain: c.varchar({ length: 255 })
        .notNull(),
    status: c.singlestoreEnum(["trash", "pipedrive", "prospect"])
        .notNull()
        .default("prospect"),
    lastUpdate: c.date()
        .notNull()
}))