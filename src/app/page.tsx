import { DataTable } from "~/components/ui/data-table";
import { columns } from "~/components/ui/columns";
import { db } from "~/server/db";
import { leads } from "~/server/db/schema";
import { Suspense } from "react";

export default async function Page() {

  const data = await db.select().from(leads).limit(50)

  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<div>Loading...</div>}>
        <DataTable columns={columns} data={data} />
      </Suspense>
    </div>
  )
}
