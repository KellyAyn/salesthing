import { db } from "~/server/db";
import { leads } from "~/server/db/schema";
import { Suspense } from "react";
import { DataTable } from "~/components/data-table";
import { columns } from "~/components/ui/columns";

export default async function Page() {

    const data = await db.select().from(leads).limit(50)

  return (
    <div className="container mx-auto w-full">
      <Suspense
        fallback={<div className="text-center text-2xl font-bold">Loading...</div>}
        >
        <DataTable columns={columns} data={data} />
      </Suspense>
    </div>
  )
  
}
