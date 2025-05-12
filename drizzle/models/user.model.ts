import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

const usersTable = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name"),
  email: varchar("email").unique(),
  password: varchar("password"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: varchar("image"),
  provider: varchar("provider").notNull(),
  providerAccountId: varchar("providerAccountId").notNull(),
});

// Write the code for relationship

export default usersTable;
