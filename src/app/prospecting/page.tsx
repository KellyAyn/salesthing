import { db } from "~/server/db";
import { leads } from "~/server/db/schema";
import { Suspense } from "react";
import { columns } from "~/components/ui/columns";
import { and, eq, lt, or } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import DataTable from "~/components/data-table";

export default async function Page() {
  const { userId } = await auth();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const data = await db.select().from(leads).where(
    and(
      eq(leads.ownerID, userId ?? ""),
      or(
        eq(leads.status, "prospect"),
        lt(leads.lastUpdate, sixMonthsAgo)
      ),
    )
  ) 

  return (
    <div className="container mx-auto w-full">
      <Suspense
        fallback={<div className="text-center text-2xl font-bold justify-center items-center">Loading...</div>}
        >
          <DataTable columns={columns} data={data} />
      </Suspense>
    </div>
  )
  
}
