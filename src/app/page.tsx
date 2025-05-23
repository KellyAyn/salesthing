"use server";

import { DataTable } from "~/components/ui/data-table";
import { columns } from "~/components/ui/columns";
import { db } from "~/server/db";
import { leads } from "~/server/db/schema";

export default async function Page() {
  const data = await db.select().from(leads)
  
    data.forEach((lead) => {
      const date = lead.lastUpdate ? new Date(lead.lastUpdate) : null;
      const formattedDate = date
        ? date.toLocaleDateString('cze', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : null;
      lead.lastUpdate = formattedDate as unknown as Date;
    });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
