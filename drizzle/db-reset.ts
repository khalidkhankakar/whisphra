import { reset } from "drizzle-seed";

import { db } from "./db";
import * as schema from "./models";

async function main() {
  console.log("Resetting database....");
  await reset(db, schema);
  console.log("Completed resetting database....");
}

main();
