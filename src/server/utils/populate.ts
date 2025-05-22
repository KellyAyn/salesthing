// /* eslint-disable @typescript-eslint/no-unsafe-argument */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// "use server";
// import { drizzle } from "drizzle-orm/singlestore";
// import { leads } from "~/server/db/schema";
// import fs from "fs";
// import { array, object } from "zod/v4";

// const db = drizzle(process.env.DATABASE_URL!);



// export async function handleClick() {
//   const data = JSON.parse(fs.readFileSync("leads2.json", "utf-8"));
//   const sanitisedData = data.map((lead: any) => {
//     if (lead.status === 2) {
//       lead.status = "pipedrive";
//     } else if (lead.status === 1) {
//       lead.status = "trash";
//     } else if (lead.status === 0) {
//       lead.status = "pipedrive";
//     }
//     if (lead.lastActivity === null) {
//       lead.lastActivity = new Date();
//     } else {
//       lead.lastActivity = new Date(lead.lastActivity);
//     }
//     return {
//       id: lead.id,
//       domain: lead.domainName,
//       status: lead.status, 
//       lastUpdate: lead.lastActivity,
//     };
//   });
//   await db.insert(leads).values(sanitisedData)
// }